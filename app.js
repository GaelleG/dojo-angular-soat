var app = angular.module('dojo', []);

app.controller('MovieController', ['$scope', '$http', function ($scope, $http) {
	$scope.title = "";
	$scope.year = "";
	$scope.id = "";
	
	$scope.response = {};
	$scope.error = "";

	$scope.getMovie = function () {
		$http.get('http://www.omdbapi.com/?t=' + $scope.title + '&y=' + $scope.year + '&i=' + $scope.id)
		.success(function (data) {
			if (data.Response == "False") {
				$scope.error = data.Error;
				$scope.response = {};
			}
			else {
				$scope.error = "";
				$scope.response = data;
			}
		})
		.error(function (data, status) {
			$scope.error = "Une erreur est survenue";
		});
	};
}]);