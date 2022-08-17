const loadSingleUser = () => {
    fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => displaySingleUser(data.results[0]))
};
loadSingleUser();

const displaySingleUser = user => (
    console.log(user)
)
// meal db
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('meals').style.display = displayStyle;
}

const searchMeal = () => {
    const searchText = document.getElementById('search-field').value;

    // display spinner
    toggleSpinner('block');
    toggleSearchResult('none');

    loadMeals(searchText);
    // searchText.value = '';
    document.getElementById('search-field').value = '';
}

const loadMeals = searchText => {
    const url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}
const displayMeals = meals => {
    const container = document.getElementById('meals');
    container.textContent = '';

    if (!meals) {
        document.getElementById('result-found').innerText = `Show no result found.`;
        toggleSpinner('none');
    }

    meals?.forEach(meal => {
        const div = document.createElement('div');
        div.innerHTML = `
        <h4>${meal.strMeal}</h4>
        <p>${meal.strIngredient18 ? meal.strIngredient18 : ''}</p>
        <button class="btn btn-primary" onclick="loadMealDetail('${meal.strMeal}')">click me</button>
        `
        container.appendChild(div);
        toggleSpinner('none');
        toggleSearchResult('block');

    })
}

loadMeals('fish');

const loadMealDetail = mealName => {
    console.log(mealName)
}
// const loadMealDetail = mealName => {
//     console.log(mealName)
// }