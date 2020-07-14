const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();

server.use(express.urlencoded({ extended: true })); // utilizado no POST para pegar os dados do Body
server.use(express.static('public')); // arquivos estaticos
server.use(methodOverride('_method'));
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
