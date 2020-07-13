const express = require('express');
const routes = express.Router();
const instructors = require('./instructors');

// Rota "raiz do site"
routes.get('/', function (req, res) {
  return res.redirect('/instructors');
});

// Rota de Instrutores
routes.get('/instructors', function (req, res) {
  return res.render('instructors/index');
});

routes.get('/instructors/create', function (req, res) {
  return res.render('instructors/create');
});

routes.post('/instructors', instructors.post);

// Rota de Membros
routes.get('/members', function (req, res) {
  return res.send('members');
});

module.exports = routes;