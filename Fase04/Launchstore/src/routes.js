const express = require('express');
const routes = express.Router();

// Rota "raiz do site"
routes.get('/', function (req, res) {
  return res.send('ok!S');
});

module.exports = routes;
