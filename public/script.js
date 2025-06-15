// Inicializar voces
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
  icono.classList.add("vibrando");
  setTimeout(() => icono.classList.remove("vibrando"), 400);

  // Activar animación en las barras
  document.querySelectorAll('.barra').forEach(b => b.classList.add('animar'));

  utterance.onend = () => {
    // Desactivar animación, vuelve a modo reposo
    document.querySelectorAll('.barra').forEach(b => b.classList.remove('animar'));
  };

  speechSynthesis.speak(utterance);
}

