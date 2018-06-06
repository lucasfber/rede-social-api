const usuarioController = require('../controllers/usuario');
const auth = require('../controllers/auth');

module.exports = function(app) {
    app.post('/api/usuarios/', usuarioController.criaUsuario);
    app.post('/api/usuarios/signin', auth.logar);
    app.use('/api/usuarios/', auth.checar);   
    app.get('/api/usuarios/', usuarioController.getUsuarios);
    app.get('/api/usuarios/:id', usuarioController.getUsuarioPorId);
    app.put('/api/usuarios/', usuarioController.atualizaUsuario);
    app.delete('/api/usuarios/', usuarioController.deletaUsuario);
    app.get('/api/usuarios/:id/posts', usuarioController.getPostsByUsuarioId); // Not yet
    
    
}
