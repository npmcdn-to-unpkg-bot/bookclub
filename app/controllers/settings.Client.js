'use strict';

(function(){
    
    angular.module('settingsPage', [])
    .controller('sC', ['$scope', '$http', function($scope, $http){
        $http.get('/my').then(function(result){
          $scope.myname = result.data.name; 
          $scope.mypic = result.data.pic;
          $scope.mybooks = result.data.books;
          $scope.mycity = result.data.city;
          $scope.mystate = result.data.state;
          $scope.myid = result.data._id;
        });
    }])
    .directive('settingForm', function(){
       return {
           restrict: 'E',
           templateUrl: '/public/settingForm.html'
       } 
    })
    .directive('profileBox', function(){
        return {
            restrict: 'E',
            templateUrl: 'public/profileBox.html'
        };
    });
    
})();