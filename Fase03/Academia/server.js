const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const server = express();

// arquivos estaticos
server.use(express.static('public'));
server.use(routes);

// configurando a template engine
server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true,
});

// servidor na porta 5000
server.listen(5000, function () {
  console.log('Server is running!');
});
