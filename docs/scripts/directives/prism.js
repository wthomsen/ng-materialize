'use strict';

/**
 * @ngdoc directive
 * @name ngMaterializeDocs.directive:prism
 * @description
 * # prism
 */
angular.module('ngMaterializeDocs')
  .directive('prism', function ($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.ready(function () {
          if ($window.Prism) {
            $window.Prism.highlightElement(element[0]);
          }
        });
      }
    };
  });