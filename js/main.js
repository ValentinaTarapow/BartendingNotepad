let storagedUser;
let ingCounter;
let recipeCounter;
let recommendClickCounter = 0;
const URLJSON = "./data/data.json";
// ------------ CLASSES DEFINITION ------------

class User{
    constructor(){
        this.userName = "";
        this.recipes = [];
    }
}

class Cocktail{
    constructor(){
        //instance counter
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
        //instance counter
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

    show() {
        return(this.ingredientName + " (" + this.alcoholContent + " %Alc./Vol)" + " - " + this.amount + this.measure);
    }
}
// -----------------------------------------------



//------information modal event------
$("#btn-info").click(function(){
    //shows the web information
    $("#modal-info").addClass("show");

    $("#btn-close-info").click(function(){
        //hides the web information
        $("#modal-info").removeClass("show");
    });

    //close it by clicking on the outside 
    $('#modal-info').on("click", (e) => {
        var target = e.target || e.srcElement || e.currentTarget;
        if (document.getElementById('pop-info').contains(target)){
        } else{
            $("#modal-info").removeClass("show");
        }
    });
});

//---recommendations modal event with AJAX---
$("#btn-recommended").click(function(){
    //counts how many times this button was clicked
    recommendClickCounter++;
    $("#modal-recommended").addClass("show");
    
    //close it by clicking on the outside 
    $('#modal-recommended').on("click", (e) => {
        var target = e.target || e.srcElement || e.currentTarget;
        if (document.getElementById('pop-carousel').contains(target)){
        } else{
            $("#modal-recommended").removeClass("show");
        }
    });

    //just loads it the first time
    if(recommendClickCounter==1){
        $.getJSON(URLJSON, function (data, status) {
            
            
            if (status === "success") {
                let myData = data.staticRecipes;
                let recommendedCounter = 0;
                let slide = recommendedCounter + 1;
                
                for (const recipe of myData){
                    
                    //creating dynamic slides - they are static recipes so they cannot be edited
                    $(`.carousel-inner`).append(
                        `
                        <div id="recommendation-${recommendedCounter}" class="carousel-item h-100">
                            <div class="card text-black bg-warning mb-3 d-block h-100">
                                    <div class="card-header" id="recommendation-title">${recipe.cocktailName}</div>
                                    <div class="card-body h-100">
                                        <h5 class="card-title">Ingredients</h5>
                                        <ul class="card-text list-unstyled h-100" id="recommendation-${recommendedCounter}-ingredients"></ul>
                                    </div>
                            </div>
                        </div>
                            `
                    );

                    //creating dynamic indicators
                    $(`#carousel-indicators`).append(
                        `
                            <button type="button" id="indicator-${recommendedCounter}" class="" data-bs-target="#carousel" data-bs-slide-to="${recommendedCounter}" aria-label="Slide ${slide}"></button>
                        `
                    )

                    //starts the active indicator
                    if(recommendedCounter == 0){
                        $("#indicator-0").addClass("active");
                    }
                    
                    for(const ingredient of recipe.ingredients){
                        $(`#recommendation-${recommendedCounter}-ingredients`).append(
                            `
                                <li>
                                    ${ingredient.ingredientName} (${ingredient.alcoholContent} %Alc./Vol) - ${ingredient.amount} ${ingredient.measure}
                                </li>
                            `
                        );
                    }

                    //starts the active slide
                    if(recommendedCounter == 0){
                        $("#recommendation-0").addClass("active");
                    }
                
                    recommendedCounter++;
                }

            }
            else{
                //could not load the json
                alert("ERROR");
            }
        });
    }

});

//new recipe button event: pushes a new empty recipe into the users array and creates a card
    $("#btn-new-recipe").click(function(){
        
        const newCocktail = new Cocktail();
        const index = newCocktail.getId();
        myUser.recipes[index] = newCocktail;
        
        updateStorage();
        createCard(newCocktail,index);
    });

//------delete all recipes------
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

            //empty the array    
            while(myUser.recipes.length > 0){
                myUser.recipes.pop();
            }

            updateStorage();
        });
    });

