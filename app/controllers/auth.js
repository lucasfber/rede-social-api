const bcrypt = require("bcrypt");
const Aluno = require("../models/usuario");
const jwt = require("jsonwebtoken");

module.exports.logar = function(req, res) {
  Aluno.findOne({ email: req.body.email })
    .then(u => {
      if (!bcrypt.compareSync(req.body.senha, u.senha)) {
        res.status(401).send("Errou");
      } else {
        let token = jwt.sign({ id: u._id }, "minhaSenhaSecreta");
        res.status(200).send({
          id: u._id,
          token: token,
          message: "Ok"
        });
      }
    })
    .catch(err => res.send(err));
};

module.exports.validar = function(req, res, next) {
  let token = req.body.token || req.query.token;
  jwt.verify(token, "minhaSenhaSecreta", function(err, decoded) {
    if (err) {
      res.status(401).json({
        message: "Not authorized"
      });
    } else {
      next();
    }
  });
};

module.exports.checar = function(req, res, next) {
  let token = req.query.token;
  jwt.verify(token, "minhaSenhaSecreta", function(err, decode) {
    if (err) {
      res.status(401).json({
          message: "No token provided"
      });
    } else {
      next();
    }
  });
};
