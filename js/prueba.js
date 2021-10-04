const ounce = 30; // 1oz = 30ml 
let storagedUser;
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
        this.cocktailName = "NewCocktail";
        this.ingredients = [];
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
        this._id = Ingredient.counter;
        this.ingredientName = "";
        this.measure = "";
        this.amount = "";
        this.alcoholContent = "";
    }

    getId(){
        return this._id;
    }

    static get counter(){
        Ingredient._counter = (Ingredient._counter || 0) + 1;
        return Ingredient._counter;
    }

    show(){
        return(this.ingredientName + " (" + this.alcoholContent + " %Alc./Vol)" + " - " + this.amount + this.measure );
    }
}
// --------------------------------------------------------------------------

$("#btn-info").click(function(){
    //shows the web information
    $("#modal-info").addClass("show");

    $("#btn-close-info").click(function(){
        //hides the web information
        $("#modal-info").removeClass("show");
    });
});

$("#btn-favorites").click(function(){
    // AJAX
    $("#modal-favorites").addClass("show");
    
    $.getJSON(URLJSON, function (data, status) {
        
        
        if (status === "success") {
            let myData = data.staticRecipes;
            let favoriteCounter = 0;
            for (const recipe of myData){
                
                $(`.carousel-inner`).append(
                    `
                    <div id="favorite-${favoriteCounter}" class="carousel-item h-100">
                        <div class="card text-black bg-warning mb-3 d-block h-100">
                                <div class="card-header" id="favorite-title">${recipe.cocktailName}</div>
                                <div class="card-body h-100">
                                    <h5 class="card-title">Ingredients</h5>
                                    <ul class="card-text list-unstyled h-100" id="favorite-${favoriteCounter}-ingredients"></ul>
                                </div>
                        </div>
                    </div>
                        `
                );
                
                for(const ingredient of recipe.ingredients){
                    $(`#favorite-${favoriteCounter}-ingredients`).append(
                        `
                            <li>
                                ${ingredient.ingredientName} (${ingredient.alcoholContent} %Alc./Vol) - ${ingredient.amount} ${ingredient.measure}
                            </li>
                        `
                    );
                }
                if(favoriteCounter == 0){
                    $("#favorite-0").addClass("active");
                }
                favoriteCounter++;
            }

        }
        else{
            alert("ERROR");
        }
    });
});

$("#btn-new-recipe").click(function(){
    // this function pushes a new empty recipe into the users array and creates a card
    const newCocktail = new Cocktail();
    const index = newCocktail.getId();
    myUser.recipes[index] = newCocktail;
    // myUser.recipes[0] += 1
    
    console.log(myUser);
    localStorage.setItem('user', JSON.stringify(myUser));
    storagedUser = localStorage.getItem("user");
    
    //calls this function to create a new card
    createCard(newCocktail,index);
});

// delete all recipes
$("#btn-delete-all").click(function(){

    $("#modal-delete-confirmation").addClass("show");

    $("#btn-delete-all-cancel").click(function(){
        $("#modal-delete-confirmation").removeClass("show");
    });

    $("#btn-delete-all-accept").click(function(){
        $("#modal-delete-confirmation").removeClass("show");

        //clear the grid
        let gridRecipes = document.getElementById("recipes-grid");
        gridRecipes.innerHTML = "";

        //restart the instance counter
        Cocktail._counter = 0;
        Ingredient._counter = 0;

        let cleanUser = JSON.parse(localStorage.getItem("user"));
        if (cleanUser.recipes) delete cleanUser.recipes
        localStorage.setItem('user', JSON.stringify(cleanUser));

        //empty the array    
        while(myUser.recipes.length > 0){
            myUser.recipes.pop();
        }
    });
});


