var app = angular.module('dojo', []);

app.controller('MovieController', ['$scope', '$http', function ($scope, $http) {
	$scope.title = "";
	$scope.year = "";
	$scope.id = "";
	$scope.meltedProperties = "";
	
	$scope.response = null;
	$scope.error = "";
	$scope.movieKeys = [];

	$scope.moviesList = {};
	$scope.moviesListKeys = ["imdbID", "Title", "Year"];

	var requestTimeout = null;
	$scope.getMovie = function () {
		clearTimeout(requestTimeout);
		var urlParams = "";
		if ($scope.id.length > 0) {
			urlParams = "i=" + $scope.id;
		}
		if ($scope.title.length > 0) {
			urlParams = "t=" + $scope.title;
		}
		if ($scope.year.length > 0) {
			urlParams += "&y=" + $scope.year;
		}
		if (urlParams.length > 0) {
			requestTimeout = setTimeout(function () {
				$scope.getAPIResponse(urlParams);
			}, 500);
		}
		else {
			$scope.error = "";
		}
	};

	$scope.$watch('meltedProperties', function() {
		if ($scope.meltedProperties.length == 0) {
			$scope.title = "";
			$scope.year = "";
			$scope.id = "";
			$scope.error = "";
			return;
		}

		var melted = $scope.meltedProperties;

		var strRegexIMDbID = "tt(\\d+)";
		var regexIMDbID = new RegExp(strRegexIMDbID);
		var strRegexYear = "(19|20)(\\d){2}";
		var regexYear = new RegExp(strRegexYear);

		var regexIMDbIDWithSeparator = new RegExp(
			"(^" + strRegexIMDbID + "$)" + "|" +
			"(((\\W|\\s)+)" + strRegexIMDbID + "$)" + "|" +
			"(^" + strRegexIMDbID + "(((\\W|\\s)+)))" + "|" +
			"(^" + strRegexYear + "((\\W|\\s)+)" + strRegexIMDbID + "((\\W|\\s)+)(\\D+)$)" + "|" +
			"(^(\\D+)((\\W|\\s)+)" + strRegexIMDbID + "((\\W|\\s)+)" + strRegexYear + "$)");
		var regexYearWithSeparator = new RegExp(
			"(^" + strRegexYear + "((\\W|\\s)+))" + "|" +
			"(((\\W|\\s)+)" + strRegexYear + "$)");

		if (regexIMDbIDWithSeparator.test(melted)) {
			$scope.id = melted.match(regexIMDbID)[0];
			melted = melted.replace($scope.id, "");
			while ((/^(\W|\s)+/).test(melted)) {
				melted = melted.substring(1, melted.length);
			}
			while ((/(\W|\s)+$/).test(melted)) {
				melted = melted.substring(0, melted.length-1);
			}
		}
		else {
			$scope.id = "";
		}

		if (regexYearWithSeparator.test(melted)) {
			var s = melted;
			while (regexYearWithSeparator.test(s)) {
				$scope.year = s.match(regexYear)[0];
				s = s.replace($scope.year, "");
			}
			melted = melted.replace($scope.year, "");
			while ((/^(\W|\s)+/).test(melted)) {
				melted = melted.substring(1, melted.length);
			}
			while ((/(\W|\s)+$/).test(melted)) {
				melted = melted.substring(0, melted.length-1);
			}
		}
		else {
			$scope.year = "";
		}

		if (melted.length > 0) {
			$scope.title = melted;
		}
		else {
			$scope.title = "";
		}

		$scope.getMovie();
	});

	$scope.getAPIResponse = function (urlParams) {
		if (urlParams === undefined) return;
		$http.get('http://www.omdbapi.com/?' + urlParams)
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