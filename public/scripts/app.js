var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/find', {
            templateUrl: '/views/templates/find.html',
            controller: 'FindController'
        })
        .when('/favorite', {
            templateUrl: '/views/templates/favorite.html',
            controller: 'FavoriteController'
        })
        .otherwise({
            redirectTo: 'find'
        });
}]);