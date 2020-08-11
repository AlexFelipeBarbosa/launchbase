const crypto = require('crypto');
const { hash } = require('bcryptjs');
const mailer = require('../../lib/mailer');
const User = require('../models/User');

module.exports = {
  loginForm(req, res) {
    return res.render('/session/login');
  },

  login(req, res) {
    req.session.userId = req.user.id;

    return res.redirect('/users');
  },

  logout(req, res) {
    req.session.destroy();
    return res.redirect('/');
  },

  forgotForm(req, res) {
    return res.render('session/forgot-password');
  },

  async forgot(req, res) {
    const user = req.user;

    try {
      // criando um token para esse usuario
      const token = crypto.randomBytes(20).toString('hex');

      // criar uma expiração
      let now = new Date();
      now = now.setHours(now.getHours() + 1); // token vai expirar em 1 hora.

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      // enviar um email com um link de recuperação de senha
      await mailer.sendMail({
        to: user.email,
        from: 'no-reply@launchstore.com.br',
        subject: 'Recuperação de senha',
        html: ` <h2> Perdeu a chave? </h2>
          <p> Não se preocupe, clique no link abaixo para recuperar sua senha </p>
          <p>
            <a href="http://localhost:3000/users/password-reset?token=${token}" target=_blank"> </a>
            RECUPERAR SENHA
          </p>     
      `,
      });

      // avisar o usuario que enviamos o email
      return res.render('session/forgot-password', {
        sucess: 'Verifique seu email para resetar sua senha!',
      });
    } catch (err) {
      console.error(err);
      return res.render('session/forgot-password', {
        error: 'Erro inesperado, tente novamente!',
      });
    }
  },

  resetForm(req, res) {
    return res.render('session/password-reset', { token: req.query.token });
  },

  async reset(req, res) {
    const user = req.user;
    const { password, token } = req.body;

    try {
      // Cria um novo hash de senha
      const newPassword = await hash(password, 8);

      // Atualiza o usuário
      await User.update(user.id, {
        password: newPassword,
        reset_token: '',
        reset_token_expires: '',
      });

      // Avisa o usuário que ele tem uma nova senha
      return res.render('/session/login', {
        user: req.body,
        sucess: 'Senha atualizada! Faça o seu login',
      });
    } catch (err) {
      console.error(err);
      return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Erro inesperado, tente novamente!',
      });
    }
  },
};
