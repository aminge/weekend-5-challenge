myApp.factory('DataFactory', ['$http', function($http) {

    // PRIVATE

    var favorites = undefined;

    var privateNumFavorites = function() {
        if (favorites == undefined) {
            privateGetData();
        } else {
            return favorites.length;
        }
    };

    var privateGetData = function() {
        var promise = $http.get('/data').then(function(response) {
            favorites = response.data;
            console.log('Async data response:', favorites);
        });
        return promise;
    };

    var privateGetAnimal = function() {

    };

    var privateAddFavorite = function(animal) {
        favorites.push(animal);
        // Does the post request from findController go here too?
    };

    // PUBLIC

    var publicAPI = {
        getData: function() {
            return privateGetData();
        },
        favoritesData: function() {
            return favorites;
        },
        numFavorites: function() {
            return privateNumFavorites();
        },
        addFavorite: function(animal) {
            return privateAddFavorite(animal);
        }
    };

    return publicAPI;
}]);