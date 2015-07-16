
angular.module('ngMaterialize.dropdown', [])

  .service('dropdownService', ['$document', '$rootScope', function($document, $rootScope) {
    var openScope = null;

    this.open = function(dropdownScope ) {
      if (!openScope) {
        $document.bind('click', closeDropdown);
        $document.bind('keydown', escapeKeyBind);
      }

      if (openScope && openScope !== dropdownScope) {
        openScope.isOpen = false;
      }

      openScope = dropdownScope;
    };

    this.close = function(dropdownScope) {
      if (openScope === dropdownScope) {
        openScope = null;
        $document.unbind('click', closeDropdown);
        $document.unbind('keydown', escapeKeyBind);
      }
    };

    var closeDropdown = function(evt) {
      // This method may still be called during the same mouse event that
      // unbound this event handler. So check openScope before proceeding.
      if (!openScope) { return; }

      if(evt && openScope.getAutoClose() === 'disabled' )  { return ; }

      var toggleElement = openScope.getToggleElement();
      if (evt && toggleElement && toggleElement[0].contains(evt.target) ) {
        return;
      }

      var $element = openScope.getElement();
      if (evt && openScope.getAutoClose() === 'outsideClick' && $element && $element[0].contains(evt.target) ) {
        return;
      }

      // Also check dropdown menu itself (required for append to body dropdowns)
      var $menuElement = openScope.getMenuElement();
      if (evt && openScope.getAutoClose() === 'outsideClick' && $menuElement && $menuElement[0].contains(evt.target)) {
        return;
      }

      openScope.isOpen = false;

      if (!$rootScope.$$phase) {
        openScope.$apply();
      }
    };

    var escapeKeyBind = function(evt ) {
      if (evt.which === 27) {
        openScope.focusToggleElement();
        closeDropdown();
      }
    };
  }])

  .controller('DropdownController', [
    '$scope',
    '$attrs',
    '$parse',
    'dropdownService',
    '$position',
    '$document',
    '$animate',
    'constant',
    function($scope, $attrs, $parse, dropdownService, $position, $document, $animate, constant) {
      var self = this,
          scope = $scope.$new(), // create a child scope so we are not polluting original one
          getIsOpen,
          setIsOpen = angular.noop,
          toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
          appendToBody = false;

      this.init = function(element) {
        self.$element = element;

        if ($attrs.isOpen) {
          getIsOpen = $parse($attrs.isOpen);
          setIsOpen = getIsOpen.assign;

          $scope.$watch(getIsOpen, function(value) {
            scope.isOpen = !!value;
          });
        }

        appendToBody = angular.isDefined($attrs.dropdownAppendToBody);

        if (appendToBody && self.dropdownMenu ) {
          $document.find('body').append(self.dropdownMenu );
          element.on('$destroy', function handleDestroyEvent() {
            self.dropdownMenu.remove();
          });
        }
      };

      this.toggle = function(open ) {
        scope.isOpen = arguments.length ? !!open : !scope.isOpen;
        return scope.isOpen;
      };

      // Allow other directives to watch status
      this.isOpen = function() {
        return scope.isOpen;
      };

      scope.getToggleElement = function() {
        return self.toggleElement;
      };

      scope.getAutoClose = function() {
        return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
      };

      scope.getElement = function() {
        return self.$element;
      };

      scope.getMenuElement = function() {
        return self.dropdownMenu;
      };

      scope.focusToggleElement = function() {
        if (self.toggleElement ) {
          self.toggleElement[0].focus();
        }
      };

      scope.$watch('isOpen', function(isOpen, wasOpen) {

        var computedCss = {};
        var toggleRect;
        var pos;

        if (self.dropdownMenu) {
          if (isOpen) {
            if (appendToBody) {
              pos = $position.positionElements(self.$element, self.dropdownMenu, 'top-left', true);
              computedCss.top = pos.top + 'px';
              computedCss.left = pos.left + 'px';
            }
            toggleRect = self.toggleElement[0].getBoundingClientRect();
            computedCss['min-width'] = toggleRect.width + 'px';
            self.dropdownMenu.css(computedCss);
            $animate.addClass(self.dropdownMenu[0], 'show');
          } else if (!isOpen) {
            $animate.removeClass(self.dropdownMenu[0], 'show');
          }
        }

        //$animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);

        if (isOpen) {
          scope.focusToggleElement();
          dropdownService.open(scope);
        } else {
          dropdownService.close(scope);
        }

        setIsOpen($scope, isOpen);
        if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
          toggleInvoker($scope, {open: !!isOpen});
        }
      });

      $scope.$on('$locationChangeSuccess', function() {
        scope.isOpen = false;
      });

      $scope.$on('$destroy', function() {
        scope.$destroy();
      });
    }
  ])

  .directive('dropdown', function() {
    return {
      controller: 'DropdownController',
      link: function(scope, element, attrs, dropdownCtrl) {
        dropdownCtrl.init(element);
        element.css({
          position: 'relative'
        });
      }
    };
  })

  .directive('dropdownMenu', function($animate) {
    return {
      restrict: 'AC',
      require: '?^dropdown',
      link: function(scope, element, attrs, dropdownCtrl) {
        if (!dropdownCtrl) {
          return;
        }

        // Add Materialize.css style
        element.addClass('dropdown-content');
        element.css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        dropdownCtrl.dropdownMenu = element;
      }
    };
  })

  .directive('dropdownToggle', function() {
    return {
      require: '?^dropdown',
      link: function(scope, element, attrs, dropdownCtrl) {
        if (!dropdownCtrl) {
          return;
        }

        dropdownCtrl.toggleElement = element;

        var toggleDropdown = function(event) {
          event.preventDefault();

          if (!element.hasClass('disabled') && !attrs.disabled ) {
            scope.$apply(function() {
              dropdownCtrl.toggle();
            });
          }
        };

        element.bind('click', toggleDropdown);

        // WAI-ARIA
        element.attr({'aria-haspopup': true, 'aria-expanded': false});
        scope.$watch(dropdownCtrl.isOpen, function(isOpen ) {
          element.attr('aria-expanded', !!isOpen);
        });

        scope.$on('$destroy', function() {
          element.unbind('click', toggleDropdown);
        });
      }
    };
  });