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
                   domainElement.find('.deny').click(function(){
                       //Check see if changing the scope and compiling changes the view.
                       console.log(scope);
                       console.log(miniscope);
                       $http.get($(this).attr('ng-href')).then(function(result){
                           if(result.data.success){console.log("Success"); console.log(result);
                               var x = scope.requests.findIndex(function(curr){
                                   return curr.title == miniscope.req.title;
                               });
                                   scope.requests[x].requestedBy.shift();
                                if(scope.requests[x].requestedBy.length > 0){
                                    console.log("Still logged?");
                                    $compile(domainElement)(scope);
                                } else {
                                    console.log("Sliced?");
                                    scope.requests.splice(x, 1);
                                    console.log(scope.requests);
                                    $compile(elem)(scope);
                                }
                           }
                           else{console.log("Failed"); console.log(result);}
                       });

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