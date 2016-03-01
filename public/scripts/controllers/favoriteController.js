myApp.controller('FavoriteController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.favorites = [];

    $scope.favoriteCount = $scope.dataFactory.numFavorites();

    //$http.get('/data').then(function(response) {
    //    $scope.favorites = response.data;
    //    console.log($scope.favorites);
    //});

    if($scope.dataFactory.favoritesData() === undefined) {
        // initial load
        $scope.dataFactory.getData().then(function() {
            $scope.favorites = $scope.dataFactory.favoritesData();
            $scope.favoriteCount = $scope.dataFactory.numFavorites();
        });

    } else {
        $scope.favorites = $scope.dataFactory.favoritesData();
    }
}]);