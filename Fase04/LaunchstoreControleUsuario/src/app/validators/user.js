const User = require('../models/User');

async function post(req, res, next) {
  // Verificando se todos os campos estão preenchidos.
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') {
      return res.render('user/register', {
        user: req.body,
        error: 'Por favor, preencha todos os campos!',
      });
    }
  }

  // Verificando se o usuario existe (email e cpf_cnpj são unicos)
  let { email, cpf_cnpj, password, passwordRepeat } = req.body;

  cpf_cnpj = cpf_cnpj.replace(/\D/g, '');

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj },
  });

  if (user)
    return res.render('user/register', {
      user: req.body,
      error: 'Usuário já cadastrado!',
    });

  // Verificando se a senha está correta
  if (password != passwordRepeat)
    return res.render('user/register', {
      user: req.body,
      error: 'A senha e a repetição da senha estão incorretas!',
    });

  next();
}

module.exports = {
  post,
};
