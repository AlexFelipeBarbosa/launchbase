// Verificando a data de Nascimento e retornando a Idade.
module.exports = {
  date(timestamp) {
    const date = new Date(timestamp);
    //yyyy
    const year = date.getUTCFullYear();
    //mm (mes vai de 0 a 11 -- Janeiro = 0 e Dezembro = 11)
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    //dd
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
  },
};
