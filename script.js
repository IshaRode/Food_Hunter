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
    for (let i = 1; i <= 20; i++) {
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

document.addEventListener('DOMContentLoaded', fetchRandomMeal);
