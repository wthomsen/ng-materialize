'use strict';

/**
 * @ngdoc function
 * @name ngMaterializeDocs.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the ngMaterializeDocs
 */
angular.module('ngMaterializeDocs')
  .controller('AppCtrl', function ($scope, smoothScroll) {
    $scope.directives = [
      {name: 'Accordion', id: 'accordion'},
      {name: 'Dropdown', id: 'dropdown'},
      {name: 'Ink', id: 'ink'},
      {name: 'Tabs', id: 'tabs'},
      {name: 'Text Field', id: 'text-field'},
      {name: 'Tooltip', id: 'tooltip'}
    ];

    $scope.services = [
      {name: 'Modal', id: 'modal'},
      {name: 'Toast', id: 'toast'}
    ];

    $scope.scrollTo = function ($event, id) {
      $event.preventDefault();
      smoothScroll(document.getElementById(id), {offset: 75});
    };

  });
