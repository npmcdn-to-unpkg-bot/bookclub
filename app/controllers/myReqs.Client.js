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
    .directive("reqParts", ["$http", "$compile", "$window", function($http, $compile, $window){
       return {
           restrict: 'E',
           templateUrl: '/public/reqParts.html',
           link: function(scope, elem, attr){
               scope.$on("domain_done", function(something, domainElement, miniscope){
                   domainElement.find('.approve').click(function(){
                       //Check see if changing the scope and compiling changes the view.
                       console.log(scope);
                       console.log(miniscope);
                       var x = scope.requests.findIndex(function(curr){
                           return curr.title == miniscope.req.title;});
                           scope.requests[x].requestedBy.shift();
                        if(scope.requests[x].requestedBy.length > 0){
                            $compile(domainElement)(scope);
                        } else {
                            scope.requests.slice(x, 1);
                            $compile(domainElement)(scope);
                        }
                       //$compile(domainElement)(miniscope);
                   });
               });
           }
       };
    }])
    .directive("onRepeatDone", function() {
    return {
        restriction: 'A',
        link: function($scope, element, attributes ) {
            $scope.$emit(attributes["onRepeatDone"] || "repeat_done", element, $scope);
            }
        };
    });
})();