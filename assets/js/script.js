//  ----------------------API Related variables ----------------------
var spoonAPIKey = "e29435235c7a48c3b173e38c7d69df99";
var recipeDisplayDiv = document.getElementById("recipe__data");
var movieDataDiv = document.getElementById("movie__data");
var randomfoodUrl =
	"https://api.spoonacular.com/recipes/random?apiKey=" + spoonAPIKey;

var testVar; // Reserved variable for holding any API data for testing purposes.
var movieGenres = [
	28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
	53, 10752, 37,
]; // These are genre codes for the API to use to select random movies from this array of genres ids.
var movieDbKey = "8e39c89d5fa028e82010a11d982e8911";
var genresUrl =
	"https://api.themoviedb.org/3/discover/movie?api_key=" +
	movieDbKey +
	"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=" +
	movieGenres[Math.floor(Math.random() * movieGenres.length)] +
	"&with_watch_monetization_types=flatrate";
var apiTestButton = document.getElementById("testapi");
var randomMovieButton = document.getElementById("random__movie");
randomMovieButton.addEventListener("click", callMovieDb);
apiTestButton.addEventListener("click", function () {
	callSpoonacularApi(randomfoodUrl);
});
//  ----------------API Call Functions ------------------------------
function callMovieDb() {
	movieDataDiv.innerText = "";

	fetch(genresUrl)
		.then(function (res) {
			return res.json();
		})
		.then(function (movies) {
			console.log(movies);
			displayMovie(movies);
		})
		.catch(function (error) {
			console.log(error);
		});
}

function callSpoonacularApi(url) {
	recipeDisplayDiv.innerHTML = "";
	fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function (foods) {
			console.log(foods);
			displayRecipe(foods);
		});
}

// ------------------- Display functions -----------------------------
function displayMovie(movies) {
	var h2El = document.createElement("h2");
	var pEl = document.createElement("p");
	var movieRandomPick =
		movies.results[Math.floor(Math.random() * movies.results.length)];

	h2El.innerText = movieRandomPick.original_title;
	pEl.innerText = movieRandomPick.overview;
	movieDataDiv.appendChild(h2El);
	movieDataDiv.appendChild(pEl);
}
function displayRecipe(foods) {
	var ptag = document.createElement("p");
	var h3El = document.createElement("h3");
	h3El.innerText = foods.recipes[0].title;
	var ingredientType = foods.recipes[0].extendedIngredients[0].nameClean;
	console.log(ingredientType);
	ptag.innerHTML = foods.recipes[0].instructions;
	recipeDisplayDiv.appendChild(h3El);
	recipeDisplayDiv.appendChild(ptag);
	var winePairingUrl =
		"https://api.spoonacular.com/food/wine/pairing?food=" +
		ingredientType +
		"&apiKey=" +
		spoonAPIKey;
	fetch(winePairingUrl) // This fetch is just a part of the recipe display function so that something is always returned when a recipe is gathered. Wouldn't want a wine suggested without first getting a recipe.
		.then(function (res) {
			return res.json();
		})
		.then(function (winePairing) {
			displayWine(winePairing);
		})
		.catch(function (error) {
			console.log(error);
		});
}
function displayWine(winePairing) {
	console.log(winePairing);
	var wineDiv = document.createElement("div");
	var h4El = document.createElement("h4");
	if (winePairing.pairingText === "") {
		h4El.innerHTML = "No Suggested wine for this dinner, Enjoy!"; // If there is no returned wine suggestion based on the passed value, just put a default message.
	} else {
		h4El.innerHTML = winePairing.pairingText;
	}
	wineDiv.appendChild(h4El);
	recipeDisplayDiv.appendChild(wineDiv);
}
