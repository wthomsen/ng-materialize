'use strict';

/**
 * @ngdoc function
 * @name ngMaterializeDocs.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngMaterializeDocs
 */
angular.module('ngMaterializeDocs')
  .controller('MainCtrl', function ($scope, $modal, $toast) {

    var lorem = [
      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',
      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',
      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'
    ];

    $scope.openOne = true;
    $scope.flatAccordionGroups = [
      {
        title: 'First',
        icon: 'subtitles',
        content: lorem[0],
        open: false
      }, {
        title: 'Second',
        icon: 'games',
        content: lorem[1],
        open: false
      }, {
        title: 'Third',
        icon: 'library_books',
        content: lorem[2],
        open: false
      }
    ];

    $scope.popoutAccordionGroups = angular.copy($scope.flatAccordionGroups);

    $scope.tabs = [
      {heading: 'Tab 1', content: lorem[0], disable: false},
      {heading: 'Tab 2', content: lorem[1], disable: false},
      {heading: 'Disabled Tab 3', content: 'This tab is disabled', disable: true},
      {heading: 'Tab 4', content: lorem[2], disable: false}
    ];

    $scope.justifiedTabs = [
      {heading: 'Tab 1', content: lorem[0], disable: false},
      {heading: 'Tab 2', content: lorem[1], disable: false},
      {heading: 'Tab 3', content: lorem[2], disable: false}
    ];

    $scope.onTabSelect = function (tab) {
      $scope.selectedTab = tab;
    };

    var toastCounter = 1;
    $scope.showToast = function (duration, className) {
      $toast.show('This is sample toast ' + toastCounter + '.', duration, className);
      toastCounter++;
    };

    var items = ['item 1', 'item 2', 'item 3'];
    $scope.openModal = function ($event) {
      var modalInstance = $modal.open({
        templateUrl: 'views/partials/modals/example-modal.html',
        anchorElement: $event ? angular.element($event.target) : undefined,
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function () {
            return items;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.modalResult = 'You selected ' + selectedItem;
      }, function () {
        $scope.modalResult = 'You dismissed the modal';
      });
    };

  });
