
let productos = [];

class Producto {
    constructor(id, precio, nombre, imagen){
        this.id = id,
        this.precio = precio,
        this.nombre = nombre,
        this.imagen = imagen
    }
}

module.exports = { productos, Producto };

