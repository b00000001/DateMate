//  ---------------------------------------------
function callOmdb() {
	fetch("http://www.omdbapi.com/?i=tt3896198&apikey=dc79c2e")
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			console.log(data);
		});
}
callOmdb();
