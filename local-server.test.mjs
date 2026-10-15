import test from 'node:test';
import assert from 'node:assert/strict';
import {readStaticFile} from '../scripts/serve.mjs';

test('Sirve la página, los módulos, la biblioteca y las imágenes con MIME correcto', async () => {
  for (const [path, mime] of [
    ['/', 'text/html'],
    ['/app.js?version=1', 'text/javascript'],
    ['/model.mjs', 'text/javascript'],
    ['/styles.css', 'text/css'],
    ['/vendor/leaflet/leaflet.js', 'text/javascript'],
    ['/vendor/leaflet/images/marker-icon.png', 'image/png'],
    ['/references/ruta-laguna-de-terminos.jpeg', 'image/jpeg'],
  ]) {
    const result = await readStaticFile(path);
    assert.equal(result.status, 200, path);
    assert.ok(result.headers['Content-Type'].startsWith(mime), path);
    assert.ok(result.body.length > 0, path);
  }
});

test('No publica archivos fuera de dist ni acepta rutas inválidas o escrituras', async () => {
  assert.equal((await readStaticFile('/README.md')).status, 404);
  assert.equal((await readStaticFile('/%2e%2e%2fREADME.md')).status, 403);
  assert.equal((await readStaticFile('/%5c..%5cREADME.md')).status, 400);
  assert.equal((await readStaticFile('/%00')).status, 400);
  assert.equal((await readStaticFile('/%malformado')).status, 400);
  const denied = await readStaticFile('/', 'POST');
  assert.equal(denied.status, 405);
  assert.equal(denied.headers.Allow, 'GET, HEAD');
});

test('HEAD conserva los encabezados de GET sin enviar el cuerpo', async () => {
  const get = await readStaticFile('/');
  const head = await readStaticFile('/', 'HEAD');
  assert.equal(head.status, 200);
  assert.deepEqual(head.headers, get.headers);
  assert.equal(head.body.length, 0);
  assert.equal(head.headers['Content-Length'], get.body.length);
});
