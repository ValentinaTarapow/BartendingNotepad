const ounce = 30; // 1oz = 30ml 
let count = -1;
const URLJSON = "../data/data.json";
// ------------ CLASSES DEFINITION ------------

class User{
    constructor(){
        this.userName = "";
        this.recipes = [];
    }
}

class Cocktail{
    constructor(){
        this._id = Cocktail.counter;
        this.cocktailName = "NewCocktail" ;
        this.ingredients = [];
        this.glassware = "";
    }

    getId(){
        return this._id;
    }

    static get counter(){
        Cocktail._counter = (Cocktail._counter || 0) + 1;
        return Cocktail._counter;
    }
}

class Ingredient{
    constructor(){
        this._id = Ingredient.couner;
        this.ingredientName = "";
        this.ouncesAmount = "";
        this.alcoholContent = "";
    }

    getId(){
        return this._id;
    }

    static get counter(){
        Ingredient._counter = (Ingredient._counter || 0) + 1;
        return Ingredient._counter;
    }
}
// --------------------------------------------------------------------------

$("#btn-info").click(function(){
    $("#modal-info").addClass("show");

    $("#btn-close-info").click(function(){
        $("#modal-info").removeClass("show");
    });
});


$("#btn-new-recipe").click(function(){
    // this function pushes a new empty recipe into the users array and creates a card
    count++

    const newCocktail = new Cocktail();
    myUser.recipes.push(newCocktail);
    let position = myUser.recipes.indexOf(newCocktail);

    let gridRecipes = document.getElementById("recipes-grid");
    let recipe = document.createElement("div");
    recipe.innerHTML = 
        `
        <div id="card-title-${newCocktail.getId()}" class="recipe-title w-100 d-flex flex-row justify-content-between" data-filter-item data-filter-name="${newCocktail.cocktailName}">
            <h2 id="recipe-name-${newCocktail.getId()}" class="recipe-name d-inline w-100">${newCocktail.cocktailName}</h2>
            <p id="recipe-id">${newCocktail.getId()}</p>
            <button class="d-inline btn btn-secondary border-top-0 border-bottom-0 border-end-0 rounded-0" id="btn-edit-recipe-name-${newCocktail.getId()}"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </div>

        <div id="card-body" class="d-flex flex-row">
            <div id="recipe-data-${newCocktail.getId()}" class="w-100">
                <div>
                    <h3>Ingredients</h3>
                    <ul id="listIngredients-${newCocktail.getId()}" class="listIngredients w-75 container"></ul>
                </div>
                
            </div>
            <div id="recipe-operations-${newCocktail.getId()}" class="recipe-operations"></div>

        </div>
        `;

    $("#alert-success").fadeIn(300).delay(1500).fadeOut(400);

    recipe.classList.add("card-recipe");
    recipe.setAttribute("id","recipe-" + count);

    gridRecipes.appendChild(recipe);

    // edit-recipe-name button
    $(`#btn-edit-recipe-name-${newCocktail.getId()}`).click(function(e){

        $("#modal-recipe-name").addClass("show");

        let input = document.querySelector("input[name='recipeName']");

        $("#btn-cancel-recipe").click(function(){
            input.value = "";
            $("#modal-recipe-name").removeClass("show");
        });

        $("#btn-save-recipe").click(function(){

            // let userEntry = input.value;
            // let targetCard = e.currentTarget.parentNode.id; 
            // console.log(targetCard);

            // $(`${targetCard} > .recipe-name`).innerText = `${userEntry}`;

            // if((userEntry == null) || (userEntry == "") ){
            //     cocktailName.innerText = cocktailName.innerText;
            // }
            // else{

            //     cocktailName.innerText = userEntry;
            //     myUser.recipes[count].cocktailName = userEntry;
            // }
            alert("entre")

            $("#modal-recipe-name").removeClass("show");
        });


    });

    // ------------------------------------------


    // recipe-operations
        $(`#recipe-operations-${newCocktail.getId()}`).append(`
            <button class="btn bg-success" id="btn-new-ingredient-${newCocktail.getId()}" title="Add Ingredient">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <button id="btn-delete-recipe-${newCocktail.getId()}" class="btn bg-danger w-auto h-auto text-center" title="Delete recipe"> 
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button> 
            `);

        // delete recipe
        $(`#btn-delete-recipe-${newCocktail.getId()}`).click(function(e){
        //this function erases the card where this event is called and erases the element from the recipes array
            e.currentTarget.parentNode.parentNode.parentNode.remove();
            // myUser.recipes = myUser.recipes.filter( element => element.id !== id);
        });
    
        // new-ingredient
        $(`btn-new-ingredient-${newCocktail.getId()}`).click(function(e){
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
                listItem.classList.add("justify-content-start");
                listItem.classList.add("list-ingr-item")
    
    
    
    
                // delete-ingredient
                    let btnDeleteIngredient = document.createElement("button");
                    btnDeleteIngredient.setAttribute("id",`btn-delete-ingredient-${id}`);
                    btnDeleteIngredient.setAttribute("title","Delete ingredient");
                    
                    btnDeleteIngredient.classList.add("bg-danger");
                    btnDeleteIngredient.classList.add("d-inline");
                    btnDeleteIngredient.classList.add("me-1")
                    btnDeleteIngredient.classList.add("btn-delete-ingredient")
    
                    btnDeleteIngredient.innerHTML=
                    `
                        <i class="fa fa-times" aria-hidden="true"></i>
                    `;
    
                    btnDeleteIngredient.addEventListener("click",(e)=>{
                        
                        e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);                
                        myUser.recipes[id].ingredients = myUser.recipes[id].ingredients.filter(ingredient => ingredient !== userEntry)
                        
                    });
                    
                    listItem.prepend(btnDeleteIngredient);
                    listIngredients.appendChild(listItem);
                // ------------------------------------------
    
            }
        }
});











// delete all recipes
$("#btn-delete-all").click(function(){
    let gridRecipes = document.getElementById("recipes-grid");
    gridRecipes.innerHTML = "";

    while(myUser.recipes.length > 0){
        myUser.recipes.pop();
    }
});

//  edit-user-name button  / storage
    //user creation
    const myUser = new User();

    let storagedUser;
    let greetingUserSection = document.getElementById("greeting-user");

    $("#edit-user-name").click(function(){
        $("#modal-user").addClass("show");

        $("#input-user").on("click",function(){
            this.value='';
        });

        $("#btn-cancel-user").click(function(){
            $("#modal-user").removeClass("show");
        });

        $("#btn-save-user").click(function(){
            let userEntry;

            userEntry = $("#input-user").value;
            userEntry = document.querySelector("input[name='userName']").value;
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

            $("#modal-user").removeClass("show");
        });
    });

    $(document).ready(function(){   

        // AJAX
        $.getJSON(URLJSON, function (ClassicRecipes) {
            console.log(ClassicRecipes);
        });

        // STORAGE
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