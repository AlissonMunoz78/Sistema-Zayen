const piezas = [
  {
    titulo: "Fósil de Megaterio",
    imagen: "img/megaterio.jpg",
    audio: "audio/megaterio.mp3",
  },
  {
    titulo: "Cráneo de Toxodon",
    imagen: "img/toxodon.jpg",
    audio: "audio/toxodon.mp3",
  },
];

const gallery = document.getElementById("gallery");

piezas.forEach((pieza, index) => {
  const div = document.createElement("div");
  div.className = "art-piece";

  const audioId = `audio-${index}`;

  div.innerHTML = `
    <img src="${pieza.imagen}" alt="${pieza.titulo}">
    <h3>${pieza.titulo}</h3>
    <div class="audio-controls">
      <img src="img/retroceder.png" alt="Retroceder" onclick="retroceder('${audioId}')">
      <img src="img/adelantar.png" alt="Adelantar" onclick="adelantar('${audioId}')">
    </div>
    <audio id="${audioId}" class="custom-audio" controls preload="none">
      <source src="${pieza.audio}" type="audio/mpeg" />
      Tu navegador no soporta audio.
    </audio>
  `;
  gallery.appendChild(div);
});

function retroceder(id) {
  const audio = document.getElementById(id);
  audio.currentTime = Math.max(0, audio.currentTime - 5);
}

function adelantar(id) {
  const audio = document.getElementById(id);
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}
