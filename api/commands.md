### Con npx servor ./web (nombre de la carpeta donde tenga el html) me levanta una url de la pagina web

### Para evitar el error de CORS tenemos que habilitar que cualquier persona ingrese a nuestro dominio (res.header('Access-Control-Allow-Origin', '*'); // Permitimos que cualquier cliente haga una petición a nuestro servidor.)


### La forma mas facil para arreglarlo es instalar un middleware npm install cors -E luego ponemos const cors = require ('cors)

### app.use(cors())


### Con node --watch app.js ponemos a correr a app.


### Cuando ya tenemos el repositorio y queremos correr nuestra app agregamos al package json  
"scripts": {
    "start": "node app.js"
  },


### Lo ideal en NODEJS para el sistema de modulos es usar ESModules en vez de commonJS porque es mas moderno y recomendado.

### Lo primero es ir al package json e ingresar el type que viene default  hay que cambiarlo a "module"
