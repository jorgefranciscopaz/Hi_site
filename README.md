# 🧤 Traductor de Guante

**Traductor de Guante** es una aplicación web interactiva que convierte texto proveniente de un guante con sensores (usando Arduino + Firebase) en **síntesis de voz** en tiempo real. Además, la interfaz presenta un diseño moderno, visualizaciones animadas de audio y es completamente responsive para móvil y escritorio.

---

## 🚀 Características

- 🔥 Integración en tiempo real con **Firebase Realtime Database**
- 🔊 Reproducción automática del mensaje usando **SpeechSynthesis API**
- 🌐 Selector de idioma para personalizar la voz
- 🌈 Visualizador animado de ondas mientras se reproduce audio
- ✨ Interfaz visual con efecto **Glassmorphism**
- 📱 Adaptado para dispositivos móviles y pantallas grandes

---


## 🧰 Tecnologías Utilizadas

| Tecnología         | Descripción                          |
|--------------------|--------------------------------------|
| **HTML5/CSS3**     | Maquetado, estilos responsivos, UI   |
| **JavaScript**     | Lógica de reproducción y animaciones |
| **Firebase**       | Base de datos en tiempo real         |
| **Web Speech API** | Sintetizador de voz del navegador    |

---

## 📁 Estructura del Proyecto

```
/Hi_site
│
├── index.html             # Página principal
├── script.js              # Funciones de voz, lectura y visualización
├── styles.css             # Estilos visuales y animaciones
└── /images
    └── kit_wp.png         # Imagen de fondo
```

---

## ⚙️ Configuración y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jorgefranciscopaz/Hi_site.git
   cd Hi_site
   ```

2. Abre `index.html` en un navegador moderno como Chrome o Edge.

3. Asegúrate de que tu proyecto en Firebase esté configurado con:
   - Realtime Database en modo lectura/escritura pública o autenticada.
   - Estructura:
     ```
     frases/
       - autoid123:
           mensaje: "Hola Mundo"
     ```

4. La página escuchará automáticamente los nuevos mensajes y los reproducirá por voz.

---

## 🧪 Demo en vivo

📍 [Ver en Vercel](https://hi-site.vercel.app)

---

## 📌 Autor

- **Jorge Francisco Paz Sauceda**  
  Desarrollador Frontend | UI/UX Designer  
  [GitHub](https://github.com/jorgefranciscopaz)

---

## 🎯 Ideas para futuras mejoras

- 🗃️ Cola de frases por reproducir
- 🔁 Prevención de frases repetidas
- 🌍 Traducción automática de frases
- 🧩 Módulo de configuración de idioma/voz preferido
- 🖥️ Modo kiosk/pantalla completa

---

## 📄 Licencia

Este proyecto es de código abierto y se encuentra bajo la licencia MIT.
