/** Servidor local sin dependencias. Solo publica el contenido de dist/. */
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, relative, isAbsolute, sep, extname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// Separado del socket para verificar la entrega de archivos sin abrir un puerto.
export async function readStaticFile(rawUrl = '/', method = 'GET') {
  const headers = {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'};
  const message = (status, text) => ({
    status,
    headers: {...headers, 'Content-Type': 'text/plain; charset=utf-8'},
    body: method === 'HEAD' ? Buffer.alloc(0) : Buffer.from(text),
  });
  if (!['GET', 'HEAD'].includes(method)) {
    const result = message(405, 'Método no permitido');
    result.headers.Allow = 'GET, HEAD';
    return result;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(rawUrl, 'http://localhost').pathname);
  } catch {
    return message(400, 'Dirección inválida');
  }
  if (pathname.includes('\0') || pathname.includes('\\')) {
    return message(400, 'Dirección inválida');
  }
  const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const fromRoot = relative(root, file);
  if (fromRoot === '..' || fromRoot.startsWith('..' + sep) || isAbsolute(fromRoot)) {
    return message(403, 'Acceso no permitido');
  }
  try {
    const body = await readFile(file);
    return {
      status: 200,
      headers: {...headers,
        'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream',
        'Content-Length': body.length,
      },
      body: method === 'HEAD' ? Buffer.alloc(0) : body,
    };
  } catch (error) {
    if (['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code)) {
      return message(404, 'Archivo no encontrado');
    }
    console.error('No se pudo leer el archivo:', error.message);
    return message(500, 'No se pudo leer el archivo');
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 5173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('PORT debe ser un número entre 1 y 65535.');
    process.exitCode = 1;
  } else {
    const server = createServer(async (req, res) => {
      try {
        const result = await readStaticFile(req.url, req.method);
        res.writeHead(result.status, result.headers);
        res.end(result.body);
      } catch (error) {
        console.error('Error al atender la solicitud:', error.message);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Error del servidor local');
      }
    });
    server.on('error', error => {
      console.error(error.code === 'EADDRINUSE'
        ? `El puerto ${port} está ocupado. Cierra la otra instancia o cambia PORT.`
        : `No se pudo iniciar el servidor: ${error.message}`);
      process.exitCode = 1;
    });
    server.listen(port, '127.0.0.1', () => {
      console.log(`\nAmor X Carmen\nAbre http://localhost:${port}\nCtrl+C para detener.\n`);
    });
  }
}
