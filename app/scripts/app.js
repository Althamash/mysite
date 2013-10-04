'use strict';

var app = angular.module('angexpApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'aboutCtrl'
      })
      .when('/work', {
        templateUrl: 'views/work.html',
        controller: 'workCtrl'
      })
      .when('/labs', {
        templateUrl: 'views/labs.html',
        controller: 'labsCtrl'
      })
      .when('/labs/:demo', {
        templateUrl: 'views/labs.html',
        controller: 'labsCtrl',
        action: "labs.demos"
      })
      .when('/connect', {
        action: null,
        templateUrl: 'views/connect.html',
        controller: 'homeCtrl'
      })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'homeCtrl'
      })
      .when('/fonts', {
        templateUrl: 'views/fonts.html',
        controller: 'homeCtrl'
      })
      
      .when('/fb', {
        templateUrl: 'views/tests/fb.html',
        controller: 'homeCtrl'
      })
      .when('/linked', {
        templateUrl: 'views/tests/linked.html',
        controller: 'homeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

/*
--------------------------------
  Controllers
--------------------------------
*/

app.controller('homeCtrl', function ($scope) {
  
});

app.controller('aboutCtrl', function ($scope, $http) {
  $scope.getTimelineData = function(){
    $http.get('scripts/timeline.json').success(function(data){
      $scope.timelineData = data.data;
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
    $scope.path = $location.path().substr(1);
    $scope.path === '' ? $scope.path ='home' : $scope.path;
  };
});

app.controller('asideCtrl', function ($scope) {
  
});

app.controller('labsCtrl', function ($scope, $http, $route, $routeParams) {
  $scope.showDemoList = true;
  $scope.showDemo = false;
  $scope.ifSrc = '';

  var isEmpty = function(obj){
    var hasProp = Object.prototype.hasOwnProperty;
    // null and undefined are empty
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0){
      return false;
    }    
    if (obj.length === 0){
      return true;
    }  
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)){
        return false;
      }    
    }
    // Doesn't handle toString and toValue enumeration bugs in IE < 9
    return true;
  }

  $scope.$on("$routeChangeSuccess",function(){
    if(!isEmpty($routeParams)){
      $scope.showDemoList = false;
      $scope.showDemo = true;
      // console.log($route.current.action);
      // console.log($route.current.action.split( "." ));
      // console.log($routeParams.demo || "");
      $scope.ifSrc = 'views/demos/' + ($routeParams.demo || "") + '.html';
    }
  });
});

/*
--------------------------------
  Directives
--------------------------------
*/

app.directive('navAction', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      element.bind('click', function(){
        scope.selectNav(attrs.navAction);
        scope.changeView(attrs.navAction);
      });
      scope.selectNav = function(view){
        var navLength = element.parent().find('li').length;
        var navArray = [];
        for(var i = 0; i < navLength; i++){
          navArray.push(element.parent().children().eq(i));
        }
        for(var i = 0; i < navLength; i++){
          if(navArray[i].hasClass('active')){
            navArray[i].removeClass('active');
          } else if(navArray[i].hasClass(view)) {
            navArray[i].addClass('active');
          }
        }
      };
    }
  };
});

app.directive('initGraph', function($window){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      angular.element($window).bind('scroll', function(e){
        if(this.pageYOffset > 500){
          scope.otherGraphLoaded = true;
          scope.$apply();
        }
      });
    }
  };
});

app.directive('isLoaded', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      element.bind('load', function(){
        this.style.height = this.contentWindow.document.body.scrollHeight + 'px'
      });
    }
  }
});


