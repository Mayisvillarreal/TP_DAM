El presente proyecto no corre inmediantamente cuando se ejecuta el comando Docker compose up, en necesario hacer una modificación en el contenedor de my_sql-admin de docker.
Ingresar a los contenedores de docker y buscar el contenedor my_sql-admin, abrir el archivo apache2.conf, ubicado en la siguiente ruta: /etc/apache2/apache2.conf.
Agregar la siguiente línea al final del archivo: ServerName localhost
Reiniciar docker

En el contenedor node-backend correr los siguientes comandos:

npm install jsonwebtoken@8.5.1
npm install moment

En el contenedor ionic-ui correr:

npm install moment
npm install --save highcharts
