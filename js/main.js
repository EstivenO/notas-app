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
let materiaEnEdicion = null;

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
    if(materiaEnEdicion) {

        materiaEnEdicion.nombre = textoMateria;
        materiaEnEdicion.calificacion = parseFloat(textoCalificacion);

        localStorage.setItem("materias", JSON.stringify(materias));

        materiaEnEdicion = null;
        btnAgregarMateria.textContent = "Agregar";

        listaMaterias.innerHTML = "";
        materias.forEach(renderMateria);
    }else {
        const materia = {
            id: Date.now(),
            nombre: textoMateria,
            calificacion: parseFloat(textoCalificacion),
            importante: false
        }

        materias.push(materia);
        localStorage.setItem("materias", JSON.stringify(materias))

        renderMateria(materia);
    }

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

    materiaImportante(imagenArticulo, materia);
    

    if(materia.importante) {
        imagenArticulo.classList.add("materia__star--active")
    }

    //agregando a nodo principal
    divContenedor.appendChild(tituloArticulo);
    divContenedor.appendChild(imagenArticulo);

    //adicionar a el articulo
    crearArticulo(divContenedor,materia.calificacion,materia); 
}

function crearArticulo(elemento,calificacion,materia){
    let articulo = document.createElement("article");
    let parrafo = document.createElement("p");
    
    articulo.classList.add("materia");
    parrafo.classList.add("materia__content");
    parrafo.textContent = calificacion;
    
    eliminarMateria(elemento, articulo, materia);

    editarMateria(articulo,materia);
    
    
    articulo.appendChild(elemento);
    articulo.appendChild(parrafo);

    listaMaterias.appendChild(articulo);
}

function materiaImportante(estrella, materia) {
    
    estrella.addEventListener("click", ()=>{
        materia.importante = !materia.importante;

        localStorage.setItem("materias", JSON.stringify(materias));

        estrella.classList.toggle("materia__star--active");
    });
}

function eliminarMateria(header, articulo ,materia) {
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.classList.add("materia__button-delete");
    header.appendChild(btnEliminar);

    btnEliminar.addEventListener("click", (e)=> {
        e.stopPropagation();
        if(materia.importante) {
            mensajeValidacion.textContent = "No se permite eliminar una materia destacada";
            mensajeValidacion.classList.add("materias__msjVisible");
            
            setTimeout(()=> {
                mensajeValidacion.classList.remove("materias__msjVisible");
            },2000);
            return;
        }

        let materiasAlmacenadas = materias.filter(m => m.id !== materia.id);

        materias.length = 0;
        materias.push(...materiasAlmacenadas);

        localStorage.setItem("materias", JSON.stringify(materias));

        articulo.remove();      
    });
}

function editarMateria(articulo,materia) {

    articulo.addEventListener("click", ()=> {
        
        inputMateria.value = materia.nombre;
        inputCalificacion.value = materia.calificacion;
        
        btnAgregarMateria.textContent = "Actualizar";

        materiaEnEdicion = materia;



    })
}

function validaciones(materia,calificacion) {

    let nota = parseFloat(calificacion);

    if (isNaN(nota)) {
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
