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

    materiaHeader();

    
});


function materiaHeader () {
    
    // creacion de elementos 
    let divContenedor = document.createElement("div");
    let tituloArticulo = document.createElement("h2");
    let imagenArticulo = document.createElement("img");

    //adicion de propiedades
    divContenedor.classList.add("materia__header");
    tituloArticulo.classList.add("materia__title");
    imagenArticulo.classList.add("materia__star");
    imagenArticulo.src = "assets/icons/star.svg";
    imagenArticulo.alt = "estrella de prioidad";
    
    //agregando a nodo
    divContenedor.appendChild(tituloArticulo);
    divContenedor.appendChild(imagenArticulo);

    console.log(divContenedor);


}


