import {z} from 'zod'  // Importamos la librería zod que sirve para validar datos.


const shoeSchema = z.object({
        brand: z.string(),
        model: z.string(),
        color: z.string(),
        price: z.number().int().positive(),
        image: z.string().url()
    })

export function validateShoe(object) {
    return shoeSchema.safeParse(object); // El safeParse devuelve el objeto result que nos dice si la validación fue exitosa o no.    
}

export function validatePartialShoe (object) {
    return shoeSchema.partial().safeParse(object); // Partial sirve para que no sea obligatorio pasar todas las propiedades del objeto. Pero las valida de todas maneras.
}

