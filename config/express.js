const express = require('express');
const path = require('path');

let usuarioRoutes = require('../app/routes/usuario');
let postRoutes = require('../app/routes/post');

module.exports = function() {
    let app = express();
    app.set('port', 3000);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    
    usuarioRoutes(app);
    postRoutes(app);
    return app;
};