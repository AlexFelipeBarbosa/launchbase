const crypto = require('crypto');
const mailer = require('../../lib/mailer');
//const User = require('../models/User');

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
  },
};
