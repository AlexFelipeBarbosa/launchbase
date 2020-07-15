const fs = require('fs'); // file system - trabalhando com arquivos
const data = require('../data/data.json'); // recebendo o arquivo de dados.
const { date } = require('../lib/utils');

exports.index = function (req, res) {
  return res.render('members/index', { members: data.members });
};

// show (mostrar o Membro por Id)
exports.show = function (req, res) {
  // desestruturando o req.params e pegando o Id
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });
  if (!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).birthDay,
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

  // Padronizando as datas
  birth = Date.parse(req.body.birth);

  // Regra para gravar o Id
  let id = 1;
  //Pegando o ultimo Id de Members
  const lastMember = data.members[data.members.length - 1];
  if (lastMember) {
    id = lastMember.id + 1;
  }

  // Gravando o arquivo
  data.members.push({
    ...req.body,
    id,
    birth,
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
  if (!foundMember) return res.send('Membro não encontrado!');

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso,
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
