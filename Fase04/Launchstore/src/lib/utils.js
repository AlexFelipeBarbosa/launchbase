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
    const hour = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return {
      day,
      month,
      year,
      hour,
      minutes,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
  },

  formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price / 100);
  },
};
