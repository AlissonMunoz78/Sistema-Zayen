// admin.js

document.addEventListener("DOMContentLoaded", () => {
    mostrarVisitantes();
    mostrarPiezas();
});

function mostrarVisitantes() {
    const visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    const contenedor = document.getElementById("visitantes");
    if (contenedor) {
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
    }
}

let indiceEditar = null;

document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const imagen = document.getElementById("imagen").files[0];
    const audio = document.getElementById("audio").files[0];
    const mensaje = document.getElementById("admin-message");

    const readerImg = new FileReader();
    const readerAud = new FileReader();

    const piezasGuardadas = JSON.parse(localStorage.getItem("piezasMuseo")) || [];

    function guardarPieza(imagenURL, audioURL) {
    const pieza = {
        titulo: titulo,
        imagen: imagenURL,
        audio: audioURL,
    };

    if (indiceEditar !== null) {
        piezasGuardadas[indiceEditar] = pieza;
        mensaje.textContent = "¡Pieza editada correctamente!";
    } else {
        piezasGuardadas.push(pieza);
        mensaje.textContent = "¡Pieza guardada correctamente!";
    }

    mensaje.style.color = "green";
    localStorage.setItem("piezasMuseo", JSON.stringify(piezasGuardadas));
    document.getElementById("uploadForm").reset();
    indiceEditar = null;
    mostrarPiezas();
    }

    if (imagen && audio) {
    readerImg.onload = function (eImg) {
        const imagenURL = eImg.target.result;
        readerAud.onload = function (eAud) {
        const audioURL = eAud.target.result;
        guardarPieza(imagenURL, audioURL);
        };
        readerAud.readAsDataURL(audio);
    };
    readerImg.readAsDataURL(imagen);
    } else if (indiceEditar !== null) {
    // Si no se cambian los archivos, se usan los existentes
    const piezaExistente = piezasGuardadas[indiceEditar];
    guardarPieza(piezaExistente.imagen, piezaExistente.audio);
    } else {
    mensaje.textContent = "Debes subir imagen y audio.";
    mensaje.style.color = "red";
    }
});

function mostrarPiezas() {
    const contenedor = document.getElementById("piezas-guardadas");
    const piezas = JSON.parse(localStorage.getItem("piezasMuseo")) || [];

    if (!contenedor) return;

    contenedor.innerHTML = "<h3>Piezas del museo registradas:</h3>";

    if (piezas.length === 0) {
    contenedor.innerHTML += "<p>No hay piezas registradas.</p>";
    return;
    }

    piezas.forEach((pieza, i) => {
    contenedor.innerHTML += `
        <div class="card">
        <strong>${i + 1}. ${pieza.titulo}</strong><br/>
        <img src="${pieza.imagen}" alt="${pieza.titulo}" width="100"><br/>
        <audio controls src="${pieza.audio}"></audio><br/>
        <button onclick="editarPieza(${i})">Editar</button>
        <button onclick="eliminarPieza(${i})">Eliminar</button>
        </div>
    `;
    });
}

function eliminarPieza(index) {
    const piezas = JSON.parse(localStorage.getItem("piezasMuseo")) || [];
    piezas.splice(index, 1);
    localStorage.setItem("piezasMuseo", JSON.stringify(piezas));
    mostrarPiezas();
}

function editarPieza(index) {
    const piezas = JSON.parse(localStorage.getItem("piezasMuseo")) || [];
    const pieza = piezas[index];
    document.getElementById("titulo").value = pieza.titulo;
    indiceEditar = index;
    document.getElementById("admin-message").textContent = "Editando pieza... Puedes cambiar el nombre o subir nueva";
}
