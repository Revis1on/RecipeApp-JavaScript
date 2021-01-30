const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = ''
const apiID = '0fd38c04';
const apiKey = '6175fefa14fb5eb8196356e6b8658546';
const apiPathUrl = `https://api.edamam.com/search?q=pizza&app_id=${apiID}&app_key=${apiKey}`;

searchForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI (){
    const apiPathUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${apiID}&app_key=${apiKey}&to=20`;
    const response = await fetch(apiPathUrl);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);

};

function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(results => {
        generatedHTML +=
        `
        <div class="item">
        <img src="${results.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${results.recipe.label}</h1>
            <a class="view-btn" href="${results.recipe.url}"target="_blank">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${Math.floor(results.recipe.calories)}</p>
        <p class="item-data">Diet label: ${results.recipe.dietLabels.length > 0 ? results.recipe.dietLabels: 'No Data Found' }</p>
        <p class="item-data">Health level: ${results.recipe.healthLabels}</p>
        </div>
        `
    })

    searchResultDiv.innerHTML = generatedHTML;
}