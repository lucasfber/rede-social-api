const usuarioController = require('../controllers/usuario');

module.exports = function(app) {
    app.get('/api/usuarios/', usuarioController.listaUsuarios);
    app.get('/api/usuarios/:id', usuarioController.obterUsuario);
    app.get('/api/usuarios/:id/posts', usuarioController.obterPostsDeUsuario);
    app.post('/api/usuarios/', usuarioController.criaUsuario);
    app.put('/api/usuarios/:id', usuarioController.atualizaUsuario);
    app.delete('/api/usuarios/:id', usuarioController.deletaUsuario);
}
