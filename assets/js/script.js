//  ---------------------------------------------
var testVar;
var movieGenres = [];
var apiKey = "8e39c89d5fa028e82010a11d982e8911";
var apiTestButton = document.getElementById("testapi");
apiTestButton.addEventListener(
	"click",
	callOmdb("http://www.omdbapi.com/?i=tt3896198&apikey=dc79c2ec")
);
var getApiGenres = document.getElementById("genres");
getApiGenres.addEventListener(
	"click",
	callOmdb(
		"https://api.themoviedb.org/3/genre/movie/list?api_key=" +
			apiKey +
			"&language=en-US"
	)
);

function callOmdb(url) {
	fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			testVar = data;
			console.log(data);
		})
		.catch(function (error) {
			console.log(error);
		});
}
