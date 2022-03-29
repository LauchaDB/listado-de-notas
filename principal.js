const btn= document.querySelector("[data-form-btn]")
let contador=0;
let contadorId = 1;


const addTarea = (evento) => {
    
    evento.preventDefault();

    let tareaIngresada = document.querySelector("[data-form-input]");
    let calendar = document.querySelector("[data-form-date]");
    let date = moment(calendar.value).format('DD/MM/YYYY');

    let valorIngresado = tareaIngresada.value;

    if(valorIngresado === ""){
        alert("DEBE INTRODUCIR TEXTO");
        return;
    }
    if(date == "Invalid date"){
        date = " "
    }

    tareaIngresada.value = "";
    calendar.value = "";

    const complete = false;

    const tareaObj = {
        valorIngresado,
        date,
        complete,
        id: uuid.v4(),
    };

    let arrayDeTareas = JSON.parse(localStorage.getItem('tareas')) || [];
    arrayDeTareas.push(tareaObj);
    localStorage.setItem('tareas', JSON.stringify(arrayDeTareas));

    const tarea = crearTarea(tareaObj);
};

const crearTarea = ({valorIngresado, date, complete, id}) => { 
    
    let listaTarea = document.querySelector("[data-listaTarea]");

    let li = document.createElement("li");
    li.classList.add("tarjetaTarea");

    let div = document.createElement("div");
    div.classList.add("contenedor", "row");

    let pfecha = document.createElement("p");
    pfecha.textContent = date;
    pfecha.classList.add("col-2")

    let p = document.createElement("p");
    p.classList.add("text" , "col-8");
    p.textContent = valorIngresado;

    let img = document.createElement("img");
    img.src = "images/logook.png";
    img.classList.add("col-1", "logoOk")
    img.style.width = "7%";
    if(complete){
        img.src = "images/logoOkAzul.png";
    }
    img.onclick = cambiarLogo;
    
    function cambiarLogo(){
        const listadoDeLasTareas = JSON.parse(localStorage.getItem('tareas'));
        const index = listadoDeLasTareas.findIndex(item => item.id === id);
        
        listadoDeLasTareas[index]["complete"] = !listadoDeLasTareas[index]["complete"];
    
        localStorage.setItem('tareas', JSON.stringify(listadoDeLasTareas));

        if(complete){
            img.src = "images/logoOkAzul.png";
        }else {
            img.src = "images/logook.png";
        }
        
        const liLimpio = document.querySelector("[data-listaTarea]");

        liLimpio.innerHTML = "";

        leerTarea();
    }

    let img2 = document.createElement("img");
    img2.src = "images/delete.png";
    img2.classList.add("col-1", "logoDelete");
    img2.style.width = "7%";
    img2.onclick = eliminarTarea;
    function eliminarTarea(){

        const listadoDeLasTareas = JSON.parse(localStorage.getItem('tareas'));
        const index = listadoDeLasTareas.findIndex(item => item.id === id);
        const liLimpio = document.querySelector("[data-listaTarea]");

        listadoDeLasTareas.splice(index, 1);
       
       localStorage.setItem('tareas', JSON.stringify(listadoDeLasTareas));

       liLimpio.innerHTML = "";

        leerTarea();
    }
    
    div.appendChild(p);
    div.appendChild(pfecha);
    div.appendChild(img);
    div.appendChild(img2);
    li.appendChild(div);
    listaTarea.appendChild(li);
};

const cambiandoLogoCheck = (id) => {

    const listadoDeLasTareas = JSON.parse(localStorage.getItem('tareas'));
    const index = listadoDeLasTareas.findIndex(item => item.id === id);
    
    listadoDeLasTareas[index]["complete"] = !listadoDeLasTareas[index]["complete"];

    localStorage.setItem('tareas', JSON.stringify(listadoDeLasTareas));

};
 
const leerTarea = () => { 
    
    const tareasListas =  JSON.parse(localStorage.getItem('tareas')) || [];

    tareasListas.forEach(tarea => {
        
        crearTarea(tarea);
    });
};

/*
const dateElement = (fecha) => { 
    
    const dateelement = document.createElement("li");

    dateelement.classList.add("date");

    dateelement.innerHTML = fecha;

    return dateelement;
};*/

btn.addEventListener("click", addTarea);

leerTarea();