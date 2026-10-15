# Amor X Carmen — proyecto completo

Código editable de la versión publicada en https://amor-x-carmen-jc.tunedcocoa9.chatgpt.site, exportada el 15 de octubre de 2026. Conserva el diseño, los mapas y el orden de calles que proporcionaste. Puedes abrir esta carpeta en Visual Studio Code y trabajar de manera independiente.

## Ejecutarlo en tu computadora

Requisito: **Node.js 22 o posterior**. Python solo es necesario si quieres regenerar los trazados. No hay paquetes de npm que instalar ni paso de compilación.

1. Extrae todo el ZIP. No ejecutes archivos dentro de la carpeta comprimida.
2. Abre la carpeta `AmorXCarmen` en Visual Studio Code.
3. Abre una terminal dentro de esa carpeta y ejecuta:

```sh
npm start
```

4. Abre **http://localhost:5173** en tu navegador.
5. Para detener el servidor, presiona **Ctrl+C**. Tras editar un archivo, recarga el navegador.

En Windows también puedes hacer doble clic en **INICIAR_WINDOWS.bat** y abrir la dirección que aparece. Si PowerShell bloquea `npm.ps1`, usa `npm.cmd start` o `node scripts/serve.mjs`.

No abras `dist/index.html` con doble clic: la aplicación usa módulos de JavaScript y necesita un servidor HTTP local. Este servidor sirve archivos; no añade una base de datos ni seguimiento GPS. Solo escucha en tu propia computadora (`127.0.0.1`).

## Lo que incluye

- Mapa real con Leaflet y OpenStreetMap, además de una vista de esquema.
- Ruta Costera rosa, Laguna de Términos verde y Campus III azul.
- Orden de inicio a final, sin regresos automáticos al origen.
- Selección de puntos del recorrido, imágenes de referencia y visualización conjunta de las tres rutas.
- Ubicación del pasajero mediante permiso del navegador, marcador azul, radio de precisión y consulta del punto de referencia más cercano.
- Simulación de unidades y tiempos de llegada; pausa y reinicio de la demostración.
- Favoritos guardados en el navegador y enlaces al punto seleccionado.
- Diseño adaptable a computadoras y celulares.

**Los camiones y los tiempos son simulados.** La ubicación del pasajero se obtiene al pulsar «Usar mi ubicación». Todavía no se reciben coordenadas reales de los choferes ni se calcula un itinerario peatonal. El mapa de calles y las tipografías necesitan internet; Leaflet y los trazados están incluidos en el proyecto. La continuidad aproximada de Calle 37 aparece punteada. Las coordenadas de los paraderos requieren validación en campo.

## Dónde editar

| Archivo o carpeta | Para qué sirve |
| --- | --- |
| `dist/index.html` | Estructura, textos, botones y ventanas |
| `dist/styles.css` | Diseño general y adaptación a móviles |
| `dist/app.js` | Interacciones, estado, favoritos y simulación |
| `dist/real-map.mjs` y `dist/real-map.css` | Mapa Leaflet, trazados y marcadores |
| `dist/model.mjs` | Distancias, posiciones y llegadas simuladas |
| `dist/maps-config.mjs` | Configuración del proveedor del mapa |
| `dist/geolocation.mjs` | Lectura de ubicación, validación, errores y referencia más cercana |
| `dist/route-metadata.mjs` | Nombres, colores, puntos y configuración de cada ruta |
| `dist/routes-geo.mjs` | Coordenadas de los recorridos |
| `dist/references/` | Las tres imágenes originales |
| `scripts/ordered-route-input.json` | Fuente editable del orden de calles y paraderos |
| `scripts/build-ordered-routes.py` | Generador de trazados y metadatos |
| `source-data/` | Datos viales y correcciones utilizadas |
| `tests/` | Pruebas de rutas y del servidor local |
| `docs/` | Arquitectura, trazados y siguientes funciones |

Los archivos de rutas generados pueden editarse directamente para una prueba rápida. Para conservar los cambios al regenerar, modifica la fuente en `scripts/ordered-route-input.json` y las correcciones documentadas en `source-data/manual-corrections.json`.

## Pruebas y regeneración

```sh
npm test
```

Para regenerar las rutas, con Python 3.10 o posterior:

```sh
python scripts/build-ordered-routes.py
npm test
```

En Windows puedes usar `py -3` en lugar de `python`; en Linux/macOS, `python3`. No necesitas instalar bibliotecas de Python. La regeneración modifica `dist/routes-geo.mjs`, `dist/route-metadata.mjs` y el reporte de conexiones. Revisa esos cambios antes de usarlos. Véase `docs/TRAZADO_RUTAS.md`.

## Publicación independiente

Publica el **contenido de `dist/`** en un alojamiento para sitios estáticos con HTTPS. No necesita compilación, servidor Node en producción ni variables secretas. El `index.html` debe quedar en la raíz de la carpeta publicada y deben mantenerse todos sus archivos y subcarpetas.

Esta descarga no contiene credenciales ni configuración que permita modificar el sitio ya alojado. Los cambios locales no actualizan automáticamente esa versión.

## Si algo no carga

- **Mapa vacío:** comprueba tu conexión; el proveedor de cartografía puede estar temporalmente indisponible. Prueba el botón Esquema.
- **Puerto ocupado:** cierra la otra instancia. También puedes cambiarlo: PowerShell `$env:PORT=5174; npm.cmd start`, o Linux/macOS `PORT=5174 npm start`.
- **No reconoce Node:** instala Node.js y vuelve a abrir la terminal o VS Code.
- **Los favoritos son distintos:** se guardan por navegador y dirección del sitio; no se sincronizan con la versión alojada.

## Procedencia y alcance

`PROYECTO_ORIGEN.json` identifica el commit de origen y contiene los SHA-256 de los archivos de la web, conservados sin cambios. La geolocalización está incluida en el sitio y en esta entrega. La documentación y el servidor local se añadieron para ejecutar el proyecto en tu computadora. Se verificaron los archivos, las pruebas automáticas y el empaquetado; no se realizó una revisión visual adicional en navegador de esta copia.

Consulta `AVISOS_TERCEROS.md` para las licencias y atribuciones que deben conservarse.
