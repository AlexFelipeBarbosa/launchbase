const express = require('express');
const routes = express.Router();

// Rota "raiz do site"
routes.get('/', function (req, res) {
  return res.redirect('/instructors');
});

// Rota de Instrutores
routes.get('/instructors', function (req, res) {
  return res.render('instructors/index');
});

// Rota de Membros
routes.get('/members', function (req, res) {
  return res.send('members');
});

module.exports = routes;
