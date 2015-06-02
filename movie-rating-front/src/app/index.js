(function() {
  'use strict';

  angular.module('movieRating', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'restangular',
    'ui.router',
    'ui.bootstrap'
  ]).config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      })
      .state('demo', {
        url: '/demo',
        templateUrl: 'app/demo/demo.html',
        controller: 'DemoController',
        controllerAs: 'demo'
      });

    $urlRouterProvider.otherwise('/');
  }

}());

