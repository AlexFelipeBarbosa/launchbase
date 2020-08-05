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

  formatCpfCnpj(value) {
    // permitindo somente numeros
    value = value.replace(/\D/g, '');

    if (value.length > 14) value = value.slice(0, -1); // limitando para 14 caracteres

    // Verificando se é um CPF ou CNPJ
    if (value.length > 11) {
      //CNPJ
      /*  Vai receber neste formato: 11222333444455
          Retornar neste formato: 11.222.333/4444-55 */

      value = value.replace(/(\d{2})(\d)/, '$1.$2'); // 11.222333444455
      value = value.replace(/(\d{3})(\d)/, '$1.$2'); // 11.222.333444455
      value = value.replace(/(\d{3})(\d)/, '$1/$2'); // 11.222.333/444455
      value = value.replace(/(\d{4})(\d)/, '$1-$2'); // 11.222.333/4444-55
    } else {
      //CPF
      /*  Vai receber neste formato: 11122233344
          Retornar neste formato: 111.222.333-44 */

      value = value.replace(/(\d{3})(\d)/, '$1.$2'); // 111.22233344
      value = value.replace(/(\d{3})(\d)/, '$1.$2'); // 111.222.33344
      value = value.replace(/(\d{3})(\d)/, '$1-$2'); // 111.222.333-44
    }

    return value;
  },

  formatCep(value) {
    // permitindo somente numeros
    value = value.replace(/\D/g, '');

    if (value.length > 8) value = value.slice(0, -1); // limitando para 8 caracteres

    /* Vai receber neste formato: 11111222
        Retornar neste formato: 11111-222 */
    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    return value;
  },
};