//  edit-user-name button  / storage
    //user creation
    const myUser = new User();
    let greetingUserSection = document.getElementById("greeting-user");

    $("#edit-user-name").click(function(){
        $("#modal-user").addClass("show");

        $("#btn-cancel-user").click(function(){
            $("#modal-user").removeClass("show");
        });

        $("#btn-save-user").click(function(){
            let userEntry;

            userEntry = $("#input-user").value;
            userEntry = document.querySelector("input[name='userName']").value;
            myUser.userName = userEntry;


            if ( (userEntry== "") || (userEntry == null)) {
                greetingUserSection.innerHTML= "";
            }
            else{
                greetingUserSection.innerHTML=
                `
                    Welcome, <span class="text-danger"> ${storagedUser.userName}</span>!
                `;
            }

            $("#modal-user").removeClass("show");
        });
    });

    $(document).ready(function(){   

        // STORAGE
        if(storagedUser) {
            storagedUser = JSON.parse(localStorage.getItem("user"));
            myUser.userName = storagedUser.userName;
            myUser.recipes = storagedUser.recipes;        
            greetingUserSection.innerHTML=
                `
                    Welcome back, <span class="text-danger"> ${storagedUser.userName}</span>!
                `;

            for(recipe of myUser.recipes){
                let storageIndex = recipe.getId();
                createCard(recipe,storageIndex);
            }

        }
        else{
            greetingUserSection.innerHTML= "";
        }
    });


