import express, { json } from 'express';
import cors from 'cors';
import { shoesRouter } from './routes/shoes.js';

// Como leer un json en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./api/shoes.json', 'utf-8')); // Leemos el archivo JSON de zapatos y lo parseamos a un array de objetos.

// Como leer un json en ESModules RECOMENDADO!!!!
// Basicamente es crear un require como usabamos en commonJS.
import {createRequire} from 'node:module' // Importamos la función createRequire de NodeJS
const require = createRequire(import.meta.url) // Tiene la direccion del archivo actual

app.use('/movies', shoesRouter) // Cuando nos llega una petición a /movies, usamos el enrutador de shoes. Es decir si nos llega un url.com/movies se va a mostrar el contenido de shoesRouter en routes/shoes.js

const app = express();
app.use(json())
app.disable('x-powered-by')
app.use(cors())



const PORT = process.env.PORT ?? 3000 // Si el puerto viene por variable de entorno, lo usamos. Si no, usamos el puerto 3000.

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})