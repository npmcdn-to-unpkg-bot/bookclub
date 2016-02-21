'use strict';

(function(){
    
    angular.module("browser", [])
    .controller("brow", ["$scope", "$http", function($scope, $http){
        $scope.allbooks = [];
        $http.get('/booksapi/getall').then(function(uniqueArray){
            console.log(uniqueArray.data);
           if(uniqueArray.data.err){console.log("Error!");}
           uniqueArray.data.forEach(function(curr){
              $http.get('/booksapi/getbook?t=' + curr).then(function(bookobj){
                $scope.allbooks.push({title: curr, authors: bookobj.authors, cover: bookobj.cover, tags: bookobj.tags});
              });
           });
        });
    }])
    .directive("bookGrid", function(){
       return {
           restrict: "E",
           templateUrl: '/public/bookgrid.html'
       } 
    });
    
})();