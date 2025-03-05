const express = require('express');
const app = express();
const shoesJSON = require('./shoes.json');
const crypto = require('node:crypto');
const cors = require('cors');
const { validateShoe, validatePartialShoe } = require('./schemas/shoes.js'); // Importamos la función validateShoe del archivo shoes.js



app.use(express.json())
app.disable('x-powered-by')
app.use(cors())



const PORT = process.env.PORT ?? 3000 // Si el puerto viene por variable de entorno, lo usamos. Si no, usamos el puerto 3000.

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



// En este endpoint, si nos pasan un query param de brand, devolvemos los shoes filtrados por marca.
// Si no nos pasan query param devolvemos todos los shoes.

app.get('/shoes', (req, res) => { 
    res.header('Access-Control-Allow-Origin', '*'); // Permitimos que cualquier cliente haga una petición a nuestro servidor.  
    const { brand } = req.query;  // Recupero el query param de brand(marca)
    if (brand) {
        const brandFilter = []; // Creamos un array vacío para guardar los zapatos filtrados por marca.
        shoesJSON.forEach((shoe) => { // Recorremos el array de zapatos.
            if (shoe.brand.toLowerCase() == brand.toLowerCase()) { // Si la marca del shoe es igual a la marca que nos pasaron por query param lo pusheo al array brandFilter.
                brandFilter.push(shoe);
            }
        })
        return res.json(brandFilter); // Devolvemos el array brandFilter con los shoes filtrados por marca.
    }


    res.json(shoesJSON); // Si no nos pasaron query param devolvemos todos los shoes.
});




// En este endpoint, creamos un nuevo shoe.

app.post('/shoes', (req,res) => {
    const result = validateShoe(req.body); // Validamos el body de la petición con la function que importamos desde SCHEMA.
    
    if(result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) }) // Si hay un error en la validación, devolvemos un 400 Bad Request.
    }

    // SI NO HAY ERRORES DE VALIDACIÓN, CREAMOS UN NUEVO SHOE.

    // En base de datos
    const newShoe = {
        id: crypto.randomUUID(), // Genera un id único. Siempre hay que importarlo en NodeJS

        ... result.data // Con el ... copiamos todas las propiedades del objeto result.data ya VALIDADOS. Si no tendriamos que poner un const = {brand,model,color,price,image} = req.body
    }



    shoesJSON.push(newShoe) // Agregamos el nuevo shoe al array de shoes.

    res.status(201).json(newShoe) // Actualizamos la cache del cliente.
})





// En este endpoint actualizamos parcialmente un shoe.
// Le tenemos pque pasar la id del shoe que queremos actualizar en la URL.

app.patch('/shoes/:id', (req,res) => {
    const result = validatePartialShoe(req.body); // Validamos el body de la petición con la function que importamos desde SCHEMA.
    
    if(result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) }) // Si hay un error en la validación, devolvemos un 400 Bad Request.
    }
    
    // Si NO HAY ERRORES DE VALIDACIÓN, ACTUALIZAMOS EL SHOE.

    const {id} = req.params;
    
    const shoeIndex= shoesJSON.findIndex((shoe) => shoe.id === id); // Obtenemos el índice del zapato que queremos actualizar.

    if(shoeIndex < 0) return res.status(404).json({error: 'Shoe not found'}) // Si el índice es menor a 0, devolvemos un 404 Not Found.

    const updatedShoe = {
        ...shoesJSON[shoeIndex], // Copiamos el objeto que queremos actualizar
        ...result.data // Actualizamos el objeto con las propiedades que nos pasaron
    }

    shoesJSON[shoeIndex] = updatedShoe; // Actualizamos el objeto en el array de zapatos.

    return res.json(updatedShoe); // Devolvemos el objeto actualizado.
})


app.delete('/shoes/:id', (req,res) => { // En este endpoint eliminamos un shoe.
    const { id } = req.params; // Obtenemos el id del shoe que queremos eliminar.
    const shoeIndex = shoesJSON.findIndex((shoe) => shoe.id === id); // Obtenemos el índice del shoe 

    if(shoeIndex == -1) {
        return res.status(404).json({ error: 'Shoe not found' }); // Si el índice es -1, devolvemos un 404 Not Found.
    }

    shoesJSON.splice(shoeIndex, 1); // Eliminamos el shoe del array de shoes.
    return res.json({ message: 'Shoe deleted' }); // Devolvemos un mensaje de éxito.
}); 