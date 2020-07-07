const alunosTurmaA = [
  {
    nome: 'Alex',
    nota: 9.8,
  },
  {
    nome: 'Felipe',
    nota: 10,
  },
  {
    nome: 'Barbosa',
    nota: 2,
  },
];

const alunosTurmaB = [
  {
    nome: 'Alexandre Pato',
    nota: 6.1,
  },
  {
    nome: 'Pablo',
    nota: 2,
  },
  {
    nome: 'Daniel Alves',
    nota: 5,
  },
];

function calculaMedia(alunos) {
  return (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3;
}

const media1 = calculaMedia(alunosTurmaA);
const media2 = calculaMedia(alunosTurmaB);

function enviaMensagem(media, turma) {
  if (media > 5) {
    console.log(`A media da turma ${turma} foi de ${media}. Parabéns`);
  } else
    console.log(`A media da turma ${turma} foi de ${media}. Nota muito baixa!`);
}

enviaMensagem(media1, 'A');
enviaMensagem(media2, 'B');
