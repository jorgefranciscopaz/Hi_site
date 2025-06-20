// Inicializar voces por origen
const selectors = {
  guante: document.getElementById("languageSelector1"),
  camara: document.getElementById("languageSelector2"),
};

function cargarVoces() {
  const voces = speechSynthesis.getVoices();
  Object.values(selectors).forEach(selector => {
    selector.innerHTML = "";
    voces.forEach((voz, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${voz.name} [${voz.lang}]`;
      selector.appendChild(option);
    });
  });
}

if (speechSynthesis.getVoices().length > 0) {
  cargarVoces();
} else {
  speechSynthesis.onvoiceschanged = cargarVoces;
}

function leerMensaje(origen) {
  const texto = document.getElementById(`oracion${capitalize(origen)}`).textContent.replace(/^> /, "");
  reproducirMensajeSiLibre(texto, origen);
}

function reproducirMensajeSiLibre(texto, origen) {
  if (speechSynthesis.speaking || !texto || texto === "Sin datos...") return;

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.rate = 1;

  const voces = speechSynthesis.getVoices();
  const selector = selectors[origen];
  const vozSeleccionada = voces[selector.value];

  if (vozSeleccionada) {
    utterance.voice = vozSeleccionada;
    utterance.lang = vozSeleccionada.lang;
  }

  // Visualización
  const barras = document.querySelectorAll(`#visualizador${capitalize(origen)} .barra`);
  const icono = document.getElementById(`iconoSonido${capitalize(origen)}`);

  if (icono) icono.classList.add("vibrando");
  barras.forEach(b => b.classList.add("animar"));

  utterance.onend = () => {
    barras.forEach(b => b.classList.remove("animar"));
    if (icono) icono.classList.remove("vibrando");
  };

  speechSynthesis.speak(utterance);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
