'use strict';

/**
 * @ngdoc overview
 * @name ngMaterializeDocs
 * @description
 * # ngMaterializeDocs
 *
 * Main module of the application.
 */
angular
  .module('ngMaterializeDocs', [
    'ngAnimate',
    'ngMessages',
    'ui.router',
    'smoothScroll',
    'ngMaterialize'
  ]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
    // Match urls regardless of a trailing slash
    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function ($injector) {
      $injector.invoke(['$state', function ($state) {
        $state.go('app.main');
      }]);
    });

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'views/partials/app.html',
        controller: 'AppCtrl'
      })
      .state('app.main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });
