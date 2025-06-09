let texto = "";

function guardarConversacion() {
  const mensajes = document.querySelectorAll(".message");
  mensajes.forEach((msg) => {
    texto += msg.textContent + "\n";
  });

  const fecha = new Date().toLocaleString();
  console.log("Conversación guardada el: " + fecha);
  console.log(texto);

  alert("✅ Conversación guardada correctamente\n" + fecha);
}

function limpiarConversacion() {
  const mensajes = document.querySelectorAll(".message");
  mensajes.forEach((msg) => msg.remove());

  console.log("Conversación limpiada.");
  alert("✅ Conversación limpiada correctamente");
}

function mostrarConversaciones() {
  if (texto === "") {
    alert("No hay mensajes para mostrar.");
  } else {
    alert("Conversación guardada:\n" + texto);
  }
}

function enviarMensaje(event) {
  event.preventDefault();

  const input = document.getElementById("messageInput");
  const mensaje = input.value.trim();

  if (mensaje === "") {
    alert("Por favor, escribe un mensaje antes de enviar.");
    return;
  }

  const messageBox = document.getElementById("messageBox");
  const nuevoMensaje = document.createElement("div");
  nuevoMensaje.className = "message";
  nuevoMensaje.textContent = `> ${mensaje}`;
  messageBox.appendChild(nuevoMensaje);

  input.value = ""; // limpiar campo de texto
}


function leerMensajes() {
  const mensajes = document.querySelectorAll(".message");

  if (mensajes.length === 0) {
    alert("No hay mensajes para leer.");
    return;
  }

  let texto = "";
  mensajes.forEach((msg) => {
    texto += msg.textContent + ". ";
  });

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "es_US"; 
  utterance.rate = 1; // velocidad de lectura (1 es normal)

  const voices = window.speechSynthesis.getVoices();

  //Se instancia la voz femenina soportada por Google
  const femenineVoice = voices.find(voice => voice.name === "Google español de Estados Unidos");
  if (femenineVoice) {
    utterance.voice = femenineVoice;
  } else {
    console.warn("No se encontró la voz femenina preferida.");
  }
  window.speechSynthesis.speak(utterance);

  speechSynthesis.getVoices().forEach((voz, i) => console.log(i, voz.name, voz.lang));
}
