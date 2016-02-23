'use strict';

(function(){
    
    angular.module('oneBook', [])
    .controller('oB', ["$scope", "$http", "$location", function($scope, $http, $location){
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
                    owner: curr._id,
                    ownerName: curr.name,
                    title: currentBook.title,
                    onLoan: currentBook.onLoan
                  });
                }
               });
           });
           console.log($scope.booksArr);
        });
    }])
    
})();