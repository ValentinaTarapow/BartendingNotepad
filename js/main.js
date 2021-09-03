const ounce = 30; // 1oz = 30ml 
let count = -1;
// ------------ CLASSES ------------

class User{
    constructor(){
        this.userName = "";
        this.recipes = [];
    }
}

class Cocktail{
    constructor(){
        this.cocktailName = "NewCocktail" ;
        this.ingredients = [];
        this.glassware = "";
    }
}

class Ingredient{
    constructor(){
        this.ingredientName = "";
        this.ouncesAmount = "";
        this.alcoholContent = "";
    }

    show(){
        return( this.ingredientName + " (" + this.alcoholContent +"% Alc/Vol)" + " - " + this.ouncesAmount + "oz" );
    }
}

// recetario.html new-recipe button
let btnNewRecipe = document.getElementById("btn-new-recipe")
btnNewRecipe.addEventListener("click", newRecipe)

function newRecipe(){
    count++
    // this function pushes a new empty recipe into the users array
    const emptyCocktail = new Cocktail();
    myUser.recipes.push(emptyCocktail);

    let gridRecipes = document.getElementById("recipes-grid");
    let recipe = document.createElement("div");
    recipe.innerHTML = 
        `
        <div id="card-title-${count}" class="recipe-title w-100">
            <h2 id="recipe-name-${count}" class="d-inline">${emptyCocktail.cocktailName}</h2>
            <button class="d-inline" id="btn-edit-recipe-name-${count}"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </div>

        <div id="card-body" class="d-flex flex-row">
            <div id="recipe-data-${count}" class="w-100">
                <div>
                </div>
                <h3>Ingredients</h3>
                <ul id="listIngredients-${count}" class="listIngredients w-75"></ul>
            </div>
            <div id="recipe-operations-${count}" class="recipe-operations">
                <button class="btn bg-success" id="btn-new-ingredient-${count}" title="Add Ingredient"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </div>

        </div>
        `;


    recipe.classList.add("card-recipe");
    recipe.setAttribute("id","recipe-" + count);

    gridRecipes.appendChild(recipe);

    // recetario.html edit-recipe-name button
        let btnEditRecipeName = document.getElementById(`btn-edit-recipe-name-${count}`);
        let cocktailName = document.getElementById(`recipe-name-${count}`);
        btnEditRecipeName.addEventListener("click", (e) =>{
            let userEntry = prompt("Please enter the new name"); 
            cocktailName.innerText = userEntry
            myUser.recipes[count].cocktailName = userEntry
        });
    // ------------------------------------------


    // recetario.html delete-recipe
        let recipeOperations = document.getElementById(`recipe-operations-${count}`)

        let btnDeleteRecipe = document.createElement("button");

        btnDeleteRecipe.classList.add("bg-danger");
        btnDeleteRecipe.classList.add("btn");
        btnDeleteRecipe.classList.add("w-auto")
        btnDeleteRecipe.classList.add("h-auto")
        btnDeleteRecipe.classList.add("text-center")


        btnDeleteRecipe.setAttribute("id","btn-delete-recipe")
        btnDeleteRecipe.setAttribute("title","Delete recipe")

        btnDeleteRecipe.innerHTML=
        `
            <i class="fa fa-trash" aria-hidden="true"></i>
        `;

        btnDeleteRecipe.addEventListener("click",(e)=>{
        //this function erases the card where this event is called and erases the element from the recipes array
        // alert("Entro al evento de btnDelete");
        recipe.remove();
        });
        recipeOperations.appendChild(btnDeleteRecipe);
    // ------------------------------------------


    // recetario.html new-ingredient
    let btnNewIngredient = document.getElementById(`btn-new-ingredient-${count}`);
    btnNewIngredient.addEventListener("click",() => {           
        newIngredient(btnNewIngredient.id.slice(-1))
    });
    

    function newIngredient(id){
        
        
        let listIngredients = document.getElementById(`listIngredients-${id}`);
        console.log(listIngredients)
        let listItem = document.createElement("li");
        listItem.setAttribute("id",`item-ingredient-${id}`);
        let userEntry = prompt("Please enter ingredient data")
        while (userEntry === "") userEntry = prompt("Please enter ingredient data")
        
        let condition = myUser.recipes[id].ingredients.find(ingredient => ingredient === userEntry)
        
        while (condition) {
            userEntry = prompt("This ingredient already exists, please enter a new one")
            condition = myUser.recipes[id].ingredients.find(ingredient => ingredient === userEntry)
        }
        
        myUser.recipes[id].ingredients.push(userEntry)
        
        
        console.log(myUser.recipes[id].ingredients)
        
        listItem.innerHTML = 
            `
                <p class="d-inline" >${userEntry}</p>
            `;

        listItem.classList.add("d-flex");
        listItem.classList.add("flex-row");
        listItem.classList.add("justify-content-between")


        // recetario.html delete-ingredient
            let btnDeleteIngredient = document.createElement("button");
            btnDeleteIngredient.setAttribute("id",`btn-delete-ingredient-${id}`);
            btnDeleteIngredient.setAttribute("title","Delete ingredient");
            btnDeleteIngredient.classList.add("h-50")
            
            btnDeleteIngredient.classList.add("bg-danger");
            btnDeleteIngredient.classList.add("d-inline");

            btnDeleteIngredient.innerHTML=
            `
                <i class="fa fa-times" aria-hidden="true"></i>
            `;

            btnDeleteIngredient.addEventListener("click",(e)=>{
                
                e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);                
                myUser.recipes[id].ingredients = myUser.recipes[id].ingredients.filter(ingredient => ingredient !== userEntry)
                
            });
            
            listItem.appendChild(btnDeleteIngredient);
            listIngredients.appendChild(listItem);
        // ------------------------------------------

    }    
}


// recetario.html delete all recipes
let btnDeleteAll = document.getElementById("btn-delete-all");
btnDeleteAll.addEventListener("click",deleteAll);

function deleteAll(){

    let gridRecipes = document.getElementById("recipes-grid");

    gridRecipes.innerHTML = "";

    myUser.recipes = []

}


//  edit-user-name button

//Creo mi usuario
const myUser = new User();

let storagedUser;
let greetingUserSection = document.getElementById("greeting-user");
let username;

let editName = document.getElementById("edit-user-name");
editName.addEventListener("click", editUserName);

function editUserName(){

    let userEntry = prompt("Enter your user name");
    myUser.userName = userEntry;

    localStorage.setItem('user', JSON.stringify(myUser));

    storagedUser = localStorage.getItem("user");


    if ( (userEntry== "") || (userEntry == null)) {
        greetingUserSection.innerHTML= "";
    }
    else{
        greetingUserSection.innerHTML=
        `
            Welcome, <span class="text-danger"> ${userEntry}</span>!
        `;
    }

}

$(document).ready(function(){   

    storagedUser = JSON.parse(localStorage.getItem("user"));

    if ( (storagedUser.userName == null) || (storagedUser.userName == "") ) {
        greetingUserSection.innerHTML= "";
    }
    else{
            greetingUserSection.innerHTML=
    `
        Welcome back, <span class="text-danger"> ${storagedUser.userName}</span>!
    `;
    }
});

