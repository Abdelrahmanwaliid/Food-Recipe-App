const searchInputTxt = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

searchBtn.addEventListener("click", () => {
  if (searchInputTxt.value !== "") {
    getMealList();
  }
});

mealList.addEventListener("click", getMealRecipe);

recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

async function getMealList() {
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt.value}`;

  let response = await fetch(url);

  let data = await response.json();

  let html = "";
  if (data.meals) {
    data.meals.forEach((meal) => {
      html += `
      <div class="meal-item" id=${meal.idMeal}>
         <div class="meal-img">
            <img src="${meal.strMealThumb}" alt="" />
         </div>
      <div class="meal-name">
        <h3>${meal.strMeal}</h3>
        <a href="#" class="recipe-btn">Get Recipe</a>
      </div>
    </div>
  
      `;
    });
    mealList.classList.remove("notFound");
  } else {
    html = "Sorry, we didn't find any meal!";
    mealList.classList.add("notFound");
    console.log("Not Found");
  }
  mealList.innerHTML = html;
}

async function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    console.log(mealItem);

    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`
    );

    let data = await response.json();

    mealRecipeModal(data.meals);
  }
}

// create a modal
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `

  <h2 class = "recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <div class="recipe-instruct">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
  </div>
  <div class="recipe-meal-img">
  <img src ="${meal.strMealThumb}" alt = "">
  </div>
  <div class="recipe-link">
  <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
  </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
