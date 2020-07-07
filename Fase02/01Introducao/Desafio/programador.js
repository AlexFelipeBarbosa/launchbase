const programador = {
  nome: 'Alex Felipe Barbosa',
  idade: 38,
  tecnologias: [
    {
      nome: 'SQL',
      especialidade: 'Desktop',
    },
    {
      nome: 'JavaScript',
      especialidade: 'Web/Mobile',
    },
    {
      nome: 'Node',
      especialidade: 'Web',
    },
    {
      nome: 'React Native',
      especialidade: 'Mobile',
    },
  ],
};

console.log(
  `O programador ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}`
);
