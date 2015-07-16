'use strict';

angular.module('ngMaterialize.floating-label', [])
  .directive('floatingLabel', [function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        var elementId = attrs.id || '';
        var label = angular.element('<label for="' + elementId + '">' + attrs.floatingLabel +'</label>');
        var activeClass = 'active';
        
        element.parent().append(label);
        scope.ngModel = ngModel;
        scope.$watch('ngModel.$viewValue', labelOffIfEmpty);

        element.bind('focus', labelOn);
        element.bind('blur', labelOffIfEmpty);

        scope.$on('$destroy', function () {
          element.unbind('focus', labelOn);
          element.unbind('blur', labelOffIfEmpty);
        });

        function labelOn() {
          console.log('label on? ');
          element.parent().children().toggleClass(activeClass, true);
          label.toggleClass(activeClass, true);
        }

        function labelOffIfEmpty() {
          var toggle = !!ngModel.$viewValue && !!ngModel.$viewValue.length;
          element.parent().children().toggleClass(activeClass, toggle);
          label.toggleClass(activeClass, toggle);
        }
      }
    };
  }]);