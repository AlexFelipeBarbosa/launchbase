// create
exports.post = function (req, res) {
  const keys = Object.keys(req.body); // criando um array de chaves

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Please, fill all fields');
    }
  }

  return res.send(req.body);
};
