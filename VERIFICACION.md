# Verificación de la entrega

Fecha: 15 de octubre de 2026.

- Los archivos de `dist/` se compararon mediante SHA-256 con la versión del sitio del commit indicado en `PROYECTO_ORIGEN.json`: sin cambios.
- `npm test`: 16 pruebas aprobadas, sin fallos. Se comprueba el orden de las tres rutas, la continuidad de geometrías, las llegadas de la simulación la lectura de geolocalización y la entrega de archivos por el servidor local.
- El servidor se probó a través de su función de respuesta, sin abrir un puerto ni usar un navegador.
- El generador Python se ejecutó en una copia temporal. Las 7 pruebas de rutas volvieron a pasar después de regenerar.
- Se verificaron sintaxis JavaScript, sintaxis Python y referencias de archivos locales del HTML.
- Entorno de comprobación: Linux, Node.js 24.19.0, Python 3.12.14. No se ejecutó el lanzador de Windows en Windows.
- No se realizó una nueva revisión visual en navegador de esta copia ni se solicitó una ubicación real. El permiso y el marcador requieren prueba manual en un navegador.
- El ZIP no incluye historial Git, credenciales ni la configuración privada de publicación.

Estas pruebas verifican el proyecto y la coherencia de sus datos; no certifican la vigencia del transporte, la ubicación exacta de los paraderos ni los sentidos de circulación.
