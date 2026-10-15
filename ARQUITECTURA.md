# Arquitectura del proyecto

La aplicación que ve el usuario se ejecuta en el navegador. HTML define la estructura; CSS controla el aspecto; JavaScript conecta la interfaz con el modelo y el mapa. No usa un framework de interfaz ni requiere compilación.

| Módulo | Responsabilidad |
| --- | --- |
| `app.js` | Selección de ruta y punto, actualización del DOM, favoritos, URL y reloj de la demo |
| `model.mjs` | Geometría, distancias acumuladas, interpolación y llegadas de la simulación |
| `route-metadata.mjs` | Configuración y nombres en el orden proporcionado |
| `routes-geo.mjs` | Coordenadas de cada recorrido y puntos de consulta |
| `real-map.mjs` | Adaptación del modelo a capas, líneas, marcadores y controles de Leaflet |
| `maps-config.mjs` | Fuente de teselas, atribución y límites del mapa |
| `geolocation.mjs` | Lectura de ubicación bajo demanda, validación, estados y distancia a referencias |

`routeGeometry` relaciona los puntos con el recorrido geográfico. El reloj de `app.js` mueve las unidades a partir de duraciones ilustrativas. Los vehículos terminan en el final y no vuelven a aparecer por el inicio. Las llegadas se calculan solo para unidades que aún no han rebasado el punto consultado.

Leaflet se entrega localmente con su licencia. Las teselas de OpenStreetMap y las fuentes de Google se solicitan por internet. Los favoritos usan `localStorage`; no hay cuentas, base de datos ni sincronización entre equipos. La ubicación del pasajero se conserva solo en memoria durante la visita y se puede quitar. Se dibuja en una capa independiente de las rutas.

El script Python se usa antes de publicar, no durante la visita. Lee la lista ordenada, la red vial OSM incluida y las correcciones manuales, y escribe la geometría y sus metadatos. Las listas de paraderos y las listas de calles cumplen funciones diferentes y no deben confundirse.

El servidor de `scripts/serve.mjs` es exclusivamente una herramienta de desarrollo. Sirve `dist/` por HTTP para que el navegador pueda importar los módulos. No es una API para guardar usuarios, posiciones ni viajes.
