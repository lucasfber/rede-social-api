let Post = require("../models/post");
let Usuario = require("../models/usuario");
let usuarioController = require("./usuario");
const jwt = require("jsonwebtoken");

module.exports.getPosts = function(req, res) {
  Post.find()
    .exec()
    .then(data => res.json(data), error => res.status(500).send(error));
};

module.exports.getPostPorId = function(req, res) {
  let id = req.params.id;

  Post.findById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
};

module.exports.criarPost = function(req, res) {
  let payload = jwt.decode(req.query.token);
  let _id = payload.id;
  let post = new Post({
    texto: req.body.texto,
    likes: req.body.likes,
    uid: _id
  });

  Post.create(post)
    .then(p => res.status(201).json(p))
    .catch(err => res.status(500).send(err));
};

module.exports.atualizaPost = function(req, res) {

  let idPost = req.params.id;
  let postUpdated = req.body;
  let payload = jwt.decode(req.query.token);
  let idUsuarioLogado = payload.id;

  Post.findOne({_id: idPost})
    .then(post => {
      if(post.uid != idUsuarioLogado) {
        console.log(post.uid);
        console.log(idUsuarioLogado);
        res.status(403).json({ error: 'No authorized!'});
      }
      else {
        Post.findByIdAndUpdate(idPost, postUpdated)
          .then(p => res.status(201).send({ msg: "ok"})); 

      }
    })
    .catch(err => res.status(400).send(err));
};

module.exports.deletaPost = function(req, res) {

  let idPost = req.params.id;
  let payload = jwt.decode(req.query.token);
  let idUsuarioLogado = payload.id;

  Post.findOne({_id: idPost})
    .then(post => {
      if(post.uid != idUsuarioLogado) {
        res.status(403).json({ error: 'No authorized!'});
      }
      else {
        Post.findByIdAndRemove(idPost)
          .then(p => res.status(200).send({ msg: "ok"}));
          
      }
    })
    .catch(err => res.status(400).send(err));
};

module.exports.getUsuarioByPostId = function(req, res) {
  let id = req.params.id;
  if (id) {
    Post.findById(id).then(post => {
      if (post) {
        Usuario.find({ _id: post.uid })
          .then(data => res.status(200).json(data))
          .catch(err => res.status(404).send(err));
      }
    });
  }
};
