
// Basicamente es crear un require como usabamos en commonJS.
import {createRequire} from 'node:module' // Importamos la función createRequire de NodeJS
const require = createRequire(import.meta.url) // Tiene la direccion del archivo actual
export const readJSON = (path) => require(path) // Leemos el archivo JSON de shoes y lo parseamos a un array de objetos.