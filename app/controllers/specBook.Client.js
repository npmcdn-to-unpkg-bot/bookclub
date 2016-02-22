'use strict';

(function(){
    
    angular.module('oneBook', [])
    .controller('oB', ["$scope", "$http", "$location", function($scope, $http, $location){
        $http.get('/booksapi/getbook?t=' + $location.absUrl().split('book/')[1]).then(function(result){
            console.log(result);
            $scope.title = result.data.title;
            $scope.author = result.data.author;
            $scope.tags = result.data.tags;
            $scope.cover = result.data.cover;
            
        });
    }])
    
})();