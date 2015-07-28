// CONTROLLERS
weatherApp.controller('homeCtrl', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
	
	$scope.city = cityService.city;
	
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});
	
	$scope.submit = function() {
		$location.path('/forecast');
	}
	
}]);

weatherApp.controller('forecastCtrl', ['$scope','$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

	$scope.city = cityService.city;
	
	$scope.days = $routeParams.days || 3;
								   
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, {get: { method: "JSONP" }});
	
	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
	
	$scope.formatDate = function(dt) {
		return new Date(dt * 1000);
	};
	
	$scope.convertToF = function(k) {
		return Math.round((1.8 * (k - 273)) + 32);
	};
	
}]);