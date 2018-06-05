const mongoose = require('mongoose');

module.exports = function() {
    let schema = mongoose.Schema({
        id: {
            type: String
        },
        texto: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        uid: {
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario',
            required: true,
        }
    });

    return mongoose.model('Post', schema);  
}();