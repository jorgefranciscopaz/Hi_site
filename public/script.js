const selector = document.getElementById("languageSelector");

function cargarVoces() {
  const voces = speechSynthesis.getVoices();
  selector.innerHTML = "";
  voces.forEach((voz, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voz.name} [${voz.lang}]`;
    selector.appendChild(option);
  });
}

if (speechSynthesis.getVoices().length > 0) {
  cargarVoces();
} else {
  speechSynthesis.onvoiceschanged = cargarVoces;
}

function leerMensajes() {
  const texto = document.getElementById("oracionTexto").textContent.replace(/^> /, "");
  reproducirMensajeSiLibre(texto);
}

// === Función nueva para evitar solapamientos de audio ===
function reproducirMensajeSiLibre(texto) {
  if (speechSynthesis.speaking || !texto) return;

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.rate = 1;

  const voces = speechSynthesis.getVoices();
  const vozSeleccionada = voces[selector.value];
  if (vozSeleccionada) {
    utterance.voice = vozSeleccionada;
    utterance.lang = vozSeleccionada.lang;
  }

  // Vibrar el icono
  const icono = document.getElementById("iconoSonido");
  if (icono) {
    icono.classList.add("vibrando");
    setTimeout(() => icono.classList.remove("vibrando"), 400);
  }

  // Activar animación en las barras
  document.querySelectorAll('.barra').forEach(b => b.classList.add('animar'));

  // Desactivar animación cuando termina
  utterance.onend = () => {
    document.querySelectorAll('.barra').forEach(b => b.classList.remove('animar'));
  };

  speechSynthesis.speak(utterance);
}
