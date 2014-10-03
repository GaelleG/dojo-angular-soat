var app = angular.module('dojo', []);

app.controller('MovieController', ['$scope', '$http', function ($scope, $http) {
	$scope.title = "";
	$scope.year = "";
	$scope.id = "";
	
	$scope.response = {};
	
	$scope.getMovie = function () {
		$http.get('http://www.omdbapi.com/?t=' + $scope.title + '&y=' + $scope.year + '&i=' + $scope.id)
		.success(function (data) {
			$scope.response = data;
		})
		.error(function (data) {
			$scope.response = data;
		});
	};
}]);