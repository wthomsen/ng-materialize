'use strict';

angular.module('ngMaterialize.character-counter', [])
  .directive('characterCounter', ['$compile', function ($compile) {
    return {
      require: 'ngModel',
      scope: {},
      link: function (scope, element, attrs, ngModel) {
        var maxChars = parseInt(attrs.characterCounter);
        var counter = angular.element('<div class="character-counter"><span ng-bind="charCount()"></span>/' + maxChars + '</div>');

        // Append the counter to the parent element
        element.parent().append($compile(counter)(scope));

        scope.charCount = function () {
          return ngModel.$viewValue ? ngModel.$viewValue.length : 0;
        };

        element.bind('focus', show);
        element.bind('blur', hide);

        scope.$on('$destroy', function () {
          element.unbind('focus', show);
          element.unbind('blur', hide);
        });

        function show() {
          counter.toggleClass('active', true);
        }

        function hide() {
          counter.toggleClass('active', false);
        }
      }
    };
  }]);