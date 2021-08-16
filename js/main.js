// DESARROLLO
let nombreUsuario;
const onza = 30; //en ml

// ------------ CLASES ------------
class Trago{
    constructor(nombre, ingredientes){
        this.nombre = nombre;
        this.ingredientes = [];
        this.cristaleria = "";
    }
    mostrar(){
        return( "\nNombre del trago: " + this.nombre + "\n\nIngrediente 1: " + this.ingredientes[0].mostrar() + "\nIngrediente 2: " + this.ingredientes[1].mostrar() + "\nIngrediente 3: " + this.ingredientes[2].mostrar() + this.tamanio() );
    }

    tamanio(){
        let totalOnzas = 0;
        for(const element of this.ingredientes){
            totalOnzas = totalOnzas + element.cantOz;
        }

        let enMl = totalOnzas * onza;

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

        return ( "\n\nEste trago tiene: " + totalOnzas + "oz = " + enMl + "ml\n\nTe conviene ponerlo en: " + this.cristaleria );
    }

    addIngredient(data){
        this.ingredientes.push(data)
    }

    ordenarXoz(){
        var ordenadoXoz = [];
        ordenadoXoz = this.ingredientes.map(elemento => elemento);
        var ordenadoXoz = this.ingredientes;
        ordenadoXoz.sort(function(a,b){
            return a.cantOz - b.cantOz;
        });
        console.log("En orden ascendente por Oz: ")
        for(var elemento of ordenadoXoz){
            console.log(elemento.mostrar());
        }
    }
}

class Ingrediente{
    constructor(nombre, cantOz){
        this.nombre = nombre;
        this.cantOz = cantOz;
    }
    mostrar(){
        return( this.nombre + " - " + this.cantOz + "oz" );
    }
}

// ------------ FUNCIONES ------------

function ingresarUsuario(){
    nombreUsuario = prompt("Por favor, ingrese su nombre: ");
    return validarTexto(nombreUsuario, ingresarUsuario);
}

function ingresarTrago(trago){
    // Funcion que llama 3 veces a ingresar ingrediente e ingresar cantidad
    alert("🍸Crearemos un trago de 3 ingredientes.🍸");
    
    const cantIngredientes = 3;
    let nombreIngrediente, cantOz;
    let index = 1;
    for(const element of trago.ingredientes){
            nombreIngrediente = ingresarIngrediente(index);
            cantOz = parseFloat(ingresarOnzas());
            element.nombre = nombreIngrediente;
            element.cantOz = cantOz;
            index++;
    }

    tuTrago.nombre = prompt("¿Que nombre tendrá este trago?");
}

function ingresarIngrediente(index){
    // le pide al usuario el nombre del ingrediente y lo valida
    let nombreIngrediente = prompt("Ingrese el nombre del Ingrediente " + index);
    return validarTexto(nombreIngrediente,ingresarIngrediente,index);
}

function ingresarOnzas(){
    // le pide al usuario la cantidad de onzas y lo valida
    let cantOnzas = prompt("Ingrese la cant de onzas a poner\n(Recuerde que: 1oz = 30ml)");
    return validarNumero(cantOnzas, ingresarOnzas);
}


function imprimirInfo(trago){
    alert( "🍸¡Terminamos, " + nombreUsuario + "!🍸\n" + trago.mostrar() );
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

const Ingrediente1 = new Ingrediente();
const Ingrediente2 = new Ingrediente();
const Ingrediente3 = new Ingrediente();

const tuTrago = new Trago();

tuTrago.addIngredient(Ingrediente1);
tuTrago.addIngredient(Ingrediente2);
tuTrago.addIngredient(Ingrediente3);


ingresarUsuario();
ingresarTrago(tuTrago);
imprimirInfo(tuTrago);
tuTrago.ordenarXoz();