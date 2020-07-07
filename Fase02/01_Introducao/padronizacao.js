/* Padronização
   --> Retirar os comentarios desnecessarios.
   --> Padronizar virgula, ponto e virgula.
   --> Separar as execuções das funções.
   --> Padronizar em Inglês

*/

const classA = [
  {
    name: 'Alex',
    grade: 9.8,
  },
  {
    name: 'Felipe',
    grade: 10,
  },
  {
    name: 'Barbosa',
    grade: 2,
  },
];

const classB = [
  {
    name: 'Alexandre Pato',
    grade: 6.1,
  },
  {
    name: 'Pablo',
    grade: 2,
  },
  {
    name: 'Daniel Alves',
    grade: 7.3,
  },
  {
    name: 'JuanFran',
    grade: 5.7,
  },
  {
    name: 'Reinaldo',
    grade: 2.8,
  },
  {
    name: 'Thiago Volpi',
    grade: 5.4,
  },
];

function calculateAverage(students) {
  let sum = 0;
  for (let i = 0; i < students.length; i++) {
    sum = sum + students[i].grade;
  }
  const average = sum / students.length;
  return average;
}

const average1 = calculateAverage(classA);
const average2 = calculateAverage(classB);

function sendMessage(average, turma) {
  if (average > 5) {
    console.log(`${turma} average: ${average}. Good!`);
  } else console.log(`${turma} average: ${average}. Is not good!`);
}

function markAsFlunked(student) {
  student.flunked = false;
  if (student.grade < 5) {
    student.flunked = true;
  }
}

function sendFlunkedMessage(student) {
  if (student.flunked) {
    console.log(`The student ${student.name} is flunked!`);
  }
}

function studentsflunkeds(students) {
  for (let student of students) {
    markAsFlunked(student);
    sendFlunkedMessage(student);
  }
}

sendMessage(average1, 'ClassA');
sendMessage(average2, 'ClassB');

studentsflunkeds(classA);
studentsflunkeds(classB);
