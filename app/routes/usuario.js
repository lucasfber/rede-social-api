const usuarioController = require('../controllers/usuario');

module.exports = function(app) {
    app.get('/api/usuarios/', usuarioController.getUsuarios);
    app.get('/api/usuarios/:id', usuarioController.getUsuarioPorId);
    app.get('/api/usuarios/:id/posts', usuarioController.getPostsByUsuarioId);
    app.post('/api/usuarios/', usuarioController.criaUsuario);
    app.put('/api/usuarios/:id', usuarioController.atualizaUsuario);
    app.delete('/api/usuarios/:id', usuarioController.deletaUsuario);
}
