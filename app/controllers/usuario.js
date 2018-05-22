const postController = require('./post');

const usuarios = [
    {id: 1, nome: 'Lucas', email: 'lucas.bertoldo@gmail.com', senha: '12345'},
    {id: 2, nome: 'Maria', email: 'mariasilva@gmail.com', senha: 'abcde'},
    {id: 3, nome: 'Ze', email: 'zealves@gmail.com', senha: 'abc123'}
];

module.exports.listaUsuarios = function(req, res) {
    res.json(usuarios); 
};

module.exports.obterUsuario = function(req, res) {
    let id = req.params.id;
    let usuario = usuarios.find(u => (u.id == id));

    //let usuario = usuarios.find(u => (u.id == id));
     /* se usado o === dar erro*/
    console.log(usuario);
    if(usuario) {
        res.json(usuario);
    }

    else {
        res.status(404).send('Usuario nao encontrado');
    }
};

module.exports.obterPostsDeUsuario = function(req, res) {
    let userId = req.params.id;
    let userPosts = [];
    console.log(userId);
    userPosts = postController.getPostsPorUsuario(userId);
    res.json(userPosts);
}

module.exports.criaUsuario = function(req, res) {
    let usuario = req.body;
    if(usuario) {
        usuarios.push(usuario);
        res.status(201).send({ "ok": "Usuário criado com sucesso!"});
    }
    else {
        res.status(400).send({ "error": "Formato de dados enviados não suportado"});
    }
};

module.exports.atualizaUsuario = function(req, res) {
    let novoUsuario = req.body;
    let id = req.params.id;
    let usuario = usuarios.find((u) => (u.id == id));

    if(usuario) {
        let index = usuarios.indexOf(usuario);
        usuarios.splice(index, 1, novoUsuario);
        res.status(200).send({ "ok" : "Usuario atualizado com sucesso!"});
    }

    else {
        res.status(404).send({ "error": "Usuario nao encontrado!" })
    }
}

module.exports.deletaUsuario = function(req, res) {
    let id = req.params.id;
    let usuario = usuarios.find(u => (u.id == id));

    if(usuario) {
        let usuarioIndex = usuarios.indexOf(usuario);
        usuarios.splice(usuarioIndex, 1);
        res.status(200).send({ "ok" : "Usuario deletado com sucesso!"});
    }
    else {
        res.status(404).send({ "error": "Usuario nao encontrado!"});
    }
}

module.exports.getUsuarioDePost = function(id){
    return usuarios.find(u => (u.id == id));
}