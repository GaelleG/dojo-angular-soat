var app = angular.module('dojo', []);

app.controller('MovieController', ['$scope', '$http', function ($scope, $http) {
	$scope.title = "";
	$scope.year = "";
	$scope.id = "";
	
	$scope.response = null;
	$scope.error = "";
	$scope.movieKeys = [];

	$scope.moviesList = {
		"tt0022913": {imdbID: "tt0022913", Title: "Freaks", Year: "1932"},
		"tt0062711": {imdbID: "tt0062711", Title: "Barbarella", Year: "1968"},
	};
	$scope.moviesListKeys = ["imdbID", "Title", "Year"];

	$scope.getMovie = function () {
		$http.get('http://www.omdbapi.com/?t=' + $scope.title + '&y=' + $scope.year + '&i=' + $scope.id)
		.success(function (data) {
			if (data.Response == "False") {
				$scope.error = data.Error;
				$scope.response = null;
				$scope.movieKeys = [];
			}
			else {
				$scope.error = "";
				$scope.response = data;
				$scope.movieKeys = Object.keys(data);
			}
		})
		.error(function (data, status) {
			$scope.error = "Une erreur est survenue";
		});
	};
}]);