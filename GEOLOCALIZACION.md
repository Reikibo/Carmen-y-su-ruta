# Cómo usar la ubicación

1. Ejecuta el proyecto con `npm start`, o abre la versión HTTPS publicada.
2. Selecciona una ruta y pulsa **Usar mi ubicación** en el panel.
3. Acepta el permiso del navegador. El mapa mostrará tu posición en azul y su radio de precisión.
4. Puedes centrarte, actualizar la lectura, quitarla o consultar el punto de referencia más cercano de esa ruta.

Se obtiene una lectura bajo demanda, sin seguimiento continuo. La posición no se guarda en el navegador ni se incluye en los enlaces compartidos. Al mostrar el mapa se cargan teselas de la zona desde el proveedor cartográfico.

Se solicita alta precisión y se admiten lecturas en caché de hasta 30 segundos. La adquisición tiene un timeout de 15 segundos; el diálogo de permiso puede requerir que el usuario responda antes. La precisión depende del dispositivo, del navegador y del entorno. Un equipo de escritorio puede dar una ubicación menos precisa que un celular.

Si el permiso está bloqueado, habilítalo en la configuración del sitio del navegador y reintenta. Si la lectura falla, los puntos del recorrido siguen disponibles para selección manual. Quitar la ubicación borra la lectura de la aplicación; revocar el permiso se hace desde el navegador.

Las distancias a referencias son en línea recta. Laguna considera los 11 paraderos nombrados; las otras dos rutas usan sus puntos de referencia, pendientes de verificación como lugares de ascenso. No se genera todavía una ruta peatonal ni cambia la simulación de los camiones.

Código: `dist/geolocation.mjs`, integración en `dist/app.js` y capa Leaflet en `dist/real-map.mjs`. Pruebas: `tests/geolocation.test.mjs`.

Referencia técnica: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition.
