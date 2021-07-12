const { productos, Producto } = require('../db/db');
const fetch = require('node-fetch');

async function obtenerProductos () {
    try {
        const url = 'https://api.mercadolibre.com/sites/MLM/search?category=MLM1000';
        const resp = await fetch(url);
        const data = await resp.json();
        const result = data.results;
        if (result.length == 0) {
            throw new Error ('Productos inexistentes');
        } return result;
    } catch (error) {
        throw new Error('Error en obtenerProductos');
    }
}

async function mandarProductos () {
    try {
        const resultado = await obtenerProductos();
        let productos = new Array();
        resultado.forEach(element => {
            productos.push(new Producto(element.id, element.price, element.title, element.thumbnail))
        });
        return productos;
    } catch (error) {
        throw new Error ({"message" : "Error en mandarProductos"});
    }
}

module.exports = { mandarProductos, obtenerProductos, productos};