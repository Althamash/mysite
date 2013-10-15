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

app.run(function($rootScope, $window){
  $rootScope.windowWidth = $window.innerWidth;
  $rootScope.mainNav = angular.element(document.getElementById('mainNav'));
  $rootScope.hideShowNav = function(){
    if($rootScope.windowWidth > 880){
      $rootScope.mainNav.removeClass('shrink');
      console.log('shownav');
    } else{
      $rootScope.mainNav.addClass('shrink');
      console.log('hidenav');
    }
  };
  angular.element($window).bind('resize',function(){
    $rootScope.windowWidth = $window.innerWidth;
    $rootScope.$apply('windowWidth');
    $rootScope.hideShowNav();
    // console.log($rootScope.windowWidth);
 });
})

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

app.controller('navCtrl', function ($scope, $location, $rootScope) {
  $scope.changeView = function(view){
    $scope.$apply($location.path(view));
  };
  $scope.$on("$routeChangeSuccess",function(){
    $scope.Init();
  });
  console.log($rootScope);
  $scope.path = 'home';
  $scope.Init = function(){
    $scope.path = $location.path().substr(1).split('/')[0];
    $scope.path === '' ? $scope.path ='home' : $scope.path;
    $rootScope.hideShowNav();
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
        var smallMenu = angular.element(element.parent().parent().find('div')[0]);
        scope.selectNav(attrs.navAction);
        element.addClass('active');
        if(smallMenu.hasClass('shown')){
          smallMenu.removeClass('shown');
        }
        scope.changeView(attrs.navAction);
      });
      scope.selectNav = function(view){
        var navLength = element.parent().find('li').length;
        var navArray = [];
        for(var i = 0; i < navLength; i++){
          navArray.push(element.parent().children().eq(i));
        }
        for(var i = 0; i < navLength; i++){
          navArray[i].removeClass('active');
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

app.directive('showNav', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      element.bind('click', function(){
        if(element.hasClass('shown')){
          console.log(element.parent().find('ul').addClass('shrink'));
          element.removeClass('shown');
        } else{
          console.log(element.parent().find('ul').removeClass('shrink'));
          element.addClass('shown');
        }
      });
    }
  }
});

