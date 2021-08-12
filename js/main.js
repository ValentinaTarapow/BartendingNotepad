// DESARROLLO
let nombreUsuario;
const onza = 30; //en ml

// ------------ CLASES ------------
class Trago{
    constructor(nombre, ingredientes){
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.cristaleria = "";
    }
    mostrar(){
        return("Holis trago")
        // return( "\nNombre del trago: " + this.nombre + "\n\nIngrediente 1: " + this.ingredientes[0].mostrar() + "\nIngrediente 2: " + this.ingredientes[1].mostrar() + "\nIngrediente 3: " + this.ingredientes[2].mostrar() + this.tamanio() );
    }

    tamanio(){
        let totalOnzas = 0;
        for(const element of ingredientes){
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

        return ("Holis tamanio")
        // return ( "\n\nEste trago tiene: " + enOnza + "oz = " + enMl + "ml\n\nTe conviene ponerlo en: " + this.cristaleria );
    }
}



class Ingrediente{
    constructor(nombre, cantOz){
        this.nombre = nombre;
        this.cantOz = cantOz;
    }
    mostrar(){
        // return( this.nombre + " - " + this.cantOz + "oz" );
        return ("Holis ingrediente")
    }
}

// CREO LOS OBJETOS 
let Ingredientes = [];
Ingredientes.push(Ingrediente1, Ingrediente2, Ingrediente3);
const tuTrago = new Trago("", Ingredientes);



// ------------ FUNCIONES ------------

function ingresarUsuario(){
    nombreUsuario = prompt("Por favor, ingrese su nombre: ");
    return validarTexto(nombreUsuario, ingresarUsuario);
}

function ingresarTrago(){
    // Funcion que llama 3 veces a ingresar ingrediente e ingresar cantidad
    alert("🍸Crearemos un trago de 3 ingredientes.🍸");
    
    const cantIngredientes = 3;
    let nombreIngrediente, cantOz;

    for(let i=0;i<cantIngredientes;i++){
        nombreIngrediente = ingresarIngrediente((i+1));
        cantOz = parseFloat(ingresarOnzas());

        Ingredientes[i].nombre = nombreIngrediente;
        Ingredientes[i].cantOz = cantOz;

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

// const sumaOz = function (ingr1,ingr2,ingr3) { return  ingr1 + ingr2 + ingr3 }; //suma las onzas


function imprimirInfo(){
    alert( "🍸¡Terminamos, " + nombreUsuario + "!🍸\n" + tuTrago.mostrar() );
}


// ------------ EJECUCION ------------
ingresarUsuario();
ingresarTrago();
imprimirInfo();