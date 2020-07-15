const fs = require('fs'); // file system - trabalhando com arquivos
const data = require('../data/data.json'); // recebendo o arquivo de dados.
const { age, date } = require('../utils/utils');

exports.index = function (req, res) {
  return res.render('members/index', { members: data.members });
};

// show (mostrar o Instrutor por Id)
exports.show = function (req, res) {
  // desestruturando o req.params e pegando o Id
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });
  if (!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    age: age(foundMember.birth),
  };

  return res.render('members/show', { member: member });
};

exports.create = function (req, res) {
  return res.render('members/create');
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
  const id = Number(data.members.length + 1);

  // Gravando o arquivo
  data.members.push({
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
    return res.redirect('/members');
  });
};

// Edit
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return id == member.id;
  });
  if (!foundMember) return res.send('Instrutor não encontrado!');

  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
  };

  return res.render('members/edit', { member });
};

// PUT - Alterar
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function (member, foundIndex) {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.members[index] = member;

  fs.writeFile('./data/data.json', JSON.stringify(data, null, 2), function (
    err
  ) {
    if (err) return res.send('Write Error!');
    return res.redirect(`/members/${id}`);
  });
};

// DELETE
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredMembers = data.members.filter(function (member) {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile('./data/data.json', JSON.stringify(data, null, 2), function (
    err
  ) {
    if (err) return res.send('Write file error!');
    return res.redirect('/members');
  });
};
