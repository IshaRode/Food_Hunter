const refreshButton = document.querySelector('.refresh');
const randomFoodDiv = document.querySelector('.random-food');
const modal = document.getElementById('myModal');
const modalTitle = document.querySelector('.modal-title');
const modalIngredients = document.querySelector('.modal-ingredients');

async function fetchRandomMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
            const randomMeal = data.meals[0];

            const randomFoodImage = randomFoodDiv.querySelector('img');
            randomFoodImage.src = randomMeal.strMealThumb;
            randomFoodImage.alt = randomMeal.strMeal;

            const foodName = randomFoodDiv.querySelector('.food-name');
            foodName.textContent = randomMeal.strMeal;

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


function closeModal() {
    modal.style.display = 'none';
}
modal.querySelector('.close').addEventListener('click', closeModal);

refreshButton.addEventListener('click', () => {
    fetchRandomMeal();
    closeModal();
});

const refbutton = document.querySelector('.refresh');
refbutton.addEventListener('click', () => {
    fetchRandomMeal();
    closeModal();


const randomise = document.querySelector('.rando');
randomise.scrollIntoView({ behavior : "smooth"});
});

document.addEventListener('DOMContentLoaded', fetchRandomMeal);

async function fetchMeals(searchTerm) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
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

function displaySearchResults(meals) {
    const searchResultDiv = document.querySelector('.search-results');
    searchResultDiv.innerHTML = '';
    if (meals.length === 0) {
        searchResultDiv.innerHTML = '<p>No meals found </p>'
        return;
    }

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

const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', async () => {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        const searchResults = await fetchMeals(searchTerm);
        displaySearchResults(searchResults); 
        
    } else {
        return ("Please enter a search term.");
    }
});
