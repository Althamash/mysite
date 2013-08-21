'use strict';

angular.module('angexpApp', [])
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
        controller: 'homeCtrl'
      })
      .when('/work', {
        templateUrl: 'views/work.html',
        controller: 'homeCtrl'
      })
      .when('/labs', {
        templateUrl: 'views/labs.html',
        controller: 'homeCtrl'
      })
      .when('/connect', {
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
