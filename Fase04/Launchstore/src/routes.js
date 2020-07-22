const express = require('express');
const routes = express.Router();
const ProductController = require('./app/controllers/ProductController');

// Rota "raiz do site"
routes.get('/', function (req, res) {
  return res.render('layout.njk');
});

routes.get('/products/create', ProductController.create);
routes.post('/products', ProductController.post);

// Alias
routes.get('/ads/create', function (req, res) {
  return res.redirect('/products/create');
});

module.exports = routes;