//------edit-user-name button------
    //user creation
    let myUser = new User();

    $("#edit-user-name").click(function(){
        $("#modal-user").addClass("show");

        $("#btn-cancel-user").click(function(){
            $("#modal-user").removeClass("show");
        });

        $("#btn-save-user").click(function(){
            let userEntry;

            userEntry = $("#input-user").val();
            myUser.userName = userEntry;


            if ( (userEntry== "") || (userEntry == null)) {
                $("#greeting-user").html("");
            }
            else{
                $("#greeting-user").html(
                    `
                        Welcome, <span class="text-danger"> ${userEntry}</span>!
                    `
                );

                localStorage.setItem('_user', JSON.stringify(myUser));
        
                storagedUser = localStorage.getItem("_user");
            }

            $("#modal-user").removeClass("show");
        });
    });

    //STORAGE
    $(document).ready(function(){
        storagedUser = JSON.parse(localStorage.getItem("_user"));

        if(storagedUser){
            recipeCounter = parseInt(localStorage.getItem("_recipeCounter"));
            ingCounter = parseInt(localStorage.getItem("_ingCounter"));

            myUser = storagedUser;

            if((storagedUser.userName != null) && (storagedUser.userName != "")){
                $("#greeting-user").html(
                `
                    Welcome back, <span class="text-danger"> ${storagedUser.userName}</span>!
                `);
            }else{
                $("#greeting-user").html("");
            }
            

            Cocktail._counter = recipeCounter;
            Ingredient._counter = ingCounter;
        
            let recipesLength = storagedUser.recipes.length;

            // if there is any recipe
            if(recipesLength >= 1){

                //filters null/empty
                let cleanArray = storagedUser.recipes.filter(Boolean);
                let cleanLength = cleanArray.length;

                //shows the cleaned array
                for(let i = 0; i < cleanLength; i++){
                    let storageRecipe = cleanArray[i];
                    console.log(storageRecipe);
                    let storageIndex = storageRecipe._id;
                    createCard(storageRecipe,storageIndex);
                }
            }
        }
        else{
                $("#greeting-user").html("");
        }
    });


