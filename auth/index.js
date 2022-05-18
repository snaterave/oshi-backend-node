const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, 'secreto');
}

function verify(token) {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        throw new Error('Token invalido');
    }
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log('decodificado = ',decoded);

        if(decoded.id !== owner) { 
            throw error('No tienes permisos',401);
            //throw new Error('No tienes permisos');
        }
    },
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};