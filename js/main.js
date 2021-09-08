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
        // aca le voy a agregar un id con incrementador como en un link que me habias pasado
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

$("#btn-new-recipe").click(function(){
    // this function pushes a new empty recipe into the users array and creates a card
    count++

    const emptyCocktail = new Cocktail();
    myUser.recipes.push(emptyCocktail);

    let gridRecipes = document.getElementById("recipes-grid");
    let recipe = document.createElement("div");
    recipe.innerHTML = 
        `
        <div id="card-title-${count}" class="recipe-title w-100 d-flex flex-row justify-content-between" data-filter-item data-filter-name="${emptyCocktail.cocktailName}">
            <h2 id="recipe-name-${count}" class="d-inline w-100">${emptyCocktail.cocktailName}</h2>
            <button class="d-inline btn btn-secondary border-top-0 border-bottom-0 border-end-0 rounded-0" id="btn-edit-recipe-name-${count}"><i class="fa fa-pencil" aria-hidden="true"></i></button>
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

    $("#alert-success").fadeIn(300).delay(1500).fadeOut(400);

    recipe.classList.add("card-recipe");
    recipe.setAttribute("id","recipe-" + count);

    gridRecipes.appendChild(recipe);

    // recetario.html edit-recipe-name button
    $(`#btn-edit-recipe-name-${count}`).click(function(){
        let cocktailName = document.getElementById(`recipe-name-${count}`);
        let userEntry = prompt("Please enter the new name");
        if((userEntry == null) || (userEntry == "") ){
            cocktailName.innerText = cocktailName.innerText;
        }
        else{
            cocktailName.innerText = userEntry;
            myUser.recipes[count].cocktailName = userEntry;
        }

    });

    // ------------------------------------------


    // recetario.html delete-recipe
        $(`#recipe-operations-${count}`).append
            (`
                <button id="btn-delete-recipe" class="btn bg-danger w-auto h-auto text-center" title="Delete recipe"> 
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button> 
            `);

        $("#btn-delete-recipe").click(function(){
        //this function erases the card where this event is called and erases the element from the recipes array
        // no se me ocurre como poder compararlo por el tema de que lo llamo desde un evento

            recipe.remove();
        });
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

        if(userEntry == null){


        }
        else{
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
    // ------------------------------------------
});

// recetario.html delete all recipes
$("#btn-delete-all").click(function(){
    let gridRecipes = document.getElementById("recipes-grid");
    gridRecipes.innerHTML = "";
    myUser.recipes = []
});

//  edit-user-name button  / storage
    //user creation
    const myUser = new User();

    let storagedUser;
    let greetingUserSection = document.getElementById("greeting-user");


    $("#edit-user-name").click(function(){
        let userEntry;

        do{
            userEntry = prompt("Enter your user name");
        }while(userEntry=="")

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
    });

    $(document).ready(function(){   

        storagedUser = JSON.parse(localStorage.getItem("user"));
    
        myUser.userName = storagedUser.userName;
        myUser.recipes = storagedUser.recipes;

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