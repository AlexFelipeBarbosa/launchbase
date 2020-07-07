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
    nota: 7.3,
  },
  {
    nome: 'JuanFran',
    nota: 5.7,
  },
  {
    nome: 'Reinaldo',
    nota: 2.8,
  },
  {
    nome: 'Thiago Volpi',
    nota: 5.4,
  },
];

function calculaMedia(alunos) {
  let soma = 0;
  for (let i = 0; i < alunos.length; i++) {
    soma = soma + alunos[i].nota;
  }
  const media = soma / alunos.length;
  return media;
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

// Marcar aluno como reprovado se a nota for menor que 5
function marcarComoReprovado(aluno) {
  aluno.reprovado = false;
  if (aluno.nota < 5) {
    aluno.reprovado = true;
  }
}

function enviarMensagemReprovado(aluno) {
  if (aluno.reprovado) {
    console.log(`O aluno ${aluno.nome} está REPROVADO!`);
  }
}

function alunoReprovado(alunos) {
  for (let aluno of alunos) {
    marcarComoReprovado(aluno);
    enviarMensagemReprovado(aluno);
  }
}

alunoReprovado(alunosTurmaA);
alunoReprovado(alunosTurmaB);
