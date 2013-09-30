'use strict';

var app = angular.module('angexpApp');

app.controller('homeCtrl', function ($scope) {
  
});

app.controller('aboutCtrl', function ($scope, $http) {
  $scope.getTimelineData = function(){
    $http.get('scripts/timeline.json').success(function(data){
      $scope.timelineData = data.data;
      // console.log($scope.timelineData);
    });
    
  }
});

app.controller('workCtrl', function ($scope) {
	$scope.langGraphLoaded = false;
  $scope.otherGraphLoaded = false;
  $scope.langGraph = function(){
  	$scope.langGraphLoaded = true;
  }
});

app.controller('navCtrl', function ($scope, $location) {
	$scope.changeView = function(view){
    $scope.$apply($location.path(view));
  };
  $scope.$on("$routeChangeSuccess",function(){
    $scope.Init();
  });
  
  $scope.path = 'home';
  $scope.Init = function(){
    console.log("init called!!");
    console.log($location.path());
  	$scope.path = $location.path().substr(1);
  	$scope.path === '' ? $scope.path ='home' : $scope.path;
  };
});

app.controller('asideCtrl', function ($scope) {
  
});