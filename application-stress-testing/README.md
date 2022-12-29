# Pruebas de carga

Para realizar las pruebas de carga nos ayudamos de [Locust](https://docs.locust.io/en/stable/quickstart.html) una herramienta hecha en pyton con una interfaz gráfica.

Para ejecutar Locust:

```bash
#!/bin/bash

pip3 install locust

locust -V
# locust 2.14.0 from /usr/local/lib/python3.10/site-packages/locust (python 3.10.6)
```

Ejecutar los Users definidos:

```bash
#!/bin/bash

locust -f locustfile_create_orders.py,locustfile_get_orders.py

```

Ahora dirigete a http://localhost:8089 y podrás empezar a realizar las pruebas que estimes convenientes. En este ejemplo puedes definir entre 200 y 300 usuarios para ver los mejores resultados de rendimiento para la arquitectura planteada en estre proyecto.