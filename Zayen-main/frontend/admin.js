// admin.js

function cerrarSesion() {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
  const contenedor = document.getElementById("visitantes");

  if (visitantes.length === 0) {
    contenedor.innerHTML = "<p>No hay visitantes registrados.</p>";
  } else {
    contenedor.innerHTML = "<h3>Visitantes Registrados:</h3>";
    visitantes.forEach((v, i) => {
      contenedor.innerHTML += `
        <div class="card">
          <strong>${i + 1}. ${v.nombre}</strong><br/>
          Institución: ${v.institucion}<br/>
          Teléfono: ${v.telefono}<br/>
          Edad: ${v.edad}
        </div>
      `;
    });
  }

  // Aquí también agregas el listener del formulario (dentro del DOMContentLoaded)
  document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const imagen = document.getElementById("imagen").files[0];
    const audio = document.getElementById("audio").files[0];
    const mensaje = document.getElementById("admin-message");

    if (!imagen || !audio) {
      mensaje.textContent = "Debes subir imagen y audio.";
      mensaje.style.color = "red";
      return;
    }

    const readerImg = new FileReader();
    const readerAud = new FileReader();

    readerImg.onload = function (eImg) {
      const imagenURL = eImg.target.result;

      readerAud.onload = function (eAud) {
        const audioURL = eAud.target.result;

        const pieza = {
          titulo: titulo,
          imagen: imagenURL,
          audio: audioURL
        };

        const piezasGuardadas = JSON.parse(localStorage.getItem("piezasMuseo")) || [];
        piezasGuardadas.push(pieza);
        localStorage.setItem("piezasMuseo", JSON.stringify(piezasGuardadas));

        mensaje.textContent = "¡Pieza guardada correctamente!";
        mensaje.style.color = "green";
        document.getElementById("uploadForm").reset();
      };

      readerAud.readAsDataURL(audio);
    };

    readerImg.readAsDataURL(imagen);
  });
});
