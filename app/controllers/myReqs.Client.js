'use strict';

(function(){
    angular.module("myReqs", [])
    .controller("mR", ["$scope", "$http", function($scope, $http){
        $http.get('/myReqs').then(function(result){
           console.log(result);
           $scope.requests = result.data.requests;
           $scope.loans = result.data.loans;
        });
    }])
    .directive("reqParts", ["$http", function($http){
       return {
           restrict: 'E',
           templateUrl: '/public/reqParts.html'
       };
    }]);
})();