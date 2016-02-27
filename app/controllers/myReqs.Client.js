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
                   //Approve button is a copy, but requires the Loans portion to be built.
                   domainElement.find('.approve').click(function(){
                       $http.get($(this).attr('ng-href')).then(function(result){
                           if(result.data.success){console.log("Success"); console.log(result);
                               var x = scope.requests.findIndex(function(curr){
                                   return curr.title == miniscope.req.title;
                               });
                               var temp = scope.requests[x];
                                var nowonloanto = {uname: temp.requestedBy[0].uname, uid: temp.requestedBy[0].uid};
                               temp.requestedBy.shift();
                                scope.requests.splice(x, 1);
                                scope.loans.push({title: temp.title, onLoanTo: nowonloanto, requestedBy: temp.requestedBy})
                                console.log(scope.loans);
                                    $compile(elem)(scope);
                                
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
    })
    .directive("navBar", function(){
        return {
            restrict: "E",
            templateUrl: "/public/navbar.html"
        }
    })
})();