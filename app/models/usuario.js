const mongoose = require('mongoose');

module.exports = function(){
    const schema = mongoose.Schema({
        id: {
            type: String
        },
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        senha: {
            type: String,
            required: true
        }
    });

    return mongoose.model('Usuario', schema);
}();