//------------------------------------------------
    function EmptyNullEvaluator(data){
        //this function evaluates if data is null or filled with spaces
        const length = data.length;
        let count = 0;

        for(let i = 0; i < length; i++){
            let ascii = data.charCodeAt(i);

            if ((ascii == 00) || (ascii == 32)){
                count++;
            }
        }

        //if every character is null/space returns true and the entry is not allowed to use
        return (count === length);
    }

    function createCard(recipe , index){
        $("#recipes-grid").append(
            `
            <div id="recipe-${index}" class="card-recipe">
                <div id="card-title-${index}" class="recipe-title w-100 d-flex flex-row justify-content-between" ">
                    <h2 id="recipe-name-${index}" class="recipe-name d-inline w-100">${recipe.cocktailName}</h2>
                    <p id="recipe-id-${index}">${index}</p>
                    <button class="d-inline btn btn-secondary border-top-0 border-bottom-0 border-end-0 rounded-0" id="btn-edit-recipe-name-${index}" title="Edit recipe name"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                </div>
    
                <div id="card-body" class="d-flex flex-row">
                    <div id="recipe-data-${index}" class="w-100">
                        <div>
                            <h3 id="ing-label">Ingredients</h3>
                            <ul id="listIngredients-${index}" class="listIngredients w-75 container">
                            </ul>
                        </div>
                        
                    </div>
                    <div id="recipe-operations-${index}" class="recipe-operations"></div>
    
                </div>
            </div>
            `);
            
    
        //CHEQUEAR
        if(recipe.ingredients.length > 0){
            for(let i = 0; i < recipe.ingredients.length ; i++){
            $(`#listIngredients-${recipe.getId()}`).append(`
                <li id="item-ingredient-${recipe.getId()}-${index}" class="list-ingr-item d-flex flex-row justify-content-start">
                    <button id="btn-delete-ingredient-${recipe.getId()}-${recipe.ingredients[i].getId()}" class="bg-danger d-inline me-1 btn-delete-ingredient">
                        <i class="fa fa-times" aria-hidden="true" title="Delete ingredient"></i>
                    </button> 
                    ${recipe.ingredients[i].show()}
                </li> 
            `);
            }
        }

        // edit-recipe-name button
        $(`#btn-edit-recipe-name-${index}`).click(function(event){
            $("#modal-recipe-name").addClass("show");
    
            //obtaining the numbers from the id to use it as target index variable
            const IdEditRecipeName = $(this).attr('id');
            const IndexEditRecipeName = IdEditRecipeName.match(/\d+/).map(Number);
    
            $(`#btn-save-recipe-name`).click(function(){
                let userEntry = $("input[name='recipeName']").val();
                
                if((userEntry == null) || (userEntry == "")){
                    $(`#recipe-name-${IndexEditRecipeName}`).text(myUser.recipes[IndexEditRecipeName].cocktailName);
                }
                else{
                    myUser.recipes[IndexEditRecipeName].cocktailName = userEntry;
                    $(`#recipe-name-${IndexEditRecipeName}`).text(myUser.recipes[IndexEditRecipeName].cocktailName);
                }
    
                $("input[name='recipeName']").val('')
                $("#modal-recipe-name").removeClass("show");
                //unbinding the event from the button
                $("#btn-save-recipe-name").unbind()
            });
    
            $("#btn-cancel-recipe-name").click(function(){
                $("#modal-recipe-name").removeClass("show");
                $("#btn-save-recipe-name").unbind()
            });
        });
    
        // ------------------------------------------
    
        // recipe-operations
            $(`#recipe-operations-${index}`).append(`
                <button class="btn bg-success" id="btn-new-ingredient-${index}" title="Add Ingredient">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
                <button id="btn-delete-recipe-${index}" class="btn bg-danger w-auto h-auto text-center" title="Delete recipe"> 
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button> 
                `);
    
            // delete recipe
            $(`#btn-delete-recipe-${index}`).click(function(e){
                //this function erases the card where this event is called and empties the element from the recipes array
                $(`#recipe-${index}`).remove()
                delete myUser.recipes[index]
                // myUser.recipes[0] -= 1
                $("#alert-deleted").fadeIn(300).delay(1500).fadeOut(400);
            });
        
            //new-ingredient
            $(`#btn-new-ingredient-${index}`).click(function(e){
                $("#modal-ingredient").addClass("show");
            
                //obtaining the numbers from the id to use it as target index variable
                const IdNewIngredient = $(this).attr('id');
                const IndexNewIngredient = IdNewIngredient.match(/\d+/).map(Number);
    
                //save new ingredient event
                $(`#btn-save-ingredient`).click(function(){
                    //this event obtains the values from the modal inputs, pushes this data to the ingredients array and shows it
    
                    const newIngredient = new Ingredient();
                    const index = newIngredient.getId();
    
                    let userIngredientName = $("input[name='input-ing-name']").val();
                    let userIngredientAmount = $("input[name='input-ing-amount']").val();
                    let userIngredientMeasure = $("#input-ing-measure").val();
                    let userIngredientAlcohol = $("input[name='input-ing-alcohol']").val();
    
                    newIngredient.ingredientName = userIngredientName;
                    newIngredient.amount = userIngredientAmount;
                    newIngredient.measure = userIngredientMeasure;
                    newIngredient.alcoholContent = userIngredientAlcohol;
    
                    myUser.recipes[IndexNewIngredient].ingredients[index] = newIngredient;
                    
                    $(`#listIngredients-${IndexNewIngredient}`).append(`
                        <li id="item-ingredient-${IndexNewIngredient}-${index}" class="list-ingr-item d-flex flex-row justify-content-start">
                            <button id="btn-delete-ingredient-${IndexNewIngredient}-${index}" class="bg-danger d-inline me-1 btn-delete-ingredient">
                                <i class="fa fa-times" aria-hidden="true" title="Delete ingredient"></i>
                            </button> 
                            ${newIngredient.show()}
                        </li> 
                    `);
    
                    //delete ingredient
                    $(`#btn-delete-ingredient-${IndexNewIngredient}-${index}`).click(function(){
                        //this function erases the ingredient where this event is called and empties the element from the ingredients array
                        const IdDeleteIngredient = $(this).attr('id');
                        const IndexDeleteIngredient = IdDeleteIngredient.match(/\d+/g).map(Number)
    
                        //extracts the first number correspondent to the recipe/card
                        const IndexRecipe = IndexDeleteIngredient[0];
                        //extracts the second number correspondent to the ingredient/list item
                        const IndexIngredient = IndexDeleteIngredient[1];
                        
    
                        delete myUser.recipes[IndexRecipe].ingredients[IndexIngredient];
                        $(`#item-ingredient-${IndexRecipe}-${IndexIngredient}`).remove();            
                    });
    
                    $("input").val('');
                    $('#input-ing-measure option:first').prop('selected',true);
                    $("#modal-ingredient").removeClass("show");
                    //unbinding the event from the button
                    $("#btn-save-ingredient").unbind()
                });
    
    
                //cancel new ingredient event
                $(`#btn-cancel-ingredient`).click(function(){
                    $("#modal-ingredient").removeClass("show");
                    $("#btn-save-ingredient").unbind()
                });
            });
        // ------------------------------------------
    }