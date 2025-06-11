// Firebase compat (debe estar definido en el HTML antes de este script)
const db = firebase.database();

// Inicializar selector de idioma
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
  utterance.rate = 1;
  const voces = speechSynthesis.getVoices();
  const vozSeleccionada = voces[selector.value];
  if (vozSeleccionada) {
    utterance.voice = vozSeleccionada;
    utterance.lang = vozSeleccionada.lang;
  }
  speechSynthesis.speak(utterance);
}

if (speechSynthesis.getVoices().length > 0) {
  cargarVoces();
} else {
  speechSynthesis.onvoiceschanged = cargarVoces;
}

// FUNCIONALIDAD SOLO LECTURA DESDE FIREBASE
function escucharMensajesFirebase() {
  db.ref("mensajes").on("child_added", (snapshot) => {
    const datos = snapshot.val();
    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.className = "message";
    nuevoMensaje.textContent = `${datos.texto}`;
    document.getElementById("messageBox").appendChild(nuevoMensaje);
    scrollAlFinal();
  });
}

function scrollAlFinal() {
  const box = document.getElementById("messageBox");
  box.scrollTop = box.scrollHeight;
}

escucharMensajesFirebase();

function guardarConversacion() {
  const mensajes = document.querySelectorAll(".message");
  if (mensajes.length === 0) return;
  let contenido = [];
  mensajes.forEach((msg) => {
    contenido.push(msg.textContent);
  });
  const fecha = new Date().toISOString().split("T")[0];
  let conversaciones = JSON.parse(localStorage.getItem("conversaciones")) || [];
  conversaciones.push({ fecha: fecha, mensajes: contenido });
  localStorage.setItem("conversaciones", JSON.stringify(conversaciones));
  alert("✅ Conversación guardada correctamente");
}

function limpiarConversacion() {
  document.getElementById("messageBox").innerHTML = "";
  db.ref("mensajes").remove();
  alert("✅ Conversación limpiada correctamente");
}

function mostrarConversaciones() {
  document.getElementById("sidebar").classList.remove("hidden");
  window.open("sidebar.html", "sidebar", "width=400,height=600");
  cargarConversacionesGuardadas();
}

function cerrarSidebar() {
  document.getElementById("sidebar").classList.add("hidden");
}

function cargarConversacionesGuardadas() {
  const container = document.getElementById("conversacionesContainer");
  container.innerHTML = "";
  const conversaciones = JSON.parse(localStorage.getItem("conversaciones")) || [];
  if (conversaciones.length === 0) {
    container.innerHTML = "<p>No hay conversaciones guardadas.</p>";
    return;
  }
  conversaciones.forEach((conv, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "historial-item";
    itemDiv.innerHTML = `<span>${conv.fecha}</span><span class="flecha">&#10148;</span>`;
    const contenidoDiv = document.createElement("div");
    contenidoDiv.className = "contenido-oculto";
    contenidoDiv.id = `contenido-${index}`;
    contenidoDiv.innerHTML = conv.mensajes.map((m) => `<div>${m}</div>`).join("");
    itemDiv.addEventListener("click", () => {
      const visible = contenidoDiv.style.display === "block";
      contenidoDiv.style.display = visible ? "none" : "block";
      const flecha = itemDiv.querySelector(".flecha");
      flecha.classList.toggle("expandido", !visible);
    });
    container.appendChild(itemDiv);
    container.appendChild(contenidoDiv);
  });
}

function abrirModal() {
  document.getElementById("myModal").style.display = "block";
  cargarConversacionesGuardadas();
}

function cerrarModal() {
  document.getElementById("myModal").style.display = "none";
}

function borrarHistorial() {
  if (confirm("¿Estás seguro de que quieres borrar todo el historial?")) {
    localStorage.removeItem("conversaciones");
    cargarConversacionesGuardadas();
    alert("✅ Historial eliminado correctamente.");
  }
}

window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
