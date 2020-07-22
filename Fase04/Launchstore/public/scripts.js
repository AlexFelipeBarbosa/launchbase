const Mask = {
  apply(input, func) {
    setTimeout(function () {
      input.value = Mask[func](input.value);
    }, 1);
  },

  formatBRL(value) {
    // permitindo somente numeros
    value = value.replace(/\D/g, '');

    // formatando para REAL R$
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  },
};
