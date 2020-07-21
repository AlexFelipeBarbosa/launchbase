const express = require('express');
const routes = express.Router();

// Rota "raiz do site"
routes.get('/', function (req, res) {
  return res.render('layout.njk');
});

module.exports = routes;
