const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data.js');

// arquivos estaticos
server.use(express.static('public'));

// configurando a template engine
server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true,
});

// adicionado a rota
server.get('/', function (req, res) {
  const about = {
    avatar_url:
      'https://avatars3.githubusercontent.com/u/12144620?s=460&u=b9785347e44440d8a08fbbaf61a72288c05671e0&v=4',
    name: 'Alex Felipe Barbosa',
    role: 'Analista de Sistemas / Desenvolvedor Backend',
    description:
      'Analista de Sistemas e Desenvolvedor SQL, conhecimentos em Oracle PL/SQL. <br> Mais informações acessar: <a href="http://www.alexbarbosa.info" target="_blanck">Blog</a>',
    links: [
      { name: 'Github', url: 'https://github.com/alexfelipebarbosa' },
      { name: 'Twitter', url: 'https://twitter.com/alexf_barbosa' },
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/alexfelipebarbosa',
      },
      { name: 'Site', url: 'http://www.alexbarbosa.info' },
    ],
  };
  return res.render('about', { about });
});

// Rota da pagina portifolio
server.get('/portfolio', function (req, res) {
  return res.render('portfolio', { items: videos });
});

// Rota para visualização do Video
server.get('/video', function (req, res) {
  const id = req.query.id;

  const video = videos.find(function (video) {
    return video.id == id;
  });
  if (!video) {
    return res.send('Video not found!');
  }

  return res.render('video', { item: video });
});

// servidor na porta 5000
server.listen(5000, function () {
  console.log('Server is running!');
});
