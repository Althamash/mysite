'use strict';

var app = angular.module('angexpApp');

app.controller('homeCtrl', function ($scope) {
  
});

app.controller('navCtrl', function ($scope, $location) {
	$scope.changeView = function(view){
    $scope.$apply($location.path(view));
  };
  $scope.path = 'home';
  $scope.Init = function(){
  	$scope.path = $location.path().substr(1);
  };
});

app.controller('asideCtrl', function ($scope) {
  
});