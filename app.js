var app = angular.module('dojo', []);

app.controller('MovieController', ['$scope', '$http', function ($scope, $http) {
	$scope.title = "";
	$scope.year = "";
	$scope.id = "";
	
	$scope.response = null;
	$scope.error = "";
	$scope.movieKeys = [];

	$scope.moviesList = {};
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

	$scope.addMovie = function () {
		if ($scope.response === null) return;
		if ($scope.response.hasOwnProperty("imdbID")) {
			$scope.moviesList[$scope.response.imdbID] = $scope.response;
		}
	};

	$scope.removeMovie = function () {
		if ($scope.response === null) return;
		if ($scope.moviesList.hasOwnProperty($scope.response.imdbID)) {
			delete $scope.moviesList[$scope.response.imdbID];
		}
	};

	$scope.isMovieInList = function () {
		if ($scope.moviesList.hasOwnProperty($scope.response["imdbID"])) {
			return true;
		}
		else {
			return false;
		}
	};
}]);