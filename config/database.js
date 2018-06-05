const mongoose = require('mongoose');

module.exports = function(uri) {
    mongoose.connect(uri);
    mongoose.connection.on('connected', () => console.log('Conectdo em ' + uri));
    mongoose.connection.on('disconnected', () => console.log('Desconectado de ' + uri));
    mongoose.connection.on('error', (erro) => console.log('Erro! ' + erro));

    mongoose.set('debug', true);
}