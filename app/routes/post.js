const app = require('../../config/express');
const postController = require('../controllers/post');
const auth = require('../controllers/auth');

module.exports = function(app) {
    app.use('/api/posts', auth.checar);
    app.get('/api/posts', postController.getPosts);
    app.get('/api/posts/:id', postController.getPostPorId);
    app.post('/api/posts', postController.criarPost);
    app.put('/api/posts/:id', postController.atualizaPost);
    app.delete('/api/posts/:id', postController.deletaPost);
    app.get('/api/posts/:id/usuario', postController.getUsuarioByPostId);
    
    
}
