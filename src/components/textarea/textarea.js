'use strict';

angular.module('ngMaterialize.textarea', [])
  .directive('materializeTextarea', ['$document', '$window', '$timeout', function ($document, $window, $timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {

        var hiddenDiv = angular.element('<div class="hiddendiv"></div>');
        var body = $document.find('body');
        var win = angular.element($window);
        var resizeTimeout;

        body.append(hiddenDiv);
        element.addClass('materialize-textarea');

        win.bind('resize', windowResize);

        // Establish a watch on ng-model
        scope.ngModel = ngModel;
        scope.$watch('ngModel.$viewValue', autoResize);

        scope.$on('$destroy', function () {
          hiddenDiv.remove();
          win.unbind('resize', windowResize);
        });

        function windowResize() {
          $timeout.cancel(resizeTimeout);
          resizeTimeout = $timeout(autoResize, 100);
        }

        function autoResize() {
          var visible = element.css('display') !== 'none';
          var width = visible ? element[0].getBoundingClientRect().width : body.getBoundingClientRect().width / 2;

          // Set hiddenDiv style to match
          hiddenDiv.css({
            'font-size': element.css('font-size'),
            'font-family': element.css('font-family'),
            'overflow-wrap': attrs.wrap === 'off' ? 'normal' : undefined,
            'white-space': attrs.wrap === 'off' ? 'pre' : undefined,
            'width': width + 'px'
          });

          // Append a new line
          hiddenDiv.text(element.val() + '\n');

          // Substitute breaks in for new lines
          hiddenDiv.html(hiddenDiv.html().replace(/\n/g, '<br>'));
          hiddenDiv[0].style.position = 'fixed';
          hiddenDiv[0].style.visibility = 'hidden';

          // Set textarea height based on hidden div
          element.css('height', hiddenDiv[0].offsetHeight + 'px');
        }
      }
    };
  }]);