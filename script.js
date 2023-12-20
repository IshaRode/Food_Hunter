// Selecting the DOM Elements
const refreshButton = document.querySelector('.refresh');
const randomFoodDiv = document.querySelector('.random-food');
const modal = document.getElementById('myModal');
const modalTitle = document.querySelector('.modal-title');
const modalIngredients = document.querySelector('.modal-ingredients');

// Fetching a random meal from Mealdb API
async function fetchRandomMeal() {
    try {
        // Fetching data from Mealdb API
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
            const randomMeal = data.meals[0];

            // Adding random food images
            const randomFoodImage = randomFoodDiv.querySelector('img');
            randomFoodImage.src = randomMeal.strMealThumb;
            randomFoodImage.alt = randomMeal.strMeal;

            // Adding food name according to the random image
            const foodName = randomFoodDiv.querySelector('.food-name');
            foodName.textContent = randomMeal.strMeal;

            // EventListener to add modal beside the random meal when clicked on the image
            randomFoodImage.addEventListener('click', () => {
                modalTitle.textContent = randomMeal.strMeal;
                modalIngredients.innerHTML = getIngredientsList(randomMeal);
                modal.style.display = 'flex';
            });
        }
    } catch (error) {
        console.error('Error fetching random meal:', error);
    }
}

// Creating list of ingredients and their measures to display
function getIngredientsList(meal) {
    let ingredients = '';
    for (let i = 1; i <= 16; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredients += `<li>${ingredient} - ${measure}</li>`;
        } else {
            break;
        }
    }
    return ingredients;
}

// Function to close the modal when cliked on close button
function closeModal() {
    modal.style.display = 'none';
}
modal.querySelector('.close').addEventListener('click', closeModal);

// refreshing the meal when clicked on REFRESH
refreshButton.addEventListener('click', () => {
    fetchRandomMeal();
    closeModal();
});

const refbutton = document.querySelector('.refresh');
refbutton.addEventListener('click', () => {
    fetchRandomMeal();
    closeModal();

// Redirecting to the random meal section on click of refresh
const randomise = document.querySelector('.rando');
randomise.scrollIntoView({ behavior : "smooth"});
});

document.addEventListener('DOMContentLoaded', fetchRandomMeal);

// Function to fetch meal on search category
async function fetchMeals(category) {
    try {

        // Fetching the searched meal from Mealdb API
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
        const data = await response.json();
        if (data.meals) {
            return data.meals;
        } else {
            return [];
        }

    } catch(error) {
        return[];
    }
}

// Displaying search results in UI
function displaySearchResults(meals) {
    const searchResultDiv = document.querySelector('.search-results');
    searchResultDiv.innerHTML = '';
    if (meals.length === 0) {
        searchResultDiv.innerHTML = '<p> OOPS! No meals found 😔 </p>'
        return;
    }

// Creating divs for each meal i.e. Image and the meal name    
meals.forEach(meal => {
    const foodName = meal.strMeal;
    const foodImage = meal.strMealThumb;
    const resultItem = document.createElement('div');
    resultItem.classList.add('searched-item');
    const mealImage = document.createElement('img');
    mealImage.src = foodImage;
    mealImage.alt = foodName;
    const mealTitle = document.createElement('h2');
    mealTitle.textContent = foodName;
    resultItem.appendChild(mealImage);
    resultItem.appendChild(mealTitle);
    searchResultDiv.appendChild(resultItem);
});
}

// EventListener to display the searched results on click of search button
const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', async () => {
    const searchInput = document.querySelector('.search-input');
    const category = searchInput.value.trim();
    if (category !== '') {
        const searchResults = await fetchMeals(category);
        displaySearchResults(searchResults); 

    } else {
        return ("Please enter a search term.");
    }
});
