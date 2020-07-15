const fs = require('fs'); // file system - trabalhando com arquivos
const data = require('../data/data.json'); // recebendo o arquivo de dados.
const { age, date } = require('../utils/utils');

exports.index = function (req, res) {
  return res.render('instructors/index', { instructors: data.instructors });
};

// show (mostrar o Instrutor por Id)
exports.show = function (req, res) {
  // desestruturando o req.params e pegando o Id
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
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

exports.create = function (req, res) {
  return res.render('instructors/create');
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
  const id = Number(data.instructors.length + 1);

  // Gravando o arquivo
  data.instructors.push({
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

  const foundInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id;
  });
  if (!foundInstructor) return res.send('Instrutor não encontrado!');

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso,
  };

  return res.render('instructors/edit', { instructor });
};

// PUT - Alterar
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function (
    instructor,
    foundIndex
  ) {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.instructors[index] = instructor;

  fs.writeFile('./data/data.json', JSON.stringify(data, null, 2), function (
    err
  ) {
    if (err) return res.send('Write Error!');
    return res.redirect(`/instructors/${id}`);
  });
};

// DELETE
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(function (instructor) {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile('./data/data.json', JSON.stringify(data, null, 2), function (
    err
  ) {
    if (err) return res.send('Write file error!');
    return res.redirect('/instructors');
  });
};
