# Siguientes funciones: itinerario a pie y servicio real

La lectura de ubicación del pasajero ya está implementada. Este documento describe las funciones que todavía faltan.

## Camino al paradero por calles

1. Validar las coordenadas de los lugares de ascenso. Los puntos actuales incluyen calles de tránsito y no todos son paraderos confirmados.
2. Conectar un servicio de rutas a pie entre la ubicación del pasajero y el paradero elegido. La distancia actual en línea recta es una referencia inicial, no un itinerario caminable.
3. Dibujar la geometría devuelta en una capa separada con distancia y tiempo a pie. El recorrido fijo del camión debe conservarse.
4. Permitir elegir una posición de origen manual cuando no se obtiene ubicación.

Si el proveedor requiere una clave secreta, usar una API propia para mantenerla fuera del JavaScript público. La solicitud de rutas comparte las coordenadas con ese proveedor. Evitar guardar historiales sin una necesidad de la función.

## Ubicación real de los camiones

Hace falta una interfaz para el chofer o un dispositivo que envíe sus coordenadas a un servicio central. Ese servicio debe asociar cada unidad a su ruta y entregar actualizaciones al mapa del pasajero, con hora de la última lectura y estado de conexión. Es una función diferente de obtener la ubicación del pasajero.

## Estimaciones reales de llegada

Sustituir las duraciones de demostración por mediciones de posición, avance en el recorrido y datos observados de viaje. Una primera versión puede usar distancia restante y velocidad reciente, con tratamiento de paradas y datos desactualizados. No presentar la simulación actual como GPS o tráfico en vivo.

## Validación previa

Confirmar los lugares de ascenso y descenso y verificar en campo la continuación de Calle 37. Esta base dibuja recorridos de referencia; no certifica el sentido legal de las calles ni los giros de circulación.
