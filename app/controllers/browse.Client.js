'use strict';

(function(){
    
    angular.module("browser", [])
    .controller("brow", ["$scope", "$http", function($scope, $http){
        $scope.mybooks = [];
        $http.get('/booksapi/getall').then(function(uniqueArray){
            //console.log(uniqueArray.data);
           if(uniqueArray.data.err){console.log("Error!");}
           uniqueArray.data.forEach(function(curr){
              $http.get('/booksapi/getbook?t=' + encodeURIComponent(curr)).then(function(bookobj){
                  //console.log(bookobj);
                $scope.mybooks.push({title: curr, authors: bookobj.data.authors, cover: bookobj.data.cover, tags: bookobj.data.tags});
              });
           });
        });
        
        if($scope.$last){
            console.log("Last was called in the controller!");
        }
        
        $scope.$watch($scope.mybooks, function(){
            console.log("Watch called");
           if($scope.grid){
                $scope.grid.isotope();    
            console.log("Watched isotope called!");
           } else {
               console.log("grid not found");
           }
        });
        
    }])
    .directive("bookGrid", function(){
       return {
           restrict: "E",
           templateUrl: '/public/allBookGal.html',
           link: function(scope, elem, attr){
           }
       };
    })
    .directive("navBar", function(){
        return {
            restrict: "E",
            templateUrl: "/public/navbar.html"
        };
    })
    .directive("isoHelper", function(){
        return {
            restrict: "A",
            link: function(scope, elem, attr){
                
                //console.log("This is pass : " + scope.$index + " . First? " + scope.$first + " . Middle? " + scope.$middle + " . Last? " + scope.$last);
                //console.log(scope);
                
                if(scope.$first === true){
                    console.log("First is true and scope.grid is initialized.");
                    scope.grid = elem.parent();
                    //console.log(scope.grid);
                    var x = scope.grid.isotope({
                      masonry: {
                          columnWidth: 250
                      },
                      getSortData: {
                        title: '.titles',
                        authors: '.authors',
                        tags: '.tags'
                      },
                      itemSelector: '.grid-item',
                      layoutMode: 'masonry'
                    });
                    
                    setTimeout(function(){
                        console.log("Timeout called!")
                        x.isotope('reloadItems');
                        x.isotope();
                        
                    $('.sbtns').on( 'click', 'button', function() {
                      var sortByValue = $(this).attr('sort-by');
                      x.isotope({ sortBy: sortByValue });
                    })
                    }, 2000)
                }

            }
        }
    })
    
})();