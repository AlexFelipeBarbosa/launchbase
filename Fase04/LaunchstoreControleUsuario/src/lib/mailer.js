const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'b492d2e17105ff',
    pass: '93709a6269dee4',
  },
});
