const express = require('express');
const routes = express.Router();
const instructors = require('./app/controllers/instructors');
const members = require('./app/controllers/members');

// Rota "raiz do site"
routes.get('/', function (req, res) {
  return res.redirect('/instructors');
});

// Rota de Instrutores
routes.get('/instructors', instructors.index);
routes.get('/instructors/create', instructors.create);
routes.get('/instructors/:id/edit', instructors.edit);
routes.get('/instructors/:id', instructors.show);
routes.post('/instructors', instructors.post);
routes.put('/instructors', instructors.put);
routes.delete('/instructors', instructors.delete);

// Rota de Membros
routes.get('/members', members.index);
routes.get('/members/create', members.create);
routes.get('/members/:id/edit', members.edit);
routes.get('/members/:id', members.show);
routes.post('/members', members.post);
routes.put('/members', members.put);
routes.delete('/members', members.delete);

module.exports = routes;