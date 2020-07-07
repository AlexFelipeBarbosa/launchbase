const usuarios = [
  { nome: 'Alex', tecnologias: ['HTML', 'CSS', 'JavaScript'] },
  { nome: 'Felipe', tecnologias: ['Node', 'JavaScript', 'HTML'] },
  { nome: 'Barbosa', tecnologias: ['HTML', 'Node', 'CSS'] },
];

for (let usuario of usuarios) {
  console.log(`${usuario.nome} trabalha com ${usuario.tecnologias.join(', ')}`);
}

// Busca por tecnologia
function checaSeUsuarioUsaCSS(usuario) {
  for (let tecnologia of usuario.tecnologias) {
    if (tecnologia === 'CSS') return true;
  }
  return false;
}

for (let i = 0; i < usuarios.length; i++) {
  const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[i]);
  if (usuarioTrabalhaComCSS) {
    console.log(`O usuario ${usuarios[i].nome} trabalha com CSS`);
  }
}
