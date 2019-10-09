# YACA (Yet Another Chat Aplication)

## Empezar a desarrollar

``` bash
# Uri para conectarse a mongo
export MONGO_DBURI="mongodb://localhost:27017/yaca"

# Clave para generar el JWT
export JWT_SECRET="falopa"

# Url a la que redirije el api ante autentificaciones externas
export CALLBACK_URL="{{url de la aplicacion front end}}"

### Credenciales otorgadas por google https://console.developers.google.com/
export GCLIENT_ID = "client id otorgado por google"
export GCLIENT_SECRET: "client secret otrogado por google"
export GCALLBACK_URL: "http://localhost:3000/auth/google/callback" #callback de nuestra api registrada en google

npm start # esto corre "node src/app.js"
```


## Enunciado

Aplicacion de mensajeria sencilla y altamente extensible


## Requerimientos
1. Envío de mensajes entre usuarios.
2. Soporte para distintos tipos de mensajes.
3. Un usuario puede definir quien puede emitirle mensajes.
4. Un usuario puede definir que tipos de mensajes puede recibir.
5. Capacidad para guardar el historial del mensajería.
6. Búsqueda de mensajes.
7. Ser extensible mediante aplicaciones de terceros.

### Adicional
1. Encriptacion p2p

## User story
1. Como usuario quiero enviar mensajes a otros usuarios.
2. Para enviar un mensaje a otro usuario lo busco en el sistema y redacto el mensaje
3. Como usuario quiero recibir mensajes de otros usuarios.



## Modelo de dominio
---
### [Draw.io Diagram](https://drive.google.com/file/d/13zXml6lNlbYjnXCQLp-vc1tgRMA-I0Ca/view?usp=sharing)
![alt text][Diagrama]

[Diagrama]: ./docs/modelo_dominio_v1.0.png "Modelo de dominio" 

## Integrantes 

1. Bruno Dolce     42090
2. Nahuel Alvarez  42197
3. Tomás Bargut    42939
