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
    .directive("addBookOne", function(){
        return {
            restrict: 'E',
            templateUrl: "/public/addBooktemp.html"
        };
    });
    
    $('.searchbooks').click(function(){
       var x = $('#title').val();
       var y = $('#author').val();
       
       console.log(x + " " + y);
    });
    
})();