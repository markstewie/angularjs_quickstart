var app = angular.module("app", []);

app.config(function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/home', {
		templateUrl: 'home.html',
		controller: 'HomeController'
	});

	$routeProvider.otherwise({ redirectTo: '/login' });
});

/// FACTORY TO ENFORCE SINGLE RESPONSIBILITY
// benefit is encapulation
// logical place to extract info from bloted controllers
// if external services are needed just switch out internals of interface
app.factory("AuthenticationService", ['$location', function($location){
	return{
		login: function(credentials){
			if(credentials.username === "mark"){
				$location.path('/home');
			}
		}.

		logout: function(){
			$location.path('/login');
		}
	}
}]);


// need to wrap second argument as array if minifying.... can't minify strings, arg names don't matter no more
app.controller('LoginController', ['$scope', 'AuthenticationService', function($scope, AuthenticationService){
	$scope.credentials = {
		username:"",
		password:""
	};

	$scope.login = function(){
		AuthenticationService.login($scope.credentials);
	};
}]);

app.controller('HomeController',['$scope', '$location', function($scope, $location){
	$scope.message = "Hands up homeboy!";

	$scope.logout = function(){
		AuthenticationService.logout();
	}
}]);

// camel case for this
app.directive('showsMessageWhenHovered', function(){
	// returns object that configures the directive
	return {
		restrict: "A", // A = attribute, C = Class name, E = Element, M = HTML Comments
		link: function(scope, element, attributes){
			var originalMessage = scope.message;

			// directives are only place you should be adding this type of DOM manipulation
			element.bind('mouseover', function(){
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind('mouseout',  function(){
				scope.message = originalMessage;
				scope.$apply();
			});
		}

	};
});