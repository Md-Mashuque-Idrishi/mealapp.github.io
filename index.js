const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeClosedBtn = document.querySelector('.recipe-closed-btn');


// Function to get recipes

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes........</h2>";
    const data = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // console.log(response);

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = 
        `
           <img src="${meal.strMealThumb}">
           <h3>${meal.strMeal}</h3>
           <p>${meal.strArea}</p>
           <p>${meal.strCategory}</p>

        `
        const button = document.createElement('button');
        button.textContent = "view Recipe";
        recipeDiv.appendChild(button);

        // Adding EventListener to recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
        
    });
}


//Function to fetch  ingredients and measurements
const fetchIngredents = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li> ${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

//Open pop
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredents: </h3>
        <ul>${fetchIngredents(meal)}</ul>

    `
    recipeDetailsContent.parentElement.style.display = "block";
}

// closed pop
recipeClosedBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});