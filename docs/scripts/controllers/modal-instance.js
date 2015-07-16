'use strict';

/**
 * @ngdoc function
 * @name ngMaterializeDocs.controller:ModalinstanceCtrl
 * @description
 * # ModalinstanceCtrl
 * Controller of the ngMaterializeDocs
 */
angular.module('ngMaterializeDocs')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.form = {selectedItem: items[0]};

    $scope.select = function (item) {
      $modalInstance.close(item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
