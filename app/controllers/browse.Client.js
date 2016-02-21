'use strict';

(function(){
    
    angular.module("browser", [])
    .controller("brow", ["$scope", "$http", function($scope, $http){
        $scope.mybooks = [];
        $http.get('/booksapi/getall').then(function(uniqueArray){
            console.log(uniqueArray.data);
           if(uniqueArray.data.err){console.log("Error!");}
           uniqueArray.data.forEach(function(curr){
              $http.get('/booksapi/getbook?t=' + curr).then(function(bookobj){
                  console.log(bookobj);
                $scope.mybooks.push({title: curr, authors: bookobj.data.authors, cover: bookobj.data.cover, tags: bookobj.data.tags});
              });
           });
        });
    }])
    .directive("bookGrid", function(){
       return {
           restrict: "E",
           templateUrl: '/public/myBookGal.html'
       } 
    });
    
})();