const empresa = {
  nome: 'Rocketseat',
  cor: 'roxo',
  foco: 'Programação',
  endereco: {
    rua: 'Rua Guilherme Gembala',
    numero: 260,
  },
};

console.log(
  `A empresa ${empresa.nome} está localizada em ${empresa.endereco.rua}, ${empresa.endereco.numero}`
);
