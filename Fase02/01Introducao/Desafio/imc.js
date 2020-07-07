/* Alex Barbosa 06/07/2020
   Programa para calcular IMC
 */

const nome = 'Alex';
const peso = 85;
const altura = 1.67;
const sexo = 'Masculino';

const imc = peso / (altura * altura);
console.log('IMC: ' + imc);

if (imc >= 30) {
  console.log(`${nome} você está acima do peso`);
} else {
  console.log(`${nome} você NÃO está acima do peso. Parabéns!`);
}
