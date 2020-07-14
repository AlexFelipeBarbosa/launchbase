const fs = require('fs'); // file system - trabalhando com arquivos
const data = require('./data/data.json'); // recebendo o arquivo de dados.
const { age, date } = require('./utils/utils');

// show (mostrar o Instrutor por Id)
exports.show = function (req, res) {
  // desestruturando o req.params e pegando o Id
  const { id } = req.params;

  const foundInstructor = data.intructors.find(function (instructor) {
    return instructor.id == id;
  });
  if (!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat('pt-BR').format(
      foundInstructor.created_at
    ),
  };

  return res.render('instructors/show', { instructor: instructor });
};

// create
exports.post = function (req, res) {
  const keys = Object.keys(req.body); // criando um array de chaves

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Please, fill all fields');
    }
  }

  // Desestruturando o req.body (para ter certeza que estamos pegando somente as informações necessárias.)
  let { avatar_url, birth, name, services, gender } = req.body;

  // Incluindo a data de cadastro no JSON
  const created_at = Date.now(); // data de agora

  // Padronizando as datas
  birth = Date.parse(birth);

  //Criando o Id de Instrutor
  const id = Number(data.intructors.length + 1);

  // Gravando o arquivo
  data.intructors.push({
    id,
    name,
    avatar_url,
    birth,
    gender,
    services,
    created_at,
  });
  fs.writeFile('./data/data.json', JSON.stringify(data, null, 2), function (
    err
  ) {
    if (err) return res.send('Write file error!');
    return res.redirect('/instructors');
  });
};

// Edit
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.intructors.find(function (instructor) {
    return id == instructor.id;
  });
  if (!foundInstructor) return res.send('Instrutor não encontrado!');

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  };

  return res.render('instructors/edit', { instructor });
};
