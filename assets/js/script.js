//  ----------------------API Related variables ----------------------
var spoonAPIKey = "e29435235c7a48c3b173e38c7d69df99";
var backupSpoonApiKey = "7f55cad95b82472cae019d0951293823"; // Because 150 api call limit
var recipeDisplayDiv = document.getElementById("recipe__column");
recipeDisplayDiv.setAttribute("class", "ml-4 mr-4");
var movieTitleBtn = document.getElementById("movie__title");
var resetButton = document.createElement("button");
var randomfoodUrl =
	"https://api.spoonacular.com/recipes/random?apiKey=" + spoonAPIKey;

var moviesData; // Reserved variable for holding any API data for testing purposes.
var moviePlot = document.getElementById("movie__plot");
var movieGenres = [
	28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
	53, 10752, 37,
]; // These are genre codes for the API to use to select random movies from this array of genres ids.
var excludedArray = [];
var includedArray = [];
var movieGenre = document.getElementById("movie__genres");
var movieDbKey = "8e39c89d5fa028e82010a11d982e8911";
var genresUrl =
	"https://api.themoviedb.org/3/discover/movie?api_key=" +
	movieDbKey +
	"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=" +
	movieGenres[Math.floor(Math.random() * movieGenres.length)] +
	"&with_watch_monetization_types=flatrate";

var randomRecipeButton = document.getElementById("random__recipe");
var randomMovieButton = document.getElementById("random__movie");
randomMovieButton.addEventListener("click", (e) => {
	e.preventDefault();
	callMovieDb();
});
randomRecipeButton.addEventListener("click", () => {
	callSpoonacularApi(randomfoodUrl);
});
//  ----------------API Call Functions -------------------------------
var callMovieDb = () => {
	console.log("amended array: ", excludedArray);
	if (excludedArray.length > 0) {
		console.log("array not empty");
		checkMovieArray();
	} else {
		console.log("amended array empty");
		console.log(genresUrl);
		moviePlot.innerText = "";
		movieGenre.innerText = "";

		fetch(genresUrl)
			.then((res) => res.json())
			.then((movies) => {
				console.log(movies);
				displayMovie(movies);
			})
			.catch((error) => {
				console.log(error);
			});
	}
};
var checkMovieArray = () => {
	var amendedGenresUrl =
		"https://api.themoviedb.org/3/discover/movie?api_key=" +
		movieDbKey +
		"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=" +
		includedArray[Math.floor(Math.random() * movieGenres.length)] +
		"&with_watch_monetization_types=flatrate";
	console.log(amendedGenresUrl);
	console.log(excludedArray);
	moviePlot.innerText = "";
	movieGenre.innerText = "";

	fetch(amendedGenresUrl)
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
// -------------------------Button Handlers---------------------------
var init = () => {
	var genreButtons = document.getElementById("genre__buttons");
	if (genreButtons.children[19]) {
		genreButtons.children[19].remove();
	}
	for (var i = 0; i < genreButtons.children.length; i++) {
		genreButtons.children[i].addEventListener("click", function (e) {
			var buttonEvent = e.target.id;
			var button = document.getElementById(buttonEvent);
			button.disabled = true;
			includedArray = movieGenres;
			for (var j = 0; j < movieGenres.length; j++) {
				if (movieGenres[j] === parseInt(e.originalTarget.dataset.genreid)) {
					var spliceValue = movieGenres.splice(j, 1);
					excludedArray.push(spliceValue[0]);
					// includedArray = movieGenres - excludedArray values
					includedArray.splice(spliceValue[0]);
					console.log("excluded array new value:", excludedArray);
					console.log("included array new value:", includedArray);
				}
			}

			console.log("event listener", e.originalTarget.dataset, buttonEvent);
			resetButton.setAttribute("class", "button is-danger mt-1 is-small");
			resetButton.innerText = "Reset";
			// genreButtons.removeChild(button);
			genreButtons.appendChild(resetButton);
		});
		console.log("Click", genreButtons.children[i]);
	}
	resetButton.addEventListener("click", function (e) {
		for (var i = 0; i < genreButtons.children.length; i++) {
			genreButtons.children[i].disabled = false;
			excludedArray = [];
			includedArray = movieGenres;
		}
		console.log(
			"excluded array",
			excludedArray,
			"included array",
			includedArray
		);
		init();
	});
};
// ------------------- Display functions -----------------------------
var displayMovie = (movies) => {
	moviesData = movies;
	var h2El = document.createElement("h2");
	var pEl = document.createElement("p");
	var movieTitle = document.getElementById("movie__title");
	var moviePoster = document.getElementById("poster__icon");
	var movieRandomPick =
		movies.results[Math.floor(Math.random() * movies.results.length)];
	getGenre(movieRandomPick);
	movieTitle.innerText = movieRandomPick.original_title;
	moviePoster.setAttribute(
		"src",
		"https://image.tmdb.org/t/p/w500/" + movieRandomPick.poster_path
	);
	// Movie Title
	pEl.innerText = movieRandomPick.overview; // Movie Summary
	moviePlot.appendChild(pEl);
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
					var pEl = document.createElement("p");
					pEl.innerText = "Other Genres: " + genreList.genres[i].name;
					movieGenre.appendChild(pEl);
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
	ptag.setAttribute("class", "mt-3");
	var h3El = document.createElement("h3");
	var strongTag = document.createElement("strong");
	strongTag.innerText = foods.recipes[0].title;

	var ingredientType = foods.recipes[0].extendedIngredients[0].nameClean;
	console.log(ingredientType);
	ptag.innerHTML = foods.recipes[0].instructions;
	recipeDisplayDiv.appendChild(strongTag);
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
	wineDiv.setAttribute("class", "mt-3");
	var button = document.createElement("button");
	button.setAttribute("class", "button is-success mt-3 is-small");
	button.innerText = "Learn More";
	var h4El = document.createElement("h4");
	suggestionUrl =
		"https://winefolly.com/wine-pairing/getting-started-with-food-and-wine-pairing/";
	if (winePairing.pairingText === "") {
		h4El.innerHTML = `No Suggested wine for this recipe, Enjoy! For more information, press the button`; // If there is no returned wine suggestion based on the passed value, just put a default message.
		button.addEventListener("click", function () {
			window.open(
				"https://winefolly.com/wine-pairing/getting-started-with-food-and-wine-pairing/"
			);
		});
		wineDiv.appendChild(h4El);
		recipeDisplayDiv.appendChild(wineDiv);
		recipeDisplayDiv.appendChild(button);
	} else {
		h4El.innerHTML = winePairing.pairingText;
		wineDiv.appendChild(h4El);
		recipeDisplayDiv.appendChild(wineDiv);
	}
};

init();
