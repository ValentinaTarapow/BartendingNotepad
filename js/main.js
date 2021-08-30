const ounce = 30; // 1oz = 30ml 

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

// recetario.html new recipe button
let btnNewRecipe = document.getElementById("btn-new-recipe")
btnNewRecipe.addEventListener("click", newRecipe)
function newRecipe(){
    // this function pushes a new empty recipe into the users array
    const emptyCocktail = new Cocktail();
    myUser.recipes.push(emptyCocktail);

    let gridRecipes = document.getElementById("recipes-grid");
    let recipe = document.createElement("div");
    recipe.innerHTML = 
        `
        <div id="card-title" class="w-100">
            <h2 id="recipe-name" class="d-inline">${emptyCocktail.cocktailName}</h2>
            <button class="d-inline" id="btn-edit-recipe-name"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </div>

        <div id="card-body" class="d-flex flex-row">
            <div id="recipe-data">
                <div>
                    <h3 class="d-inline">Recommended glassware</h3> 
                    <p class="d-inline"> </p>
                </div>
                <h3>Ingredients</h3>
                <ul id="listIngredients"></ul>
            </div>
            <div id="recipe-operations">
                <button class="btn bg-success" id="btn-new-ingredient" title="Add Ingredient"><i class="fa fa-plus" aria-hidden="true"></i></button>
                <button class="btn bg-danger" id="btn-delete-recipe" title="Delete Recipe"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>

        </div>
        `;


    recipe.classList.add("card-recipe");
    recipe.setAttribute("id","recipe");

    gridRecipes.appendChild(recipe);

    // recetario.html edit recipe name button
    let btnEditRecipeName = document.getElementById("btn-edit-recipe-name");
    btnEditRecipeName.addEventListener("click", editRecipeName);
    let cocktailName = document.getElementById("recipe-name");
    function editRecipeName(){
        let userEntry = "NuevoNombre";
        cocktailName.innerHTML= `${userEntry}`;
        ;
    }

    // recetario.html new ingredient
    let btnNewIngredient = document.getElementById("btn-new-ingredient");
    btnNewIngredient.addEventListener("click",newIngredient);
    function newIngredient(){
        let listIngredients = document.getElementById("listIngredients");
        let listItem = document.createElement("li");
        listItem.innerHTML = 
            `
            Pude agregar un ingrediente
            `;
        listIngredients.appendChild(listItem);

    }

    // recetario.html delete recipe
    let btnDeleteRecipe = document.getElementById("btn-delete-recipe");
    btnDeleteRecipe.addEventListener("click",deleteRecipe,false);
    function deleteRecipe(e){
        
        //this function erases the card where this event is called and erases the element from the recipes array
    }
}


// recetario.html delete all recipes
let btnDeleteAll = document.getElementById("btn-delete-all");
btnDeleteAll.addEventListener("click",deleteAll);
function deleteAll(){

    let gridRecipes = document.getElementById("recipes-grid");

    gridRecipes.innerHTML = "";

    while(myUser.recipes.length > 0){
        myUser.recipes.pop();
    }
}

// recetario.html clears recipes-grid and show the recipes array
let btnRefresh = document.getElementById("btn-refresh");
btnRefresh.addEventListener("click",refreshRecipes);
function refreshRecipes(){

    let gridRecipes = document.getElementById("recipes-grid");

    gridRecipes.innerHTML = "";
    for(element of myUser.recipes){
        let recipe = document.createElement("div");
        recipe.innerHTML = 
        `
        <div id="card-title" class="w-100">
            <h2 id="recipe-name" class="d-inline">${element.cocktailName}</h2>
        </div>

        <div id="card-body" class="d-flex flex-row">
            <div id="recipe-data">
                <div>
                    <h3 class="d-inline">Recommended glassware</h3> 
                    <p class="d-inline">${element.glassware}</p>
                </div>
        </div>
        `;


    recipe.classList.add("card-recipe");
    recipe.setAttribute("id","recipe");

    gridRecipes.appendChild(recipe);

    }


}

const myUser = new User();