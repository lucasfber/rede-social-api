const app = require('../../config/express');
const postController = require('../controllers/post');

module.exports = function(app) {
    app.get('/api/posts', postController.getPosts);
    app.get('/api/posts/:id', postController.getPostPorId);
    app.get('/api/posts/:id/usuario', postController.getUsuarioByPostId);
    app.post('/api/posts', postController.criarPost);
    app.put('/api/posts/:id', postController.atualizaPost);
    app.delete('/api/posts/:id', postController.deletaPost);
}
