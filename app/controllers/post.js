let usuarioController = require("./usuario");
const posts = [
  { id: 1, texto: "Eu sou o Lucas", likes: 10, uid: 1 },
  { id: 2, texto: "Oi! Eu sou a Maria", likes: 30, uid: 2 },
  { id: 3, texto: "Hi!Good Morning!", likes: 40, uid: 2 },
  {
    id: 4,
    texto: "Assistindo Fortaleza X Ceará, Bora Leão!",
    likes: 20,
    uid: 3
  }
];

module.exports.getPosts = function(req, res) {
  res.json(posts);
};

module.exports.obterPost = function(req, res) {
  let id = req.params.id;
  let post = posts.find(p => p.id == id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).send({ error: "Nenhum post encontrado com id: " + id });
  }
};

module.exports.criarPost = function(req, res) {
  let post = req.body;

  if (post) {
    posts.push(post);
    res.status(201).send({ ok: "Post criado com sucesso!" });
  } else {
    res.send(400).send({ erro: "Nao foi possível criar o post!" });
  }
};

module.exports.getPostsPorUsuario = function(uid) {
  return posts.filter(post => post.uid == uid);
};

module.exports.atualizaPost = function(req, res) {
  let id = req.params.id;
  let novoPost = req.body;
  let post = posts.find(p => p.id == id);

  if (post) {
    if (novoPost) {
      let postIndex = posts.indexOf(post);
      posts.splice(postIndex, 1, novoPost);
      res.status(200).send({ ok: "Post atualizado com sucesso!" });
    }
  } else {
    res.status(404).send({ error: "Post nao encontrado para atualização!" });
  }
};

module.exports.deletaPost = function(req, res) {
  let id = req.params.id;
  let post = posts.find(p => p.id == id);
  if (post) {
    let postIndex = posts.indexOf(post);
    posts.splice(postIndex, 1);
    res.status(200).send({ msg: "Post excluído com sucesso!" });
  } else {
    res.status(404).send({ error: "Post não encontrado para exclusão" });
  }
};

module.exports.obterUsuarioDePost = function(req, res) {
  let id = req.params.id;
  if (id) {
    let post = posts.find(p => p.id == id);
    if (post) {
      let usuario = usuarioController.getUsuarioDePost(post.uid);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).send({ "error": "Erro!" });
      }
    } else {
        res.status(404).send({ "error": "Post não encontrado!"});
    }

  }
};
