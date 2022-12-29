# Stack de aplicaciones

### Requisitos
* Node 14 o superior

Los componentes de nuestro stack son los siguientes:

* `apps`: Contiene las aplicaciones de nuestra arquitectura y contien las siguientes aplicaciones:
    * `northwind-legacy`: Aplicación inicial sin CQRS.
    * `northwind-services`: Aplicaión inicial con las mejoras en el diseño de las operaciones de lectura y escritura.
    * `southwind-sync`:  Aplicación encargada de actualizar el modelo de lectura mediante la escucha de una cola RabbitMQ.
    * `southwind-job-synchronizer`: Job encargado de cargar la base de datos de northwind a southwind.
* `libs`: Librerías creadas para ser utilizadas por nuestras aplicaciones definidas en el directorio `apps`.
    * `persistence`: Librería que contiene el modelo de las bases de datos mediante el uso de ORM y DRM.
    * `event-queue`: Librería de configuración de conexión a RabbitMQ también contiene la estructura de mensajes y el cliente RabbitMQ.

Lo primero que necesitas es instalar las dependecias del proyecto. 

```bash
#!/bin/bash
npm install
```
Estas dependencias son compartidas por todas las aplicaiones y librerías definidas en este directorio. Podemos utilizar `nest-cli` para gestionar nuevas aplicaciones o librerías.

Y instaladas las dependencias ejecutaremos la aplicación `southwind-job-synchronizer`:

```bash
#!/bin/bash
nest start southwind-job-synchronizer
```
Si todo salió bien nustras bases de datos `northwin-db` y `southwind-db` estarán consistentes entre sí y tendras los mismos datos

Para iniciar la aplicación sin mejoras ejecuta

```bash
#!/bin/bash
nest start -w northwind-legacy
```

Ahora si quieres probar la arquitectura con las mejoras de rendimiento ejecuta lo siguiente en diferentes terminales.

```bash
#!/bin/bash
# update the reading model
nest start -w southwind-sync
# main northwind API
nest start -w northwind-services
```

Ahora puedes iniciar las pruebas de carga [Pruebas de carga](../application-stress-testing/)

Alternativamente puedes dirigirte a http://localhost:3000/api-docs para visualizar la docuemntación de nuestra API.

