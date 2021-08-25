// DESARROLLO
let nombreUsuario;
const onza = 30; //en ml

// ------------ CLASES ------------

class Trago{
    constructor(nombre){
        this.nombre = nombre ;
        this.ingredientes = [];
        this.cristaleria = "";
    }

    tamanio(){
        let totalOnzas = 0;
        let enMl;

        for(const element of this.ingredientes){
            totalOnzas = totalOnzas + element.cantOz;
        }
        enMl = totalOnzas * onza;

        if(enMl<60){
            this.cristaleria = "shot";
        }
        else if((enMl>=60) && (enMl<200)){
            this.cristaleria = "copa martini";
        }
        else if((enMl>=200) && (enMl<250)){
            this.cristaleria = "vaso old fasioned";
        }
        else if((enMl>=250) && (enMl<300)){
            this.cristaleria = "vaso highball";
        }
        else if((enMl>=300) && (enMl<450)){
            this.cristaleria = "vaso copon"; 
        }
        else if(enMl>=450){
            this.cristaleria = "balde";
        }

        this.cristaleria = this.cristaleria.toUpperCase();
        return (totalOnzas);
    }

    addIngredient(data){
        this.ingredientes.push(data);
    }

    ordenarXgraduacion(){
        var ordenadosXgraduacion = [];
        var index = 1;
        let stringOrdenado = "";
        ordenadosXgraduacion = this.ingredientes.map(elemento => elemento);
        var ordenadosXgraduacion = this.ingredientes;
        ordenadosXgraduacion.sort(function(a,b){
            return a.graduacionAlcoholica - b.graduacionAlcoholica;
        });
        for(var elemento of ordenadosXgraduacion){
            stringOrdenado = stringOrdenado + index + ": " + elemento.mostrar() + "\n";
            index++;
        }
        alert("Ingredientes en orden ascendente por graduacion alcoholica \n" + stringOrdenado);
    }
}

class Ingrediente{
    constructor(nombre, cantOz, graduacionAlcoholica){
        this.nombre = nombre;
        this.cantOz = cantOz;
        this.graduacionAlcoholica = graduacionAlcoholica;
    }

    mostrar(){
        return( this.nombre + " (" + this.graduacionAlcoholica +"% Alc/Vol)" + " - " + this.cantOz + "oz" );
    }
}

// ------------ FUNCIONES ------------

function ingresarUsuario(){
    nombreUsuario = prompt("Por favor, ingrese su nombre: ");
    return validarTexto(nombreUsuario, ingresarUsuario);
}

function ingresarTrago(trago){
    let cantIngredientes = cantidadIngredientes();
    let index = 1;

    for(let i=0;i<cantIngredientes;i++){
        const ingredienteVacio = new Ingrediente();//ingrediente vacio para ir haciendo lugar en el array
        trago.addIngredient(ingredienteVacio);
    }

    for(const element of trago.ingredientes){
            element.nombre = ingresarNomIngrediente(index);
            element.cantOz =parseFloat(ingresarOnzasIngrediente());
            element.graduacionAlcoholica = parseFloat(ingresarGraduacionAlcoholica());

            index++;
    }

    tuTrago.nombre = prompt("¿Que nombre tendrá este trago?");
}

function cantidadIngredientes(){
    let cantIngredientes = parseInt(prompt("¿Cuantos ingredientes tendrá este trago?"));
    return validarNumero(cantIngredientes,cantidadIngredientes);
}

function ingresarNomIngrediente(index){
    // le pide al usuario el nombre del ingrediente y lo valida
    let nombreIngrediente = prompt("Ingrese el nombre del Ingrediente " + index);
    return validarTexto(nombreIngrediente,ingresarNomIngrediente,index);
}

function ingresarOnzasIngrediente(){
    // le pide al usuario la cantidad de onzas y lo valida
    let cantOnzas = prompt("Ingrese la cant de onzas a poner\n(Recuerde que: 1oz = 30ml)");
    return validarNumero(cantOnzas, ingresarOnzasIngrediente);
}

function ingresarGraduacionAlcoholica(){
    let gradAlc = prompt("Ingrese la graduacion alcoholica de este ingrediente");
    return validarNumero(gradAlc,ingresarGraduacionAlcoholica);
}


function imprimirInfo(trago){
    let index = 1;

    let gridRecetas = document.getElementById("grid-recetario");
    let receta = document.createElement("div");
    receta.innerHTML = 
        `
        <h1>${trago.nombre}(${trago.tamanio()}oz)</h1>
        <h2 class="d-inline">Cristaleria recomendada: </h2> 
        <p class="d-inline"> ${trago.cristaleria} </p>
        `;

    let containerIng = document.createElement("ul");
    containerIng.innerHTML=
        `
        <h2>Ingredientes:</h2>
        `;
    for(const element of trago.ingredientes){
        let listItem = document.createElement("li");
        listItem.innerHTML = 
            `
            <b>Ingrediente ${index}:</b> ${element.mostrar()};
            `;
        index++;
        containerIng.appendChild(listItem)
    }

    let alertContainer = document.getElementById("alertZone");
    let alertFin = document.createElement("div");
    alertFin.innerHTML= 
    `
    <p><strong>🍸¡Terminamos, ${nombreUsuario}!🍸</strong> <br> Puedes ver tu nueva receta ↓</p>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    receta.classList.add("card-trago");
    receta.setAttribute("id","receta");

    alertFin.classList.add("miAlerta")
    alertFin.classList.add("alert");
    alertFin.classList.add("alert-success");
    alertFin.classList.add("alert-dismissible");
    alertFin.classList.add("fade");
    alertFin.classList.add("show");

    gridRecetas.appendChild(receta);
    receta.appendChild(containerIng);
    alertContainer.appendChild(alertFin);

}


// VALIDACIONES
function validarTexto(value, callback, index){
    // analiza que el campo no haya sido llenado con numeros o que este vacio
    if( (!(isNaN(value))) || (value==null) || (value=="") ){
        alert("Por favor, ingrese texto valido");
        return callback(index);
    }else{
        return(value);
    }
}

function validarNumero(value, callback){
    // analiza que el campo no haya sido llenado con texto o que este vacio
    if( (isNaN(value)) || (value==null) || (value=="") ){
        alert("Por favor, ingrese un numero");
        return callback();
    }else{
        return(value);
    }
}


// ----------EJECUCION----------

// CREO LOS OBJETOS 
const tuTrago = new Trago();

// LLAMO A LAS FUNCIONES O METODOS
ingresarUsuario();
ingresarTrago(tuTrago);
imprimirInfo(tuTrago);