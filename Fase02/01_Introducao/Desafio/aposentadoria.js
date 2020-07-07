/* Alex Barbosa 06/07/2020
   Programa de Calculo de Aposentadoria
 */

const nome = 'Alex';
const sexo = 'M';
const idade = 38;
const contribuicao = 23;
const calculo = idade + contribuicao;

if (sexo === 'M') {
  if (contribuicao >= 35 || calculo >= 95) {
    console.log(`${nome} você pode já pode se Aposentar`);
  } else {
    console.log(`${nome} você ainda Não pode se aposentar`);
  }
} else {
  if (contribuicao >= 30 || calculo >= 85) {
    console.log(`${nome} você pode já pode se Aposentar`);
  } else {
    console.log(`${nome} você ainda Não pode se aposentar`);
  }
}
