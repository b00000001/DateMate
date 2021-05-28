//  ----------------------API Related variables ----------------------
var spoonAPIKey = "e29435235c7a48c3b173e38c7d69df99";
var recipeDisplayDiv = document.getElementById("recipe__column");
var movieTitleBtn = document.getElementById("movie__title");
var randomfoodUrl =
	"https://api.spoonacular.com/recipes/random?apiKey=" + spoonAPIKey;

var moviesData; // Reserved variable for holding any API data for testing purposes.
var moviePlot = document.getElementById("movie__plot");
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
var randomRecipeButton = document.getElementById("random__recipe");
var randomMovieButton = document.getElementById("random__movie");
randomMovieButton.addEventListener("click", () => {
	callMovieDb();
});
randomRecipeButton.addEventListener("click", () => {
	callSpoonacularApi(randomfoodUrl);
});
//  ----------------API Call Functions ------------------------------
var callMovieDb = () => {
	moviePlot.children[0].innerText = "";
	console.log("test");

	fetch(genresUrl)
		.then((res) => res.json())
		.then((movies) => {
			console.log(movies);
			displayMovie(movies);
		})
		.catch((error) => {
			console.log(error);
		});
};
var callSpoonacularApi = (url) => {
	recipeDisplayDiv.innerHTML = "";
	fetch(url)
		.then((res) => res.json())
		.then((foods) => {
			console.log(foods);
			displayRecipe(foods);
		});
};

// ------------------- Display functions -----------------------------
var displayMovie = (movies) => {
	moviesData = movies;
	var h2El = document.createElement("h2");
	var pEl = document.createElement("p");
	var movieTitle = document.getElementById("movie__title");
	var movieRandomPick =
		movies.results[Math.floor(Math.random() * movies.results.length)];
	getGenre(movieRandomPick);
	movieTitle.innerText = movieRandomPick.original_title;
	// Movie Title
	pEl.innerText = movieRandomPick.overview; // Movie Summary
	moviePlot.children[0].appendChild(pEl);
};
var getGenre = (randomMov) => {
	fetch(
		"https://api.themoviedb.org/3/genre/movie/list?api_key=8e39c89d5fa028e82010a11d982e8911&language=en-US"
	)
		.then((res) => res.json())
		.then((genreList) => {
			for (var i = 0; i < Object.keys(genreList.genres).length; i++) {
				if (
					genreList.genres[i].id ===
					randomMov.genre_ids[
						Math.floor(Math.random() * Object.keys(randomMov.genre_ids).length)
					]
				) {
					var h4El = document.createElement("h4");

					// h4El.innerText = "Genre: " + genreList.genres[i].name;
					console.log("Genre: ", genreList.genres[i].name); // This is how to get the Genre name
				}
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

var displayRecipe = (foods) => {
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
		.then((res) => res.json())
		.then((winePairing) => {
			displayWine(winePairing);
		})
		.catch((error) => {
			console.log(error);
		});
};
var displayWine = (winePairing) => {
	console.log(winePairing);
	var wineDiv = document.createElement("div");
	var h4El = document.createElement("h4");
	if (winePairing.pairingText === "") {
		h4El.innerHTML = "No Suggested wine for this recipe, Enjoy!"; // If there is no returned wine suggestion based on the passed value, just put a default message.
	} else {
		h4El.innerHTML = winePairing.pairingText;
	}
	wineDiv.appendChild(h4El);
	recipeDisplayDiv.appendChild(wineDiv);
};
