const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

// arquivos estaticos
server.use(express.static('public'));

// configurando a template engine
server.set('view engine', 'html');

nunjucks.configure('views', {
  express: server,
});

// adicionado a rota
server.get('/', function (req, res) {
  return res.render('index');
});

// Rota da pagina portifolio
server.get('/portfolio', function (req, res) {
  return res.render('portfolio');
});

// servidor na porta 5000
server.listen(5000, function () {
  console.log('Server is running!');
});
