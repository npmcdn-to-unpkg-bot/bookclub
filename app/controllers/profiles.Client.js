'use strict';

(function(){
    angular.module("profile", [])
    .controller("proInfo", ["$scope", "$http", function($scope, $http){
       $http.get('/my').then(function(result){
          console.log(result);
          $scope.name = result.data.name;
          $scope.pic = result.data.pic;
          $scope.books = result.data.books;
       });
    }])
    .directive("profileBox", function(){
       return {
           restrict: 'E',
           templateUrl: '/public/profileBox.html'
       } 
    })
    .directive("addBookOne", ['$http', function($http){
        return {
            restrict: 'E',
            templateUrl: "/public/addBooktemp.html",
            link: function(scope, elem, attr){
                var stepone = elem.find("#stepone");
                stepone.on('click', function(){
                   //GET
                   var x = elem.find("#title").val();
                   var y = elem.find("#author").val();
                   $http.get('https://www.googleapis.com/books/v1/volumes?q=' + x + '+inauthor:' + y).then(function(result){
                       console.log(result);
                   });
                });
            }
        };
    }]);
    
})();