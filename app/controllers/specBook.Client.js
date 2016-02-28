'use strict';

(function(){
    
    angular.module('oneBook', [])
    .controller('oB', ["$scope", "$http", "$location", '$window', function($scope, $http, $location, $window){
        $http.get('/myid').then(function(result){
            console.log(result.data.myid);
            $scope.myid = Number.parseInt(result.data.myid);
            console.log(typeof $scope.myid);
        });
        $http.get('/booksapi/getbook?t=' + encodeURIComponent($location.absUrl().split('book/')[1])).then(function(result){
            console.log(result);
            $scope.title = result.data.title;
            $scope.authors = result.data.authors;
            $scope.tags = result.data.tags;
            $scope.cover = result.data.cover;
        });
        $http.get('/booksapi/whoownsme?t=' + encodeURIComponent($location.absUrl().split('book/')[1])).then(function(result){
           console.log(result);
           $scope.booksArr = [];
           angular.forEach(result.data.owners, function(curr){
               
               angular.forEach(curr.books, function(currentBook){
                if(currentBook.title==decodeURIComponent($location.absUrl().split('book/')[1])){
                  $scope.booksArr.push({
                    owner: encodeURIComponent(curr._id),
                    ownerName: curr.name,
                    title: currentBook.title,
                    utitle: encodeURIComponent(currentBook.title),
                    onLoan: currentBook.onLoan,
                    requestedBy: currentBook.requestedBy
                  });
                }
               });
           });
           console.log($scope.booksArr);
        });
        
        $scope.makeRequest = function($event){
            $http.get($($event.currentTarget).attr('ng-href')).then(function(result){
                console.log(result);
                if(result.data.success || result.data.err){
                    if(result.data.success){
                        console.log(result.data.success);
                        $($event.currentTarget).parent().html('You have requested this book.');
                    } else {
                        console.log(result.data.err);
                    }
                } else {
                    $window.location.replace('/login');
                }
            });
        }
        
        $scope.finder = function(objArr, id){
            var x = objArr.findIndex(function(curr){return curr.uid == id});
            console.log(x);
            if(x>-1){return true;} else {return false;}
        }
    }])
    .directive("navBar", function(){
        return {
            restrict: "E",
            templateUrl: "/public/navbar.html"
        }
    })
})();