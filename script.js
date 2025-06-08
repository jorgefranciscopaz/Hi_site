let texto = "";

function guardarConversacion() {
  const mensajes = document.querySelectorAll(".message");
  mensajes.forEach(msg => {
    texto += msg.textContent + "\n";
  });

  const fecha = new Date().toLocaleString();
  console.log("Conversación guardada el: " + fecha);
  console.log(texto);

  alert("✅ Conversación guardada correctamente\n" + fecha);
}

function limpiarConversacion() {
  const mensajes = document.querySelectorAll(".message");
  mensajes.forEach(msg => msg.remove());

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
