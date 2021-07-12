//Importamos los módulos necesarios
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const{ corsOptions } = require('./Middleware/middleware');
const { obtenerProductos, mandarProductos, productos } = require('./Services/product.service');

//Middlewares Globales
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true})); //decodificar
app.use((err, req, res, next) => {
    console.log(err);
    if(err) {
        if(!res.headersSent) {
            return res.status(500).json('Error interno en el servidor')}
    };
    next();
})

//Levantamos nuestro SERVIDOR
app.listen(process.env.PORT, () => {
    console.log(`Servidor inicializado en http://${process.env.HOST}:${process.env.PORT}`);
})

//Endpoint
app.get('/', async (req, res) => {
    try {    
        const result = await mandarProductos();
        res.send(result);
        console.log(result);
    } catch (error) {
        const mensajeError = { error: error.message };
        res.status(404).send(mensajeError);
    }
})