//------------------------------------------------

    //CREATE CARD FUNCTION
    function createCard(recipe , index){
        $("#recipes-grid").append(
            `
            <div id="recipe-${index}" class="card-recipe">
                <div id="card-title-${index}" class="recipe-title w-100 d-flex flex-row justify-content-between">
                    <h4 id="recipe-id-${index}" class="d-flex flex-row justify-content-center align-items-center mb-0">#${index}</h4>
                    <h2 id="recipe-name-${index}" class="recipe-name d-inline w-100 mb-0">${recipe.cocktailName}</h2>
                    <button class="d-inline btn border-top-0 border-bottom-0 border-end-0 rounded-0 btn-edit" id="btn-edit-recipe-name-${index}" title="Edit recipe name"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                </div>
    
                <div id="card-body" class="d-flex flex-row">
                    <div id="recipe-data-${index}" class="w-100">
                        <div>
                            <h3 id="ing-label">Ingredients</h3>
                            <ul id="listIngredients-${index}" class="listIngredients w-100 container">
                            </ul>
                        </div>
                        
                    </div>
                    <div id="recipe-operations-${index}" class="recipe-operations"></div>
    
                </div>
            </div>
            `);


        // checks if there is any ingredient, if its equal or greater than 1, they came from storage
        let ingrLength = recipe.ingredients.length;
        if(ingrLength >= 1){

            //filters null/empty
            let cleanArray = storagedUser.recipes[recipe._id].ingredients.filter(Boolean);
            let cleanLength = cleanArray.length;

            //shows the cleaned array
            for(let i = 0; i < cleanLength; i++){
                let storageIngr = cleanArray[i];
                console.log(storageIngr);
                let storageIndex = storageIngr._id;
            
                $(`#listIngredients-${recipe._id}`).append(`
                <li id="item-ingredient-${recipe._id}-${storageIndex}" class="list-ingr-item d-flex flex-row justify-content-start">
                    <button id="btn-delete-ingredient-${recipe._id}-${storageIndex}" class="bg-danger d-inline me-1 btn-delete-ingredient">
                        <i class="fa fa-times" aria-hidden="true" title="Delete ingredient"></i>
                    </button> 

                    ${storageIngr.ingredientName} (${storageIngr.alcoholContent} %Alc./Vol.) - ${storageIngr.amount} ${storageIngr.measure}
                </li> 
            `);

            //Delete ingredient event: binding this event when the ingredient comes from storage
            $(`#btn-delete-ingredient-${recipe._id}-${storageIndex}`).click(function(){
                const IdDeleteIngredient = $(this).attr('id');
                //extracts the digits from the id where the event is called
                const IndexDeleteIngredient = IdDeleteIngredient.match(/\d+/g).map(Number)

                //extracts the first number correspondent to the recipe/card
                const IndexRecipe = IndexDeleteIngredient[0];
                //extracts the second number correspondent to the ingredient/list item
                const IndexIngredient = IndexDeleteIngredient[1];
                

                delete myUser.recipes[IndexRecipe].ingredients[IndexIngredient];
                $(`#item-ingredient-${IndexRecipe}-${IndexIngredient}`).remove();

                updateStorage();        
            });
            }
        }

        // edit-recipe-name button
        $(`#btn-edit-recipe-name-${index}`).click(function(event){
            $("#modal-recipe-name").addClass("show");
    
            //obtaining the numbers from the id to use it as target index variable
            const IdEditRecipeName = $(this).attr('id');
            const IndexEditRecipeName = IdEditRecipeName.match(/\d+/).map(Number);
    
            //------Save recipe name event------
            $(`#btn-save-recipe-name`).click(function(){
                let userEntry = $("input[name='recipeName']").val();
                
                if((userEntry == null) || (userEntry == "")){
                    $(`#recipe-name-${IndexEditRecipeName}`).text(myUser.recipes[IndexEditRecipeName].cocktailName);
                }
                else{
                    myUser.recipes[IndexEditRecipeName].cocktailName = userEntry;
                    $(`#recipe-name-${IndexEditRecipeName}`).text(myUser.recipes[IndexEditRecipeName].cocktailName);
                }
    
                updateStorage();
                $("input[name='recipeName']").val('')
                $("#modal-recipe-name").removeClass("show");
                //unbinding the event from the button
                $("#btn-save-recipe-name").unbind()
            });
    
            //------Cancel change recipe name------
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
    
            // delete recipe: erases the card where this event is called and empties the element from the recipes array
            $(`#btn-delete-recipe-${index}`).click(function(e){
                //it does not POP it from the array to avoid altering it and the ids
                $(`#recipe-${index}`).remove()
                delete myUser.recipes[index];
                updateStorage();
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
    
                    //select values from the inputs
                    let userIngredientName = $("input[name='input-ing-name']").val();
                    let userIngredientAmount = $("input[name='input-ing-amount']").val();
                    let userIngredientMeasure = $("#input-ing-measure").val();
                    let userIngredientAlcohol = $("input[name='input-ing-alcohol']").val();
    
                    //save the values in the ingredient
                    newIngredient.ingredientName = userIngredientName;
                    newIngredient.amount = userIngredientAmount;
                    newIngredient.measure = userIngredientMeasure;
                    newIngredient.alcoholContent = userIngredientAlcohol;
    
                    console.log(index);
                    myUser.recipes[IndexNewIngredient].ingredients[index] = newIngredient;
                    
                    $(`#listIngredients-${IndexNewIngredient}`).append(`
                        <li id="item-ingredient-${IndexNewIngredient}-${index}" class="list-ingr-item d-flex flex-row justify-content-start">
                            <button id="btn-delete-ingredient-${IndexNewIngredient}-${index}" class="bg-danger d-inline me-1 btn-delete-ingredient">
                                <i class="fa fa-times" aria-hidden="true" title="Delete ingredient"></i>
                            </button> 
                            ${newIngredient.show()}
                        </li> 
                    `);

                    updateStorage();
    
                    //delete ingredient: erases the ingredient where this event is called and empties the element from the ingredients array
                    $(`#btn-delete-ingredient-${IndexNewIngredient}-${index}`).click(function(){
                        
                        const IdDeleteIngredient = $(this).attr('id');
                        //extracts the digits from the id where the event is called
                        const IndexDeleteIngredient = IdDeleteIngredient.match(/\d+/g).map(Number)
    
                        //extracts the first number correspondent to the recipe/card
                        const IndexRecipe = IndexDeleteIngredient[0];
                        //extracts the second number correspondent to the ingredient/list item
                        const IndexIngredient = IndexDeleteIngredient[1];
                        
    
                        delete myUser.recipes[IndexRecipe].ingredients[IndexIngredient];
                        $(`#item-ingredient-${IndexRecipe}-${IndexIngredient}`).remove();

                        updateStorage();        
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
    };

    //UPDATE STORAGE
    function updateStorage() {
        localStorage.setItem('_user', JSON.stringify(myUser));
        storagedUser = localStorage.getItem("_user");

        localStorage.setItem('_recipeCounter', Cocktail._counter);
        localStorage.setItem('_ingCounter',Ingredient._counter);
        recipeCounter = localStorage.getItem("_recipeCounter");
        ingCounter = localStorage.getItem("_ingCounter");
    };