

// measures equivalence
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
    $("#modal-info").addClass("show");

    $("#btn-close-info").click(function(){
        $("#modal-info").removeClass("show");
    });
});

// const numero = "aver-12-34";
// const prueba = numero.match(/\d+/g).map(Number);
// console.log(prueba[0]);
// console.log(prueba[1])


$("#btn-new-recipe").click(function(){
    // this function pushes a new empty recipe into the users array and creates a card
    const newCocktail = new Cocktail();
    const index = newCocktail.getId();
    myUser.recipes[index] = newCocktail;
    // myUser.recipes[0] += 1
    
    console.log(myUser);
    localStorage.setItem('user', JSON.stringify(myUser));
    storagedUser = localStorage.getItem("user");
    
    $("#recipes-grid").append(
        `
        <div id="recipe-${index}" class="card-recipe">
            <div id="card-title-${index}" class="recipe-title w-100 d-flex flex-row justify-content-between" ">
                <h2 id="recipe-name-${index}" class="recipe-name d-inline w-100">${newCocktail.cocktailName}</h2>
                <p id="recipe-id-${index}">${index}</p>
                <button class="d-inline btn btn-secondary border-top-0 border-bottom-0 border-end-0 rounded-0" id="btn-edit-recipe-name-${index}"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </div>

            <div id="card-body" class="d-flex flex-row">
                <div id="recipe-data-${index}" class="w-100">
                    <div>
                        <h3>Ingredients</h3>
                        <ul id="listIngredients-${index}" class="listIngredients w-75 container"></ul>
                    </div>
                    
                </div>
                <div id="recipe-operations-${index}" class="recipe-operations"></div>

            </div>
        </div>
        `);

    $("#alert-added").fadeIn(300).delay(1500).fadeOut(400);


    // edit-recipe-name button
    $(`#btn-edit-recipe-name-${index}`).click(function(event){
        $("#modal-recipe-name").addClass("show");

        //obtaining the numbers from the id to use it as index
        const saveIdEdit = $(this).attr('id');
        const saveRecipeIndex = saveIdEdit.match(/\d+/).map(Number);
    
        $(`#btn-save-recipe-name`).click(function(){
            let userEntry = $("input[name='recipeName']").val();
            
            if((userEntry == null) || (userEntry == "")){
                $(`#recipe-name-${saveRecipeIndex}`).text(myUser.recipes[saveRecipeIndex].cocktailName);
            }
            else{
                myUser.recipes[saveRecipeIndex].cocktailName = userEntry;
                $(`#recipe-name-${saveRecipeIndex}`).text(myUser.recipes[saveRecipeIndex].cocktailName);
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
        //this function erases the card where this event is called and erases the element from the recipes array
            $(`#recipe-${index}`).remove()
            // e.currentTarget.parentNode.parentNode.parentNode.remove();
            delete myUser.recipes[index]
            // myUser.recipes[0] -= 1
            $("#alert-deleted").fadeIn(300).delay(1500).fadeOut(400);
        });
    
        //new-ingredient
            // falta usar el modal, ya esta en el html
        $(`#btn-new-ingredient-${index}`).click(function(e){
            
            $("#modal-ingredient").addClass("show");
            
            const saveIdNewIngr = $(this).attr('id');
            const saveRecipeIndexIngr = saveIdNewIngr.match(/\d+/).map(Number);
            
            

            $(`#btn-save-ingredient`).click(function(){
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

                myUser.recipes[saveRecipeIndexIngr].ingredients[index] = newIngredient;
                
                $(`listIngredients-${saveRecipeIndexIngr}`).append(`
                    <li id="item-ingredient-${saveRecipeIndexIngr}-${index}" class="list-ingr-item d-flex flex-row justify-content-start">
                        ${newIngredient.show()}
                    </li> 
                `);

                $("input").val('');
                $('#baba option:first').prop('selected',true);
                $("#modal-ingredient").removeClass("show");
                //unbinding the event from the button
                $("#btn-save-ingredient").unbind()
            });

            $(`#btn-cancel-ingredient`).click(function(){
                $("#modal-ingredient").removeClass("show");
                $("#btn-save-ingredient").unbind()
            });
        });

});





// delete all recipes
$("#btn-delete-all").click(function(){
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
                    Welcome, <span class="text-danger"> ${userEntry}</span>!
                `;
            }

            $("#modal-user").removeClass("show");
        });
    });

    $(document).ready(function(){   

        // AJAX
        $.getJSON(URLJSON, function (_staticRecipes) {
            console.log(_staticRecipes);
  
        });

        // STORAGE
        if(storagedUser) {
            storagedUser = JSON.parse(localStorage.getItem("user"));
            myUser.userName = storagedUser.userName;
            myUser.recipes = storagedUser.recipes;        
            greetingUserSection.innerHTML=
        `
            Welcome back, <span class="text-danger"> ${storagedUser.userName}</span>!
        `;
        }
        else{
            greetingUserSection.innerHTML= "";
        }
    });

    function createStaticRecipe(recipe){
        $("#recipes-grid").append(
            `
            `);
    }