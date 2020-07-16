// Verificando a data de Nascimento e retornando a Idade.
module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }
    return age;
  },
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
    };
  },
};
