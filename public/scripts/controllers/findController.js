myApp.controller('FindController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.favoriteCount = $scope.dataFactory.numFavorites();

    $scope.getAnimal = function() {

        var animalToGet = $scope.animal;

        var key = '5a2e26b5b782c4616cb60d888f87b5ae';

        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=' + animalToGet;
        query += '&output=basic';
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
            function (response) {
                $scope.animal = response.data.petfinder.pet;
                console.log($scope.animal);
            }
        );
    };

    $scope.addToFavorites = function() {
        // POST request to database

        var description = '';

        if ($scope.animal.description.$t == null) {
            description = null;
        } else if ($scope.animal.description.$t.length > 100) {
            description = $scope.animal.description.$t.slice(0, 100);
        } else {
            description = $scope.animal.description.$t;
        }

        $scope.favoriteCount++;

        var favAnimal = {
            name: $scope.animal.name.$t,
            type: $scope.animal.animal.$t,
            id: $scope.animal.id.$t,
            description: description,
            picture_url: $scope.animal.media.photos.photo[2].$t
        };
        console.log('Sending to server: ', favAnimal);
        $http.post('/data', favAnimal);
    };
}]);