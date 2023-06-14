# DSWbackend

## Grupo
### Integrantes
* 45016 - González, Alberto Sebastián
* 46839 - Utrera, Edsel Ángel

### Repositorios
* [frontend app](https://github.com/alsego41/DSWfrontend)
* [backend app](https://github.com/alsego41/DSWbackend)

## Tema
### Descripción
Aplicación web que permite a cualquier usuario buscar alojamientos dentro del país, y una vez registrados los mismos pueden proceder a alquilarlos según su conveniencia, a su vez se permite que cualquier usuario tome el rol de anfitrion y así publique sus propiedades para alquilar temporalmente.


### Modelo
[![](https://mermaid.ink/img/pako:eNqVVFtvmzAU_ivIT-uUIkhpSNBepk1aJ7VZl6ovEy-OfdJYARvZJl2a5b_P5hIwQZvqB7C_852rz_EREUEBJYhkWKmvDL9InKfcM4syCUQzwb3VfY08K5Depz_X196dUHqIfSuhBR-lKEDqg5eiwPcfUuQZeYpC31-avVX5Hy80-3tBsPVfc9tTJ6-4jZ5jc884gQEvrHmuzUfJKuLZ-cdOq42tZj6B3A-49X55QV2BiWXfxjqS1zvpXWrVHdUVP9aIXYx2DLs2TCq9xDl0kNEbIJSz7gA5Zll9PPU92Vs-O1pjvvtMiCi5bqGiXGdMbT9ctYA56R-vvEmQgXJFK-Aa6J3ZCXloRY7HqofOLqXhX1r4l_65oZz6uAW3S2msS3WJY0olKNUBb4L3qqYKTKAnlULkP_v6a6y3A4DsDljSDnmRLMtGQ7f91Yu7sMBliBRreC7sl45Yafvbyd9teru4aYZL9BVM-G0rDetaD9WwrhXq2nVRx0y_1x1LPcHwkkZFNv0vWyC772OgKPWI83aEHccN6GbggCc0QTlIMyLUPJOVcopMmcw0ocRsKWxwmekUpdxScanF04ETlGxwpmCCyuqumpf1jBaYo-SIfqMkivwgDOJoFgTTcBFPZ7MJOqBkuvCjKIxu4ziaR-FNMJ-dJujN9BtKAn8RzuZBtIhv4nAeL24rc78qmZalsQ6UmRF5aF52-zv9BUnGvdk?type=png)](https://mermaid.live/edit#pako:eNqVVFtvmzAU_ivIT-uUIkhpSNBepk1aJ7VZl6ovEy-OfdJYARvZJl2a5b_P5hIwQZvqB7C_852rz_EREUEBJYhkWKmvDL9InKfcM4syCUQzwb3VfY08K5Depz_X196dUHqIfSuhBR-lKEDqg5eiwPcfUuQZeYpC31-avVX5Hy80-3tBsPVfc9tTJ6-4jZ5jc884gQEvrHmuzUfJKuLZ-cdOq42tZj6B3A-49X55QV2BiWXfxjqS1zvpXWrVHdUVP9aIXYx2DLs2TCq9xDl0kNEbIJSz7gA5Zll9PPU92Vs-O1pjvvtMiCi5bqGiXGdMbT9ctYA56R-vvEmQgXJFK-Aa6J3ZCXloRY7HqofOLqXhX1r4l_65oZz6uAW3S2msS3WJY0olKNUBb4L3qqYKTKAnlULkP_v6a6y3A4DsDljSDnmRLMtGQ7f91Yu7sMBliBRreC7sl45Yafvbyd9teru4aYZL9BVM-G0rDetaD9WwrhXq2nVRx0y_1x1LPcHwkkZFNv0vWyC772OgKPWI83aEHccN6GbggCc0QTlIMyLUPJOVcopMmcw0ocRsKWxwmekUpdxScanF04ETlGxwpmCCyuqumpf1jBaYo-SIfqMkivwgDOJoFgTTcBFPZ7MJOqBkuvCjKIxu4ziaR-FNMJ-dJujN9BtKAn8RzuZBtIhv4nAeL24rc78qmZalsQ6UmRF5aF52-zv9BUnGvdk)

*A métodos prácticos evitamos la declaración de métodos getters en el diagrama.*

## Alcance Funcional 

|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Host<br>2. CRUD Guest<br>3. CRUD Location<br>4. CRUD Province<br>5. CRUD Property<br>6. CRUD Reservation<br>7. CRUD Price<br>8. CRUD Service|
|CRUD dependiente|1. CRUD Host {depende de} CRUD Location<br>2. CRUD Guest {depende de} CRUD Location<br>3. CRUD Location {depende de} CRUD Province<br>4. CRUD Price {depende de} CRUD Property<br>5. CRUD Reservation {depende de} CRUD Property<br>6. CRUD Property {depende de} CRUD Location|
|Listado<br>+<br>detalle| 1. Listado alojamientos por localidad/provincia => detalle CUU Buscar por Location/Province<br> 2. Listado de reservas filtrado por rango de fecha, id de propiedad, fecha inicio y fin estadía, estado y nombre del cliente => detalle muestra datos completos de la reserva y del cliente<br> 3.Listado de historial de alojamientos del huesped.<br>4. Listado de alojamientos según filtros de la propiedad (ej. precio, ambientes, camas, baños, patio,etc…)|
|CUU/Epic|1. Registrar reserva de alojamiento<br>2. Registrar alojamiento para alquilar<br>3. Registrar cancelación de reserva (de anfitrión o de huesped)<br> 4. Buscar alojamientos por filtros|
