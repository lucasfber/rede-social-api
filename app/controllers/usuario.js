const postController = require("./post");
const Usuario = require("../models/usuario");
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getUsuarios = function(req, res) {
  if (req.query.email) {
    Usuario.find({ email: req.query.email })
      .then(u => res.status(200).json(u))
      .catch(err => res.status(500).send());
  } else if (req.query.nome) {
    Usuario.find({ nome: new RegExp("" + req.query.nome + "", "i") })
      .then(u => res.status(200).json(u))
      .catch(err => res.status(500).send());
  } else {
    Usuario.find()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).send(err));
  }
};

module.exports.getUsuarioPorId = function(req, res) {
  let id = req.params.id;

  if (id) {
    Usuario.findById(id)
      .then(u => res.status(200).json(u))
      .catch(err => res.status(500).send());
  } else {
    res.status(500).send();
  }
};

module.exports.getPostsByUsuarioId = function(req, res) {
    let id = req.params.id;
    if (id) {
    Usuario.findById(id).then(u => {
      Post.find({ uid: u._id })
        .then(p => res.status(200).json(p))
        .catch(err => res.send(err));
    });
  } else res.status(500).send();
};

module.exports.criaUsuario = function(req, res) {
  let usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha, 10)
  });

  if (usuario) {
    Usuario.create(usuario)
      .then(u =>
        res.status(201).json({
          id: u._id,
          nome: u.nome,
          email: u.email
        })
      )
      .catch(err => res.status(500).json(err));
  } else {
    res.status(500).send();
  }
};

module.exports.atualizaUsuario = function(req, res) {
  let novoUsuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha, 10)
  };

  let payload = jwt.decode(req.query.token);
  let _id = payload.id;

  if (novoUsuario) {
    Usuario.findByIdAndUpdate(_id, novoUsuario, { new: true })
      .then(u => res.status(201).json(u))
      .catch(u => res.status(404).send());
  } else {
    res.status(500).send();
  }
};

module.exports.deletaUsuario = function(req, res) {
  let payload = jwt.decode(req.query.token);
  let _id = payload.id;
  Usuario.findByIdAndRemove(_id)
    .then(u => res.status(200).json({ msg: "ok"}))
    .catch(err => res.status(500).send(err));
};

module.exports.signIn = function(req, res) {
  let u = {
    email: req.body.email,
    senha: req.body.senha
  };
};
