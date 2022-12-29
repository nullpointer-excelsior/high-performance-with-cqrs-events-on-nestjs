# Arquitectura de alto rendimiento con CQRS y eventos sobre NestJs 

El siguiente proyecto presenta una arquitectura de microservicios de alta concurrencia empleando una solución a nivel de diseño del sistema. Esta solución se enfoca en separar las operaciones de lectura y escritura mediante CQRS incluyendo la separación del modelo de datos en un motor para la lectura y otro para la escritura. Nos ayudaremos de una arquitectura orientada a eventos para integrar de forma desacoplada nuevos componentes que ayudaran a sincronizar el estado de los modelos de datos antes mencionados.

La idea es poder realizar pruebas de carga sobre una API basada en el modelo de datos Northwind un esquema que representa órdenes de compra, productos, un stock básico, clientes, proveedores y vendedores.

Estas pruebas serán hechas con Locust una librería Python especializada en pruebas de carga con un entorno gráfico.

Levantaremos la infraestructura mediante docker-compose así podremos levantar el stack de aplicaciones y tendremos donde tendremos disponible tanto la versión inicial como la mejorada capaza de soportar un ambiente concurrente.

## Despliegue del laboratorio

- [Infraestructura](application-infraestructure)
- [Stack de aplicaciones](application-stack)
- [Pruebas de Carga](application-stack)


**Author**: Benjamín 