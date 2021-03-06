'use strict';

(function(){
    
    angular.module("profile", [])
    .filter('encodeURIComponent', function() {
    return window.encodeURIComponent;})
    .controller("proInfo", ["$scope", "$http", "$location", function($scope, $http, $location){
        if(isNaN($location.absUrl().split('/')[4])){
            $http.get('/my').then(function(result){
          console.log(result);
          $scope.myname = result.data.name;
          $scope.mypic = result.data.pic;
          $scope.mybooks = result.data.books;
          $scope.mycity = result.data.city;
          $scope.mystate = result.data.state;
          $scope.myid = result.data._id;
       });
        } else {
            $http.get('/th/' + $location.absUrl().split('/')[4]).then(function(result){
               console.log(result);
            $scope.myname = result.data.name;
            $scope.mypic = result.data.pic;
            $scope.mybooks = result.data.books;
            });

        }
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
                       elem.html("<div class='ulcntr'><ul><li class='bkli' ng-repeat='book in books'><a class='bklnks' ng-href='/addbook?title={{book.volumeInfo.title}}&author={{book.volumeInfo.authors | encodeURIComponent}}&tags={{book.volumeInfo.categories | encodeURIComponent}}&cover={{book.volumeInfo.imageLinks.thumbnail | encodeURIComponent}}'><div class='text-center bkinfo' data-toggle='tooltip' title='{{book.volumeInfo.title}}'>{{book.volumeInfo.title}}</div><img class='bkcvr' ng-src={{book.volumeInfo.imageLinks.smallThumbnail}}><div class='bkinfo text-center' data-toggle='tooltip' title='{{book.volumeInfo.authors.join(\", \")}}'>By: <span ng-repeat='author in book.volumeInfo.authors'>{{author}} </span></div></a></li></ul><button id='back'>Back</button></div><script>$('[data-toggle=tooltip]').hover(function(){console.log('hover'); $(this).tooltip('show');}, function(){$(this).tooltip('hide');});</script>");
                       $('#back').click(function(){
                          elem.html('<add-book-one></add-book-one>');
                          console.log("Compiling");
                          $compile(elem.contents())(scope);
                       });
                       
                       $compile(elem.contents())(scope);
                   });
                });
                
            }
        };
    }])
    .directive("myBookGal", function(){
        return {
            restrict: "E",
            templateUrl: "/public/myBookGal.html",
        };
    })
    .directive("theirBookGal", function(){
        return {
            restrict: "E",
            templateUrl: "/public/theirBookGal.html"
        }
    })
    .directive("navBar", function(){
        return {
            restrict: "E",
            templateUrl: "/public/navbar.html"
        }
    })
    
})();