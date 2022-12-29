# Despliegue de infraestructura

### Requisitos:
* Docker
* Docker-compose

Para levantar la infraestrutura solo debes ejecutar
```bash
#!/bin/bash
docker-compose up -d
```

Esto levantará los siguientes servicios

* `northwind-db`: Base de datos principal de northwind este es un **postgres** y será utilizado principalmente para escritura de datos
* `southwind-db`: Base de datos de lectura **MongoDB**. Esta recibirá las actualizaciones de northwind-db mediante un microservicio.
* `rabbitmq`: Gestor de mensajería asincrona encargado de comunicar los microservivico existente de forma desacolpada

Ahora puedes desplegar el [Stack de aplicaciones](../application-stack/)
