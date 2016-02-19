'use strict';

(function(){
    angular.module("profile", [])
    .filter('encodeURIComponent', function() {
    return window.encodeURIComponent;})
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
    .directive("addBookOne", ['$http', '$compile', function($http, $compile){
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
                       scope.books = result.data.items;
                       console.log(scope.books);
                       elem.html("<div class='ulcntr'><ul><li class='bkli' ng-repeat='book in books'><a ng-href='/addbook?title={{book.volumeInfo.title}}&author={{book.volumeInfo.authors | encodeURIComponent}}&tags={{book.volumeInfo.categories | encodeURIComponent}}&cover={{book.volumeInfo.imageLinks.thumbnail | encodeURIComponent}}'><div class='text-center bkinfo'>{{book.volumeInfo.title}}</div><img class='bkcvr' ng-src={{book.volumeInfo.imageLinks.smallThumbnail}}><div class='bkinfo text-center'>By: <span ng-repeat='author in book.volumeInfo.authors'>{{author}} </span></div></a></li></ul></div>");
                       $compile(elem.contents())(scope);
                   });
                });
            }
        };
    }]);
    
})();