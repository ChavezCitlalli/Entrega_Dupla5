const rateLimit = require('express-rate-limit');

const corsOptions = {
    origin : function (origin, callback) {
        if (process.env.LISTA_BLANCA.indexOf(origin) !== -1){
            callback (null, true);
        } else {
            callback( new Error ('No autorizado por CORS'));
        }
    }
};

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: 'Demasiadas consultas, intente más tarde'
});

const ApiKey = function (err, req, res, next) {
    if (process.env.APIKEY === req.body.apikey) {
        return next();
    } else {
        const error = {
            "message": "System Healteh",
            "error": "Es necesario introducir una ApiKey"
        }
        return res.status(400).json(error);
    }
}

module.exports = { corsOptions, limiter, ApiKey};