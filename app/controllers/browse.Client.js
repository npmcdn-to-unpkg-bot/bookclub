'use strict';

(function(){
    
    angular.module("browser", [])
    .controller("brow", ["$scope", "$http", function($scope, $http){
        $scope.mybooks = [];
        $http.get('/booksapi/getall').then(function(uniqueArray){
            console.log(uniqueArray.data);
           if(uniqueArray.data.err){console.log("Error!");}
           uniqueArray.data.forEach(function(curr){
              $http.get('/booksapi/getbook?t=' + encodeURIComponent(curr)).then(function(bookobj){
                  console.log(bookobj);
                $scope.mybooks.push({title: curr, authors: bookobj.data.authors, cover: bookobj.data.cover, tags: bookobj.data.tags});
              });
           });
        });
    }])
    .directive("bookGrid", function(){
       return {
           restrict: "E",
           templateUrl: '/public/allBookGal.html',
           linK: function(scope, elem){
               var grid = elem.find('.grid').isotope({
                  getSortData: {
                    title: '.titles',
                    authors: '.authors',
                    tags: '.tags'
                  },
                  itemSelector: '.grid-item',
                  layoutMode: 'masonry'
                });
                
                grid.isotope('reloadItems');
                grid.arrange();
           }
       };
    })
    .directive("navBar", function(){
        return {
            restrict: "E",
            templateUrl: "/public/navbar.html"
        };
    });
    
})();