// Aglahir Jimenez Florez
// A01364026

function buildElement(name, area, instructions, image) {
  return `<div style="border-bottom: 2px dashed aqua; width: 50%;">
    <h1>Name:</h1>
    <p>${name}</p>
    <h1>Area:</h1>
    <p>${area}</p>
    <h1>Instructions</h1>
    <p>${instructions}</p>
    <center>
      <img
        src="${image}"
        style="width: 200px;"
      />
    </center>
  </div>`;
}

function displayResults(json) {
  let container = document.querySelector(".js-search-results");
  container.innerHTML = "";
  if (json.meals == null) {
    let notFound = "Meal not found in API";
    container.innerHTML += `<p>${notFound}</p>`;
  } else {
    for (let meal in json.meals) {
      container.innerHTML += buildElement(
        json.meals[meal].strMeal,
        json.meals[meal].strArea,
        json.meals[meal].strInstructions,
        json.meals[meal].strMealThumb
      );
    }
  }
}

function registerClick() {
  let searchButton = document.querySelector(".js-search-form");

  searchButton.addEventListener("submit", (event) => {
    event.preventDefault();
    let text = event.target.query.value;

    if (text.length > 1) {
      let settings = {
        method: "GET",
      };
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;

      fetch(url, settings)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((json) => {
          displayResults(json);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

function init() {
  registerClick();
}

init();
