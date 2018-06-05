let Post = require("../models/post");
let Usuario = require('../models/usuario');
let usuarioController = require("./usuario");

module.exports.getPosts = function(req, res) {
  Post.find()
    .exec()
    .then( data => res.json(data), error => res.status(500).send(error));
};

module.exports.getPostPorId = function(req, res) {
  let id = req.params.id;
  Post.findById(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));

  console.log("Chamei");
};

module.exports.criarPost = function(req, res) {
  Post.create(req.body)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).send(err));
};

module.exports.atualizaPost = function(req, res) {
  let id = req.params.id;

  if (id) {
    let post = req.body;
    if (post) {
      Post.findByIdAndUpdate(id, post, {new : true})
        .then((data) => res.status(200).json(data))
        .catch(err => res.status(500).send(err));
    }
  }
};

module.exports.deletaPost = function(req, res) {
  let id = req.params.id;
  if (id) {
    Post.findByIdAndRemove(id)
      .then((data) => res.status(200).json(data))
      .catch(err => res.status(500).send(err));
  } else {
    res.status(404).send({ error: "Post não encontrado para exclusão" });
  }
};

module.exports.getUsuarioByPostId = function(req, res) {
  let id = req.params.id;
  if (id) {
    Post.findById(id)
      .then((post) => {
        if(post) {
          Usuario.find({ _id: post.uid })
            .then(data => res.status(200).json(data))
            .catch(err => res.status(404).send(err));
        }
      });
  }
};
