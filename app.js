var app = angular.module('dojo', []);

app.controller('MovieController', ['$scope', function ($scope) {
	$scope.title = "";
	$scope.year = "";
	$scope.id = "";
}]);