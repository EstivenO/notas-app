// ==========================
// Selección de elementos DOM
// ==========================

const inputMateria = document.querySelector("#inputMateria");
const inputCalificacion = document.querySelector("#inputCalificacion");
const btnAgregarMateria = document.querySelector("#btnAgregar");
const listaMaterias = document.querySelector("#listaMaterias");
const mensajeValidacion = document.querySelector("#mensaje");

// ==========================
// Estado de la aplicación
// ==========================

const materias = [];

// ==========================
// Evento: agregar tarea
// ==========================

btnAgregarMateria.addEventListener("click", () => {

    let textoMateria = inputMateria.value.trim();
    let textoCalificacion = inputCalificacion.value.trim();

    if(textoMateria === "" && textoCalificacion === "") {
        mensajeValidacion.textContent = "No ingresaste informacion de la materia";
        mensajeValidacion.classList.add("materias__msjVisible");
        return;
    }

    mensajeValidacion.classList.remove("materias__msjVisible");


});



