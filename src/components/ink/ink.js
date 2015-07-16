'use strict';

angular
  .module('ngMaterialize.ink', [])
  .run(['$window', function ($window) {
    if ($window.Waves) {
      $window.Waves.init({
        duration: 1000
      });
    }
  }])
  .factory('$ink', ['$window', function ($window) {
    return {
      link: function (scope, elem, attrs) {
        if ($window.Waves && (typeof attrs.noInk === 'undefined' || scope.$eval(attrs.noInk) === false)) {
          var computedStyle = window.getComputedStyle(elem[0], null);
          var preservedStyles = {
            display: computedStyle.getPropertyValue('display'),
            cursor: computedStyle.getPropertyValue('cursor')
          };
          var colorClass = 'waves-' + (attrs.inkColor || 'classic');
          $window.Waves.attach(elem[0], colorClass);
          angular.extend(elem[0].style, preservedStyles);
        }
      }
    };
  }])
  .directive('ink', function ($ink) {
    return {
      restrict: 'A',
      link: $ink.link
    };
  })
  .directive('button', function ($ink) {
    return {
      restrict: 'E',
      link: $ink.link
    };
  });