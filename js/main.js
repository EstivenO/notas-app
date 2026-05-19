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
// Carga inicial desde localStorage
// ==========================
const materiasGuardadas = localStorage.getItem("materias");

if( materiasGuardadas === null ) {
  
}else{
    const materiasString =JSON.parse(materiasGuardadas);
    for(let materia of materiasString) {
        materias.push(materia);
        renderMateria(materia);
    }
};


// ==========================
// Evento: agregar tarea
// ==========================

btnAgregarMateria.addEventListener("click", () => {

    const textoMateria = inputMateria.value.trim();
    const textoCalificacion = inputCalificacion.value.trim();

     if(textoMateria === "" || textoCalificacion === "") {
        mensajeValidacion.textContent = "No ingresaste informacion de la materia";
        mensajeValidacion.classList.add("materias__msjVisible");
        return;
    } 
      if(!validaciones(textoMateria,textoCalificacion)) {
        return;
      };

    mensajeValidacion.classList.remove("materias__msjVisible");

    const materia = {
        nombre: textoMateria,
        calificacion: parseFloat(textoCalificacion),
        importante: false
    }

    materias.push(materia);
    localStorage.setItem("materias", JSON.stringify(materias))

    renderMateria(materia);

    inputMateria.value  = "";
    inputCalificacion.value = "";

    
});


function renderMateria (materia) {
    
    // creacion de elementos 
    let divContenedor = document.createElement("div");
    let tituloArticulo = document.createElement("h2");
    let imagenArticulo = document.createElement("img");

    //adicion de propiedades
    divContenedor.classList.add("materia__header");
    tituloArticulo.classList.add("materia__title");
    tituloArticulo.textContent = materia.nombre;
    imagenArticulo.classList.add("materia__star");
    imagenArticulo.src = "assets/icons/star.svg";
    imagenArticulo.alt = "estrella de prioidad";

    materiaImportante(imagenArticulo, materia.nombre);

    if(materia.importante) {
        imagenArticulo.classList.toggle("materia__star--active")
    }


    //agregando a nodo principal
    divContenedor.appendChild(tituloArticulo);
    divContenedor.appendChild(imagenArticulo);

   
    //adicionar a el articulo
    crearArticulo(divContenedor,materia.calificacion);

   
}

function crearArticulo(elemento,calificacion){
    let articulo = document.createElement("article");
    let parrafo = document.createElement("p");
    
    articulo.classList.add("materia");
    parrafo.classList.add("materia__content");
    parrafo.textContent = calificacion;
    
    articulo.appendChild(elemento);
    articulo.appendChild(parrafo);

    listaMaterias.appendChild(articulo);
    
    
}

function validaciones(materia,calificacion) {

    if (isNaN(calificacion)) {
        mensajeValidacion.textContent = "Debes ingresar una calificación numérica";
        mensajeValidacion.classList.add("materias__msjVisible");
        return false;
    }


    if(calificacion > 5) {
        mensajeValidacion.textContent = "No se puede calificar por encima de 5, es la nota maxima permitida";
        mensajeValidacion.classList.add("materias__msjVisible");
        return false;
    }

    if(calificacion < 0) {
        mensajeValidacion.textContent = "No se puede calificar por debajo de 0, ya que es la menor nota permitida";
        mensajeValidacion.classList.add("materias__msjVisible");
        return false;
    }

    return true;

}

function materiaImportante(estrella, textoMateria) {
    
    estrella.addEventListener("click", ()=>{
        let materiasGuardada = JSON.parse(localStorage.getItem("materias"));
        materiasGuardada.forEach(materia => {
            if(textoMateria === materia.nombre){
                if(materia.importante){
                    materia.importante = false;
                    return;
                }
                materia.importante = true;
            }
        });
        materias.push(...materiasGuardada);
        localStorage.setItem("materias", JSON.stringify(materiasGuardada));
        estrella.classList.toggle("materia__star--active")
    });
}

