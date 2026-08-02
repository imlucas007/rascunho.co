const DATA_ALVO = new Date(2026, 7, 5, 0, 0, 0); 

const elDias = document.getElementById('dias');
const elHoras = document.getElementById('horas');
const elMinutos = document.getElementById('minutos');
const elSegundos = document.getElementById('segundos');
const elContador = document.getElementById('contador');
const elMensagemEncerrado = document.getElementById('mensagem-encerrado');

// Garante que o número sempre apareça com 2 dígitos (ex: "05" em vez de "5")
function doisDigitos(numero) {
  return String(numero).padStart(2, '0');
}

function atualizarContagem() {
  const agora = new Date().getTime();
  const diferenca = DATA_ALVO.getTime() - agora;

  if (diferenca <= 0) {
    clearInterval(intervalo);
    elContador.hidden = true;
    elMensagemEncerrado.hidden = false;
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  elDias.textContent = doisDigitos(dias);
  elHoras.textContent = doisDigitos(horas);
  elMinutos.textContent = doisDigitos(minutos);
  elSegundos.textContent = doisDigitos(segundos);
}

atualizarContagem(); // roda uma vez de imediato, sem esperar 1 segundo
const intervalo = setInterval(atualizarContagem, 1000);