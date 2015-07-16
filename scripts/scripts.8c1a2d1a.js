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
    $locationProvider.html5Mode(false);

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
'use strict';
angular.module('ngMaterialize', [
  'ngAnimate',
  'template/tooltip/tooltip-popup.html',
  'template/tooltip/tooltip-template-popup.html',
  'template/accordion/accordion.html',
  'template/accordion/accordion-group.html',
  'ngMaterialize.core',
  'ngMaterialize.toast',
  'ngMaterialize.accordion',
  'ngMaterialize.tooltip',
  'ngMaterialize.floating-label',
  'ngMaterialize.character-counter',
  'ngMaterialize.modal',
  'ngMaterialize.tabs',
  'ngMaterialize.textarea',
  'ngMaterialize.ink',
  'ngMaterialize.dropdown'
]);
'use strict';

angular.module('ngMaterialize.core', [])
  .factory('constant', ['$sniffer', function ($sniffer) {
    var webkit = /webkit/i.test($sniffer.vendorPrefix);
    function vendorProperty(name) {
      return webkit ?  ('webkit' + name.charAt(0).toUpperCase() + name.substring(1)) : name;
    }

    return {
      CSS: {
        /* Constants */
        TRANSITIONEND: 'transitionend' + (webkit ? ' webkitTransitionEnd' : ''),
        ANIMATIONEND: 'animationend' + (webkit ? ' webkitAnimationEnd' : ''),
        TRANSFORM: vendorProperty('transform'),
        TRANSFORM_ORIGIN: vendorProperty('transformOrigin'),
        TRANSITION: vendorProperty('transition'),
        TRANSITION_DURATION: vendorProperty('transitionDuration'),
        ANIMATION_PLAY_STATE: vendorProperty('animationPlayState'),
        ANIMATION_DURATION: vendorProperty('animationDuration'),
        ANIMATION_NAME: vendorProperty('animationName'),
        ANIMATION_TIMING: vendorProperty('animationTimingFunction'),
        ANIMATION_DIRECTION: vendorProperty('animationDirection')
      }
    };
  }])
/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {


    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

      /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl !== $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      },

      /**
       * Provides coordinates for the targetEl in relation to hostEl
       */
      positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

        var hostElPos,
            targetElWidth,
            targetElHeight,
            targetElPos;

        hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

        targetElWidth = targetEl.prop('offsetWidth');
        targetElHeight = targetEl.prop('offsetHeight');

        var shiftWidth = {
          center: function () {
            return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
          },
          left: function () {
            return hostElPos.left;
          },
          right: function () {
            return hostElPos.left + hostElPos.width;
          }
        };

        var shiftHeight = {
          center: function () {
            return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
          },
          top: function () {
            return hostElPos.top;
          },
          bottom: function () {
            return hostElPos.top + hostElPos.height;
          }
        };

        switch (pos0) {
          case 'right':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: shiftWidth[pos0]()
            };
            break;
          case 'left':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: hostElPos.left - targetElWidth
            };
            break;
          case 'bottom':
            targetElPos = {
              top: shiftHeight[pos0](),
              left: shiftWidth[pos1]()
            };
            break;
          default:
            targetElPos = {
              top: hostElPos.top - targetElHeight,
              left: shiftWidth[pos1]()
            };
            break;
        }

        return targetElPos;
      }
    };
  }]);
angular.module('ngMaterialize.accordion', [])

.constant('accordionConfig', {
  closeOthers: true
})

.controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {

  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if ( closeOthers ) {
      angular.forEach(this.groups, function (group) {
        if ( group !== openGroup ) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(index, 1);
    }
  };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('accordion', function () {
  return {
    restrict:'EA',
    controller:'AccordionController',
    transclude: true,
    replace: false,
    templateUrl: 'template/accordion/accordion.html',
    link: function (scope, element, attrs) {
      element.addClass('collapsible');
      if (angular.isDefined(attrs.accordionPopout)) {
        element.addClass('popout');
      }
    }
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', function() {
  return {
    require: '^accordion',         // We need this directive to be inside an accordion
    restrict: 'EA',
    transclude: true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl: 'template/accordion/accordion-group.html',
    scope: {
      heading: '@',               // Interpolate the heading attribute onto this scope
      onSelect: '&select',
      onDeselect: '&deselect',
      isOpen: '=?',
      isDisabled: '=?'
    },
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      accordionCtrl.addGroup(scope);

      scope.$watch('isOpen', function(value) {
        if (value) {
          accordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function() {
        if (!scope.isDisabled) {
          scope.isOpen = !scope.isOpen;
          if (scope.isOpen) {
            scope.onSelect();
          } else {
            scope.onDeselect();
          }
        }
      };
    }
  };
})

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
.directive('accordionHeading', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^accordionGroup',
    link: function(scope, element, attr, accordionGroupCtrl, transclude) {
      // Pass the heading to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
.directive('accordionTransclude', function() {
  return {
    require: '^accordionGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {
        if ( heading ) {
          element.html('');
          element.append(heading);
        }
      });
    }
  };
});

angular.module('template/accordion/accordion-group.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/accordion/accordion-group.html',
    '<li ng-class="{active: isOpen}">\n' +
    '  <div class="collapsible-header pointer" ng-click="toggleOpen()" ink>\n' +
    '      <span accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></span>\n' +
    '  </div>\n' +
    '  <div class="collapsible-body">\n' +
    '    <div ng-transclude></div>\n' +
    '  </div>\n' +
    '</li>\n' +
    '');
}]);

angular.module('template/accordion/accordion.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/accordion/accordion.html',
    '<ul ng-transclude></ul>');
}]);

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

        var startCss = {};
        var endCss = {};
        var toggleRect;
        var pos;

        if (self.dropdownMenu) {
          if (isOpen) {
            if (appendToBody) {
              pos = $position.positionElements(self.$element, self.dropdownMenu, 'top-left', true);
              startCss.top = pos.top + 'px';
              startCss.left = pos.left + 'px';
            }

            toggleRect = self.toggleElement[0].getBoundingClientRect();
            startCss.display = 'block';
            startCss['min-width'] = toggleRect.width + 'px';
            startCss[constant.CSS.TRANSFORM_ORIGIN] = '50% 0';
            startCss[constant.CSS.TRANSFORM] = 'scale(1, 0.5)';
            endCss.opacity = 1;
            endCss[constant.CSS.TRANSFORM] = '';
            self.dropdownMenu.css(startCss);

            $animate.animate(self.dropdownMenu[0], startCss, endCss, 'dropdown-in');

          } else if (!isOpen && wasOpen) {
            startCss[constant.CSS.TRANSFORM_ORIGIN] = '50% 0';
            endCss.opacity = 0;
            endCss[constant.CSS.TRANSFORM] = 'scale(1, 0.5)';
            self.dropdownMenu.css(startCss);
            $animate.animate(self.dropdownMenu[0], startCss, endCss, 'dropdown-in').then(function () {
              self.dropdownMenu.css({display: 'none'});
            });

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
          //display: 'inline-block',
          position: 'relative'
        });
      }
    };
  })

  .directive('dropdownMenu', function() {
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
          left: 0,
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
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.13.0 - 2015-05-02
 * License: MIT
 */
angular.module('ngMaterialize.modal', ['template/modal/backdrop.html', 'template/modal/window.html'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$timeout', '$modalStack', function ($timeout, $modalStack) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope) {
        scope.close = function (evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop !== 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .directive('modalWindow', ['$modalStack', '$q', '$timeout', 'constant', function ($modalStack, $q, $timeout, constant) {
    return {
      restrict: 'EA',
      scope: {
        index: '@',
        anchorElement: '='
      },
      replace: true,
      transclude: true,
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateUrl || 'template/modal/window.html';
      },
      link: function (scope, element, attrs) {

        // This property is only added to the scope for the purpose of detecting when this directive is rendered.
        // We can detect that by using this property in the template associated with this directive and then use
        // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
        scope.$isRendered = true;

        // Deferred object that will be resolved when this modal is render.
        var modalRenderDeferObj = $q.defer();
        // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
        // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
        attrs.$observe('modalRender', function (value) {
          if (value === 'true') {
            modalRenderDeferObj.resolve();
          }
        });

        function transformToAnchorElement(dialogEl, anchorElement) {
          if (anchorElement) {
            var clickRect = anchorElement[0].getBoundingClientRect();
            var dialogRect = dialogEl[0].getBoundingClientRect();

            var scaleX = Math.min(0.5, clickRect.width / dialogRect.width);
            var scaleY = Math.min(0.5, clickRect.height / dialogRect.height);
            var translateX = clickRect.left - dialogRect.left - dialogRect.width / 2 + clickRect.width / 2;
            var translateY = clickRect.top - dialogRect.top - dialogRect.height / 2 + clickRect.height / 2;

            dialogEl.css(constant.CSS.TRANSFORM, 'translate3d(' +
                translateX + 'px,' +
                translateY + 'px,' +
                ' 0) scale(' + scaleX + ',' + scaleY + ')'
            );

          } else {
            dialogEl.css(constant.CSS.TRANSFORM, 'scaleX(0.8) translate3d(0, 20%, 0)');
          }

          dialogEl.css('opacity', 0);
          $timeout(function () {
            dialogEl.css(constant.CSS.TRANSITION, 'all 0.25s ease-in-out');
            dialogEl.css('outline', 0);
            dialogEl.css('opacity', 1);
            dialogEl.css(constant.CSS.TRANSFORM, '');
          });
        }

        modalRenderDeferObj.promise.then(function () {
          // trigger CSS transitions
          transformToAnchorElement(element, scope.anchorElement);

          var inputsWithAutofocus = element[0].querySelectorAll('[autofocus]');
          /**
           * Auto-focusing of a freshly-opened modal element causes any child elements
           * with the autofocus attribute to lose focus. This is an issue on touch
           * based devices which will show and then hide the onscreen keyboard.
           * Attempts to refocus the autofocus element via JavaScript will not reopen
           * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
           * the modal element if the modal does not contain an autofocus element.
           */
          if (inputsWithAutofocus.length) {
            inputsWithAutofocus[0].focus();
          } else {
            element[0].focus();
          }

          // Notify {@link $modalStack} that modal is rendered.
          var modal = $modalStack.getTop();
          if (modal) {
            $modalStack.modalRendered(modal.key);
          }
        });
      }
    };
  }])

  .directive('modalTransclude', function () {
    return {
      link: function($scope, $element, $attrs, controller, $transclude) {
        $transclude($scope.$parent, function(clone) {
          $element.empty();
          $element.append(clone);
        });
      }
    };
  })

  .factory('$modalStack', ['$timeout', '$document', '$compile', '$rootScope', '$$stackedMap', '$q', '$animate', 'constant',
    function ($timeout, $document, $compile, $rootScope, $$stackedMap, $q, $animate, constant) {

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance) {

        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {
          body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
        });
        checkRemoveBackdrop();
      }

      function checkRemoveBackdrop() {
        //remove backdrop if no longer needed
        if (backdropDomEl && backdropIndex() === -1) {
          var backdropScopeRef = backdropScope;
          $animate.leave(backdropDomEl).then(function () {
            backdropScopeRef.$destroy();
          });
          backdropDomEl = undefined;
          backdropScope = undefined;
        }
      }

      function transitionEnd(el) {
        var q = $q.defer();
        el.on(constant.CSS.TRANSITIONEND, finished);
        function finished(ev) {
          if (ev.target === el[0]) {
            el.off(constant.CSS.TRANSITIONEND, finished);
            q.resolve();
          }
        }
        return q.promise;
      }

      function removeAfterAnimate(domEl, scope, done) {

        if (scope.anchorElement) {
          var clickRect = scope.anchorElementRect;
          var dialogRect = domEl[0].getBoundingClientRect();
          var scaleX = Math.min(0.5, clickRect.width / dialogRect.width);
          var scaleY = Math.min(0.5, clickRect.height / dialogRect.height);
          var translateX = clickRect.left - dialogRect.left - dialogRect.width / 2 + clickRect.width / 2;
          var translateY = clickRect.top - dialogRect.top - dialogRect.height / 2 + clickRect.height / 2;
          domEl.css(constant.CSS.TRANSFORM, 'translate3d(' +
              translateX + 'px,' +
              translateY + 'px,' +
              ' 0) scale(' + scaleX + ',' + scaleY + ')'
          );
        } else {
          domEl.css(constant.CSS.TRANSFORM, 'scaleX(0.8) translate3d(0, 20%, 0)');
        }
        domEl.css('opacity', 0);
        transitionEnd(domEl).then(afterAnimating);

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          scope.$destroy();
          if (done) {
            done();
          }
        }
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            evt.preventDefault();
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key, 'escape key press');
            });
          }
        }
      });

      $modalStack.open = function (modalInstance, modal) {

        var modalOpener = $document[0].activeElement;

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          renderDeferred: modal.renderDeferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });

        var body = $document.find('body').eq(0);
        var currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          var angularBackgroundDomEl = angular.element('<div modal-backdrop="modal-backdrop" class="modal-backdrop"></div>');
          backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
          $animate.enter(backdropDomEl, body);
        }

        if (modal.anchorElement) {
          modal.scope.anchorElement = modal.anchorElement;
          modal.scope.anchorElementRect = modal.anchorElement[0].getBoundingClientRect();
        }

        var angularDomEl = angular.element('<div modal-window="modal-window"></div>');
        angularDomEl.attr({
          'template-url': modal.windowTemplateUrl,
          'index': openedWindows.length() - 1,
          'anchor-element': 'anchorElement'
        }).html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        openedWindows.top().value.modalOpener = modalOpener;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
      };

      function broadcastClosing(modalWindow, resultOrReason, closing) {
        return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
      }

      $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow && broadcastClosing(modalWindow, result, true)) {
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance);
          modalWindow.value.modalOpener.focus();
          return true;
        }
        return !modalWindow;
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance);
          modalWindow.value.modalOpener.focus();
          return true;
        }
        return !modalWindow;
      };

      $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal && this.dismiss(topModal.key, reason)) {
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      $modalStack.modalRendered = function (modalInstance) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.renderDeferred.resolve();
        }
      };

      return $modalStack;
    }])

  .provider('$modal', function () {

    var $modalProvider = {
      options: {
        backdrop: true, //can also be false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$templateRequest', '$controller', '$modalStack',
        function ($injector, $rootScope, $q, $templateRequest, $controller, $modalStack) {

          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $modal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();
            var modalRenderDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              rendered: modalRenderDeferred.promise,
              close: function (result) {
                return $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                return $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                if (modalOptions.controllerAs) {
                  modalScope[modalOptions.controllerAs] = ctrlInstance;
                }
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                renderDeferred: modalRenderDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                anchorElement: modalOptions.anchorElement,
                windowTemplateUrl: modalOptions.windowTemplateUrl
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function (reason) {
              modalOpenedDeferred.reject(reason);
            });

            return modalInstance;
          };

          return $modal;
        }]
    };
    return $modalProvider;
  });

angular.module('template/modal/backdrop.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/modal/backdrop.html',
    '<div class="lean-overlay"\n' +
    '	ng-click="close($event)">\n' +
    '></div>\n' +
    '');
}]);

angular.module('template/modal/window.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/modal/window.html',
    '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n' +
    '	style="display: block; opacity: 1; top: 10%;"\n' +
    '	ng-click="close($event)">\n' +
    '<div modal-transclude></div>\n' +
    '</div>\n' +
    '');
}]);

'use strict';

angular.module('ngMaterialize.tabs', ['template/tabs/tabset.html', 'template/tabs/tab.html'])
  .controller('TabsetController', ['$scope', '$timeout', '$animate', '$window', function ($scope, $timeout, $animate, $window) {
    var ctrl = this;
    var tabs = ctrl.tabs = $scope.tabs = [];
    var prevTab;
    var activeTab;
    $scope.reverse = false;

    ctrl.select = function(selectedTab) {
      var prevTabIndex = 0;
      var selectedTabIndex = 0;
      angular.forEach(tabs, function(tab, i) {
        if (tab.active && tab !== selectedTab) {
          prevTab = tab;
          tab.active = false;
          tab.onDeselect();
          prevTabIndex = i;
        }
        if (tab === selectedTab) {
          selectedTabIndex = i;
        }
      });

      $scope.reverse = selectedTabIndex < prevTabIndex;

      selectedTab.onSelect();
      selectedTab.active = true;
      activeTab = selectedTab;
      if (prevTab) {
        updateIndicator(true);
      } else {
        $timeout(updateIndicator);
      }
    };

    ctrl.addTab = function addTab(tab) {
      tabs.push(tab);
      // we can't run the select function on the first tab
      // since that would select it twice
      if (tabs.length === 1 && tab.active !== false) {
        tab.active = true;
      } else if (tab.active) {
        ctrl.select(tab);
      }
      else {
        tab.active = false;
      }
    };

    ctrl.removeTab = function removeTab(tab) {
      var index = tabs.indexOf(tab);
      //Select a new tab if the tab to be removed is selected and not destroyed
      if (tab.active && tabs.length > 1 && !destroyed) {
        //If this is the last tab, select the previous tab. else, the next tab.
        var newActiveIndex = index === tabs.length - 1 ? index - 1 : index + 1;
        ctrl.select(tabs[newActiveIndex]);
      }
      tabs.splice(index, 1);
    };

    function calcIndicatorCss(targetTab) {
      var tabsetWidth = $scope.tabsetElement[0].getBoundingClientRect().width;
      var css = {left: 0, right: tabsetWidth};
      var tabFound = false;
      angular.forEach(tabs, function(tab) {
        var tabWidth = tab.headingTranscludeElement[0].getBoundingClientRect().width;
        if (!tabFound) {
          css.right -= tabWidth;
          if (tab !== targetTab) {
            css.left += tabWidth;
          } else {
            tabFound = true;
          }
        }
      });
      return css;
    }

    function setIndicatorCss(targetTab) {
      var css = calcIndicatorCss(targetTab);
      $scope.indicator.css({
        left: Math.round(css.left) + 'px',
        right: Math.round(css.right) + 'px'
      });
    }

    function updateIndicator(animate) {
      var toCss = calcIndicatorCss(activeTab);
      var fromCss = prevTab ? calcIndicatorCss(prevTab) : toCss;
      var direction = toCss.left > fromCss.left ? 'right' : 'left';
      var transitionClass = 'indicator-' + direction;

      if (!animate || !prevTab || $scope.indicator.hasClass(transitionClass)) {
        $timeout(function () {
          setIndicatorCss(activeTab);
        });
      } else {
        $scope.indicator.toggleClass('indicator-left', direction === 'left');
        $scope.indicator.toggleClass('indicator-right', direction === 'right');
        $timeout(function () {
          setIndicatorCss(activeTab);
        });
      }
    }

    function onResize() {
      $scope.indicator.toggleClass('indicator-left', false);
      $scope.indicator.toggleClass('indicator-right', false);
      $timeout(function () {
        updateIndicator(false);
      });
    }

    var w = angular.element($window);
    w.on('resize', onResize);

    var destroyed;
    $scope.$on('$destroy', function() {
      destroyed = true;
      w.off('resize', onResize);
    });

  }])

  .directive('tabset', function($timeout) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        type: '@'
      },
      controller: 'TabsetController',
      templateUrl: 'template/tabs/tabset.html',
      link: function(scope, element, attrs) {

        scope.stateNav = angular.isDefined(attrs.stateNav) ? scope.$parent.$eval(attrs.stateNav) : false;
        scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
        scope.noContent = angular.isDefined(attrs.noContent) ? scope.$parent.$eval(attrs.noContent) : false;

        scope.tabsetElement = element;
        scope.indicator = angular.element('<div class="indicator"></div>');
        $timeout(function () {
          element.append(scope.indicator);
        });

      }
    };
  })
  .directive('tab', ['$parse', '$log', function($parse, $log) {
    return {
      require: '^tabset',
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/tabs/tab.html',
      transclude: true,
      scope: {
        active: '=?',
        disabled: '=?',
        heading: '@',
        state: '@',
        onSelect: '&select', //This callback is called in contentHeadingTransclude
        //once it inserts the tab's content into the dom
        onDeselect: '&deselect'
      },
      controller: function() {
        //Empty controller so other directives can require being 'under' a tab
      },
      compile: function(elm, attrs, transclude) {
        return function postLink(scope, elm, attrs, tabsetCtrl) {
          scope.$watch('active', function(active) {
            if (active) {
              tabsetCtrl.select(scope);
            }
          });

          scope.state = attrs.state;

          scope.disabled = false;
          if (attrs.disable) {
            scope.$parent.$watch($parse(attrs.disable), function(value) {
              scope.disabled = !! value;
            });
          }

          scope.select = function() {
            if ( !scope.disabled ) {
              scope.active = true;
            }
          };

          scope.reverse = false;

          tabsetCtrl.addTab(scope);
          scope.$on('$destroy', function() {
            tabsetCtrl.removeTab(scope);
          });

          //We need to transclude later, once the content container is ready.
          //when this link happens, we're inside a tab heading.
          scope.$transcludeFn = transclude;
        };
      }
    };
  }])

  .directive('tabHeadingTransclude', [function() {
    return {
      restrict: 'A',
      require: '^tab',
      link: function(scope, elm) {
        scope.headingTranscludeElement = elm;
        scope.$watch('headingElement', function updateHeadingElement(heading) {
          if (heading) {
            elm.html('');
            elm.append(heading);
          }
        });
      }
    };
  }])
  .directive('tabContentTransclude', function() {
    return {
      restrict: 'A',
      require: '^tabset',
      link: function(scope, elm, attrs) {
        var tab = scope.$eval(attrs.tabContentTransclude);

        //Now our tab is ready to be transcluded: both the tab heading area
        //and the tab content area are loaded.  Transclude 'em both.
        tab.$transcludeFn(tab.$parent, function(contents) {
          angular.forEach(contents, function(node) {
            if (isTabHeading(node)) {
              //Let tabHeadingTransclude know.
              tab.headingElement = node;
            } else if (!scope.stateNav) {
              elm.append(node);
            }
          });
        });
      }
    };
    function isTabHeading(node) {
      return node.tagName &&  (
        node.hasAttribute('tab-heading') ||
          node.hasAttribute('data-tab-heading') ||
          node.tagName.toLowerCase() === 'tab-heading' ||
          node.tagName.toLowerCase() === 'data-tab-heading'
        );
    }
  });

angular.module('template/tabs/tab.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/tabs/tab.html',
    '<li class="tab" ng-class="{active: active, disabled: disabled}">\n' +
    '  <a href ng-click="select()" tab-heading-transclude ink>{{heading}}</a>\n' +
    '</li>\n' +
    '');
}]);

angular.module('template/tabs/tabset.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/tabs/tabset.html',
    '<div class="tabs">\n' +
    '  <ul ng-transclude ng-class="{\'tabs-justified\': justified}"></ul>\n' +
    '  <div class="tab-content">\n' +
    '    <div class="tab-pane" \n' +
    '         ng-repeat="tab in tabs" \n' +
    '         ng-show="tab.active && !noContent"\n' +
    '         ng-class="{\'tab-reverse\': reverse}"\n' +
    '         tab-content-transclude="tab">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);

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
angular.module('ngMaterialize.toast', [])
  .factory('$toast', ['$timeout', '$q', '$animate',
    function ($timeout, $q, $animate) {

      var toasts = [];
      
      function createContainer() {
        return angular.element(document.body);
      }
      
      function expireToasts() {
        var promises = [];
        
        // Animate out any existing toasts
        angular.forEach(toasts, function (toast) {
          $timeout.cancel(toast.timeout);
          promises.push($animate.leave(toast.element).then(toast.defer.resolve));
        });
        
        // Reset toasts array
        toasts = [];
        
        return $q.all(promises);
      }
      
      function createToast(message, className) {
        // Create toast
        var toast = angular.element(document.createElement('div'));
        toast.addClass(typeof className !== 'undefined' ? className + ' toast' : 'toast');
        toast.append('<div>' + message + '</div>');
        return toast;
      }
      
      return {
        show: function (message, duration, className) {
          
          // Setup promise
          var q = $q.defer();
          
          expireToasts().then(function () {
            var toast = {
              element: createToast(message, className),
              timeout: $timeout(expireToasts, duration || 2500),
              defer: q
            };
            toasts.push(toast);
            $animate.enter(toast.element, createContainer());
          });
          
          return q.promise;
          
        }
      };
    }
  ]);
'use strict';
angular.module('ngMaterialize.tooltip', ['ngMaterialize.core'])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
    .provider('$tooltip', function () {
      // The default options tooltip and popover.
      var defaultOptions = {
        placement: 'bottom',
        popupDelay: 0,
        useContentExp: false
      };

      // Default hide triggers for each show trigger
      var triggerMap = {
        'mouseenter': {show: ['mouseenter'], hide: ['mouseleave']},
        'click': {show: ['click'], hide: ['click']},
        'focus': {show: ['focus'], hide: ['blur']},
        'clickOff': {show: ['mouseenter'], hide: ['mouseleave', 'click']}
      };

      // The options specified to the provider globally.
      var globalOptions = {};

      this.options = function( value ) {
        angular.extend( globalOptions, value );
      };

      /**
       * This allows you to extend the set of trigger mappings available. E.g.:
       *
       *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
       */
      this.setTriggers = function setTriggers ( triggers ) {
        angular.extend( triggerMap, triggers );
      };

      /**
       * This is a helper function for translating camel-case to snake-case.
       */
      function snake_case(name){
        var regexp = /[A-Z]/g;
        var separator = '-';
        return name.replace(regexp, function(letter, pos) {
          return (pos ? separator : '') + letter.toLowerCase();
        });
      }

      /**
       * Returns the actual instance of the $tooltip service.
       */
      this.$get = [ '$window', '$compile', '$timeout', '$document', '$position', '$interpolate', '$animate', function ( $window, $compile, $timeout, $document, $position, $interpolate, $animate) {
        return function $tooltip ( type, prefix, defaultTriggerShow, options ) {
          options = angular.extend( {}, defaultOptions, globalOptions, options );

          /**
           * Returns an object of show and hide triggers.
           *
           * If a trigger is supplied,
           * it is used to show the tooltip; otherwise, it will use the `trigger`
           * option passed to the `$tooltipProvider.options` method; else it will
           * default to the trigger supplied to this directive factory.
           *
           * The hide trigger is based on the show trigger. If the `trigger` option
           * was passed to the `$tooltipProvider.options` method, it will use the
           * mapped trigger from `triggerMap` or the passed trigger if the map is
           * undefined; otherwise, it uses the `triggerMap` value of the show
           * trigger; else it will just use the show trigger.
           */
          function getTriggers (trigger) {
            return triggerMap[trigger] || triggerMap[options.trigger] || triggerMap[defaultTriggerShow];
          }

          var directiveName = snake_case(type);

          var startSym = $interpolate.startSymbol();
          var endSym = $interpolate.endSymbol();
          var template =
              '<div '+ directiveName +'-popup '+
              'title="'+startSym+'title'+endSym+'" '+
              (options.useContentExp ?
                  'content-exp="contentExp()" ' :
              'content="'+startSym+'content'+endSym+'" ') +
              'is-open="isOpen"'+
              'origin-scope="origScope" '+
              '>'+
              '</div>';

          return {
            restrict: 'EA',
            compile: function (tElem, tAttrs) {
              var tooltipLinker = $compile( template );

              return function link ( scope, element, attrs, tooltipCtrl ) {
                var tooltip;
                var tooltipLinkedScope;
                var transitionTimeout;
                var popupTimeout;
                var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
                var triggers = getTriggers( undefined );
                var hasEnableExp = angular.isDefined(attrs[prefix+'Enable']);
                var ttScope = scope.$new(true);

                var positionTooltip = function () {
                  if (!tooltip) { return; }

                  var ttPosition = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
                  ttPosition.top += 'px';
                  ttPosition.left += 'px';

                  // Now set the calculated positioning.
                  tooltip.css( ttPosition );
                };

                // Set up the correct scope to allow transclusion later
                ttScope.origScope = scope;

                // By default, the tooltip is not open.
                // TODO add ability to start tooltip opened
                ttScope.isOpen = false;

                function toggleTooltipBind () {
                  if ( ! ttScope.isOpen ) {
                    showTooltipBind();
                  } else {
                    hideTooltipBind();
                  }
                }

                // Show the tooltip with delay if specified, otherwise show it immediately
                function showTooltipBind() {
                  if (hasEnableExp && !scope.$eval(attrs[prefix+'Enable'])) {
                    return;
                  }

                  prepareTooltip();

                  if (ttScope.popupDelay) {
                    // Do nothing if the tooltip was already scheduled to pop-up.
                    // This happens if show is triggered multiple times before any hide is triggered.
                    if (!popupTimeout) {
                      popupTimeout = $timeout(show, ttScope.popupDelay, false);
                      popupTimeout.then(function(reposition){reposition();});
                    }
                  } else {
                    show()();
                  }
                }

                function hideTooltipBind () {
                  scope.$apply(function () {
                    hide();
                  });
                }

                // Show the tooltip popup element.
                function show() {

                  popupTimeout = null;

                  // If there is a pending remove transition, we must cancel it, lest the
                  // tooltip be mysteriously removed.
                  if ( transitionTimeout ) {
                    $timeout.cancel( transitionTimeout );
                    transitionTimeout = null;
                  }

                  // Don't show empty tooltips.
                  if ( !(options.useContentExp ? ttScope.contentExp() : ttScope.content) ) {
                    return angular.noop;
                  }

                  createTooltip();

                  // Set the initial positioning.
                  tooltip.css({ top: 0, left: 0, display: 'block' });
                  ttScope.$digest();

                  positionTooltip();

                  // And show the tooltip.
                  ttScope.isOpen = true;
                  ttScope.$apply(); // digest required as $apply is not called

                  // Return positioning function as promise callback for correct
                  // positioning after draw.
                  return positionTooltip;
                }

                // Hide the tooltip popup element.
                function hide() {
                  // First things first: we don't show it anymore.
                  ttScope.isOpen = false;

                  //if tooltip is going to be shown after delay, we must cancel this
                  $timeout.cancel( popupTimeout );
                  popupTimeout = null;

                  // And now we remove it from the DOM.
                  removeTooltip();
                }

                function createTooltip() {
                  // There can only be one tooltip element per directive shown at once.
                  if (tooltip) {
                    removeTooltip();
                  }
                  tooltipLinkedScope = ttScope.$new();
                  tooltip = tooltipLinker(tooltipLinkedScope, function (tooltip) {
                    if (appendToBody) {
                      $animate.enter(tooltip, $document.find('body'));
                    } else {
                      $animate.enter(tooltip, undefined, element);
                    }
                  });

                  tooltipLinkedScope.$watch(function () {
                    $timeout(positionTooltip, 0, false);
                  });

                  if (options.useContentExp) {
                    tooltipLinkedScope.$watch('contentExp()', function (val) {
                      if (!val && ttScope.isOpen ) {
                        hide();
                      }
                    });
                  }
                }

                function removeTooltip() {
                  transitionTimeout = null;
                  if (tooltip) {
                    $animate.leave(tooltip);
                    tooltip = null;
                  }
                  if (tooltipLinkedScope) {
                    tooltipLinkedScope.$destroy();
                    tooltipLinkedScope = null;
                  }
                }

                function prepareTooltip() {
                  prepPlacement();
                  prepPopupDelay();
                }

                ttScope.contentExp = function () {
                  return scope.$eval(attrs[type]);
                };

                /**
                 * Observe the relevant attributes.
                 */
                if (!options.useContentExp) {
                  attrs.$observe( type, function ( val ) {
                    ttScope.content = val;

                    if (!val && ttScope.isOpen ) {
                      hide();
                    }
                  });
                }

                attrs.$observe('disabled', function ( val ) {
                  if (val && ttScope.isOpen ) {
                    hide();
                  }
                });

                attrs.$observe(prefix+'Title', function ( val ) {
                  ttScope.title = val;
                });


                function prepPlacement() {
                  ttScope.placement = options.placement;
                }

                function prepPopupDelay() {
                  var val = attrs[prefix + 'PopupDelay'];
                  var delay = parseInt(val, 10);
                  console.log('delay', delay, attrs, val);
                  ttScope.popupDelay = ! isNaN(delay) ? delay : options.popupDelay;
                }

                var unregisterTriggers = function () {
                  angular.forEach(triggers.show, function (showTrigger) {
                    element.unbind(showTrigger, showTooltipBind);
                  });
                  angular.forEach(triggers.hide, function (hideTrigger) {
                    element.unbind(hideTrigger, hideTooltipBind);
                  });
                };

                function prepTriggers() {
                  var val = attrs[prefix + 'Trigger'];
                  unregisterTriggers();

                  triggers = getTriggers(val);

                  var sharedList = [];
                  angular.forEach(triggers.show, function (showTrigger) {
                    angular.forEach(triggers.hide, function (hideTrigger) {
                      if (showTrigger === hideTrigger) {
                        sharedList.push(showTrigger);
                      }
                    });
                  });

                  angular.forEach(sharedList, function (sharedTrigger) {
                    element.bind(sharedTrigger, toggleTooltipBind);
                  });
                  angular.forEach(triggers.show, function (showTrigger) {
                    if (sharedList.indexOf(showTrigger) === -1) {
                      element.bind(showTrigger, showTooltipBind);
                    }
                  });
                  angular.forEach(triggers.hide, function (hideTrigger) {
                    if (sharedList.indexOf(hideTrigger) === -1) {
                      element.bind(hideTrigger, hideTooltipBind);
                    }
                  });
                }
                prepTriggers();


                var appendToBodyVal = scope.$eval(attrs[prefix + 'AppendToBody']);
                appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

                // if a tooltip is attached to <body> we need to remove it on
                // location change as its parent scope will probably not be destroyed
                // by the change.
                if ( appendToBody ) {
                  scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess () {
                    if ( ttScope.isOpen ) {
                      hide();
                    }
                  });
                }

                // Make sure tooltip is destroyed and removed.
                scope.$on('$destroy', function onDestroyTooltip() {
                  $timeout.cancel( transitionTimeout );
                  $timeout.cancel( popupTimeout );
                  unregisterTriggers();
                  removeTooltip();
                  ttScope = null;
                });
              };
            }
          };
        };
      }];
    })

// This is mostly ngInclude code but with a custom scope
    .directive( 'tooltipTemplateTransclude', [
      '$animate', '$sce', '$compile', '$templateRequest',
      function ($animate, $sce, $compile, $templateRequest) {
        return {
          link: function ( scope, elem, attrs ) {
            var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

            var changeCounter = 0,
                currentScope,
                previousElement,
                currentElement;

            var cleanupLastIncludeContent = function() {
              if (previousElement) {
                previousElement.remove();
                previousElement = null;
              }
              if (currentScope) {
                currentScope.$destroy();
                currentScope = null;
              }
              if (currentElement) {
                $animate.leave(currentElement).then(function() {
                  previousElement = null;
                });
                previousElement = currentElement;
                currentElement = null;
              }
            };

            scope.$watch($sce.parseAsResourceUrl(attrs.tooltipTemplateTransclude), function (src) {
              var thisChangeId = ++changeCounter;

              if (src) {
                //set the 2nd param to true to ignore the template request error so that the inner
                //contents and scope can be cleaned up.
                $templateRequest(src, true).then(function(response) {
                  if (thisChangeId !== changeCounter) { return; }
                  var newScope = origScope.$new();
                  var template = response;

                  var clone = $compile(template)(newScope, function(clone) {
                    cleanupLastIncludeContent();
                    $animate.enter(clone, elem);
                  });

                  currentScope = newScope;
                  currentElement = clone;

                  currentScope.$emit('$includeContentLoaded', src);
                }, function() {
                  if (thisChangeId === changeCounter) {
                    cleanupLastIncludeContent();
                    scope.$emit('$includeContentError', src);
                  }
                });
                scope.$emit('$includeContentRequested', src);
              } else {
                cleanupLastIncludeContent();
              }
            });

            scope.$on('$destroy', cleanupLastIncludeContent);
          }
        };
      }
    ])

/**
 * Note that it's intentional that these classes are *not* applied through $animate.
 * They must not be animated as they're expected to be present on the tooltip on
 * initialization.
 */


    .directive('tooltipPopup', function () {
      return {
        restrict: 'EA',
        replace: true,
        scope: { content: '@', isOpen: '&' },
        templateUrl: 'template/tooltip/tooltip-popup.html'
      };
    })

    .directive('tooltip', ['$tooltip', function ($tooltip) {
      return $tooltip('tooltip', 'tooltip', 'mouseenter');
    }])

    .directive('tooltipTemplatePopup', function () {
      return {
        restrict: 'EA',
        replace: true,
        scope: { contentExp: '&', isOpen: '&',
          originScope: '&' },
        templateUrl: 'template/tooltip/tooltip-template-popup.html'
      };
    })

    .directive('tooltipTemplate', ['$tooltip', function ( $tooltip ) {
      return $tooltip('tooltipTemplate', '', 'mouseenter', {
        useContentExp: true
      });
    }]);


angular.module('template/tooltip/tooltip-popup.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/tooltip/tooltip-popup.html',
      '<div class="tooltip"\n' +
      '  ng-class="{ in: isOpen() }">\n' +
      '  <div class="tooltip-inner" ng-bind="content"></div>\n' +
      '</div>\n' +
      '');
}]);

angular.module('template/tooltip/tooltip-template-popup.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/tooltip/tooltip-template-popup.html',
      '<div class="tooltip"\n' +
      '  ng-class="{ in: isOpen() }">\n' +
      '  <div class="tooltip-inner"\n' +
      '    tooltip-template-transclude="contentExp()"\n' +
      '    tooltip-template-transclude-scope="originScope()"></div>\n' +
      '</div>\n' +
      '');
}]);angular.module('ngMaterializeDocs').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col s12\">\n" +
    "      <h2 id=\"about\" class=\"header\">About</h2>\n" +
    "      <p class=\"caption\">\n" +
    "        <strong>ng-materialize</strong> is a custom build of the <a href=\"http://materializecss.com/\">Materialize</a> framework that includes native AngularJS components.\n" +
    "        The directives favor simplicity over customization, and aim to adhere to a strict interpretation of Google's <a href=\"https://www.google.com/design/spec/material-design/introduction.html\">Material Design.</a>\n" +
    "        The project removes Materialize's jQuery, Velocity.js and custom JavaScript dependencies, but requires <a href=\"https://docs.angularjs.org/api/ngAnimate\">ngAnimate</a> and <a href=\"http://fian.my.id/Waves/\">Waves</a> (one of Materialize's hidden dependencies).\n" +
    "      </p>\n" +
    "      <p>\n" +
    "        ng-materialize was initially developed alongside a separate project, with directives added on an as-needed basis.\n" +
    "        It is a work in progress.\n" +
    "        It borrows heavily from UI Bootstrap but also uses snippets from Angular Material and Materialize's custom JavaScript.\n" +
    "        A huge thanks goes out to these projects' contributors.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col s12\">\n" +
    "      <h2 id=\"getting-started\" class=\"header\">Getting Started</h2>\n" +
    "      <pre class=\"language-markup\"><code>bower install ng-materialize</code></pre>\n" +
    "      <ul class=\"bulleted\">\n" +
    "        <li>ng-materialize is a custom build of Materialize. Do not include the original library</li>\n" +
    "        <li>The Roboto and Material Icons font families are imported from <a href=\"https://www.google.com/fonts\">Google Fonts</a> in the css</li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <div class=\"col s12\">\n" +
    "      <h2 id=\"directives\" class=\"header\">Directives</h2>\n" +
    "      <h3 id=\"accordion\">Accordion</h3>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <h4>Default</h4>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <p>\n" +
    "                  <input id=\"open-one\" type=\"checkbox\" ng-model=\"openOne\"/>\n" +
    "                  <label for=\"open-one\">Open only one at a time</label>\n" +
    "                </p>\n" +
    "                <accordion close-others=\"openOne\">\n" +
    "                  <accordion-group ng-repeat=\"accordionGroup in flatAccordionGroups\">\n" +
    "                    <accordion-heading><i ng-bind=\"accordionGroup.icon\" class=\"material-icons\"></i><span ng-bind=\"accordionGroup.title\"></span></accordion-heading>\n" +
    "                    <p ng-bind=\"accordionGroup.content\"></p>\n" +
    "                  </accordion-group>\n" +
    "                </accordion>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;p&gt;\n" +
    "  &lt;input type=&quot;checkbox&quot; id=&quot;open-one&quot; ng-model=&quot;openOne&quot;/&gt;\n" +
    "  &lt;label for=&quot;open-one&quot;&gt;Open only one at a time&lt;/label&gt;\n" +
    "&lt;/p&gt;\n" +
    "&lt;accordion close-others=&quot;openOne&quot;&gt;\n" +
    "  &lt;accordion-group ng-repeat=&quot;accordionGroup in accordionGroups&quot;&gt;\n" +
    "    &lt;accordion-heading&gt;\n" +
    "      &lt;i class=&quot;material-icons&quot;&gt;{{accordionGroup.icon}}&lt;/i&gt;\n" +
    "      {{accordionGroup.title}}\n" +
    "    &lt;/accordion-heading&gt;\n" +
    "    &lt;p&gt;{{accordionGroup.content}}&lt;/p&gt;\n" +
    "  &lt;/accordion-group&gt;\n" +
    "&lt;/accordion&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('AccordionDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.openOne = true;\n" +
    "    $scope.accordionGroups = [\n" +
    "      {\n" +
    "        title: 'First',\n" +
    "        icon: 'subtitles',\n" +
    "        content: lorem[0]\n" +
    "      }, {\n" +
    "        title: 'Second',\n" +
    "        icon: 'games',\n" +
    "        content: lorem[1]\n" +
    "      }, {\n" +
    "        title: 'Third',\n" +
    "        icon: 'library_books',\n" +
    "        content: lorem[2]\n" +
    "      }\n" +
    "    ];\n" +
    "  });</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <h4>Popout</h4>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <div class=\"row\">\n" +
    "                  <div ng-repeat=\"accordionGroup in popoutAccordionGroups\" class=\"col s12 m4\">\n" +
    "                    <input type=\"checkbox\" ng-model=\"accordionGroup.open\" id=\"{{accordionGroup.title}}\"/>\n" +
    "                    <label for=\"{{accordionGroup.title}}\" ng-bind=\"accordionGroup.title\"></label>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <accordion accordion-popout=\"accordion-popout\" close-others=\"false\">\n" +
    "                  <accordion-group ng-repeat=\"accordionGroup in popoutAccordionGroups\" is-open=\"accordionGroup.open\">\n" +
    "                    <accordion-heading><i ng-bind=\"accordionGroup.icon\" class=\"material-icons\"></i><span ng-bind=\"accordionGroup.title\"></span></accordion-heading>\n" +
    "                    <p ng-bind=\"accordionGroup.content\"></p>\n" +
    "                  </accordion-group>\n" +
    "                </accordion>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;row&quot;&gt;\n" +
    "  &lt;div class=&quot;col s12 m4&quot; ng-repeat=&quot;accordionGroup in accordionGroups&quot;&gt;\n" +
    "    &lt;input type=&quot;checkbox&quot; id=&quot;{{accordionGroup.title}}&quot; ng-model=&quot;accordionGroup.open&quot;/&gt;\n" +
    "    &lt;label for=&quot;{{accordionGroup.title}}&quot;&gt;{{accordionGroup.title}}&lt;/label&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;accordion accordion-popout, close-others=&quot;false&quot;&gt;\n" +
    "  &lt;accordion-group ng-repeat=&quot;accordionGroup in accordionGroups&quot; is-open=&quot;accordionGroup.open&quot;&gt;\n" +
    "    &lt;accordion-heading&gt;\n" +
    "      &lt;i class=&quot;material-icons&quot;&gt;{{accordionGroup.icon}}&lt;/i&gt;\n" +
    "      {{accordionGroup.title}}\n" +
    "    &lt;/accordion-heading&gt;\n" +
    "    &lt;p&gt;{{accordionGroup.content}}&lt;/p&gt;\n" +
    "  &lt;/accordion-group&gt;\n" +
    "&lt;/accordion&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('AccordionDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.accordionGroups = [\n" +
    "      {\n" +
    "        title: 'First',\n" +
    "        icon: 'subtitles',\n" +
    "        content: lorem[0],\n" +
    "        open: false\n" +
    "      }, {\n" +
    "        title: 'Second',\n" +
    "        icon: 'games',\n" +
    "        content: lorem[1],\n" +
    "        open: false\n" +
    "      }, {\n" +
    "        title: 'Third',\n" +
    "        icon: 'library_books',\n" +
    "        content: lorem[2],\n" +
    "        open: false\n" +
    "      }\n" +
    "    ];\n" +
    "  });\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;accordion&gt;</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=true {boolean} (bound)</div><code>close-others</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>accordion-popout</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;accordion-group&gt;</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean} (bound)</div><code>is-open</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <h3 id=\"dropdown\">Dropdown</h3><a href=\"http://www.google.com/design/spec/components/menus.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/menus.html\">Menus allow users to take an action by selecting from a list of choices revealed upon opening a temporary, new sheet of material.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <div style=\"min-height: 200px;\">\n" +
    "                  <div dropdown=\"dropdown\">\n" +
    "                    <button type=\"button\" dropdown-toggle=\"dropdown-toggle\" class=\"btn btn-default\">Default Dropdown</button>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                      <li><a href=\"href\">One</a></li>\n" +
    "                      <li><a href=\"href\">Two</a></li>\n" +
    "                      <li class=\"divider\"></li>\n" +
    "                      <li><a href=\"href\">Three</a></li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div dropdown&gt;\n" +
    "  &lt;button type=&quot;button&quot; dropdown-toggle class=&quot;btn btn-default&quot;&gt;Default Dropdown&lt;/button&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;ul class=&quot;dropdown-menu&quot;&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;One&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Two&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Three&lt;/a&gt;&lt;/li&gt;\n" +
    "&lt;/ul&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular.module('ng-materialize.demo');</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <div style=\"min-height: 200px;\">\n" +
    "                  <div dropdown=\"dropdown\" auto-close=\"outsideClick\" style=\"display: inline-block;\">\n" +
    "                    <button type=\"button\" dropdown-toggle=\"dropdown-toggle\" class=\"btn btn-default\">Outside Click to Close</button>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                      <li><a>One</a></li>\n" +
    "                      <li><a>Two</a></li>\n" +
    "                      <li class=\"divider\"></li>\n" +
    "                      <li><a>Three</a></li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div dropdown auto-close=&quot;outsideClick&quot; class=&quot;dropdown-wrap&quot;&gt;\n" +
    "  &lt;button type=&quot;button&quot; dropdown-toggle class=&quot;btn btn-default&quot;&gt;Outside Click to Close&lt;/button&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;ul class=&quot;dropdown-menu&quot;&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;One&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Two&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Three&lt;/a&gt;&lt;/li&gt;\n" +
    "&lt;/ul&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular.module('ng-materialize.demo');</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>CSS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-css\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-css\">.dropdown-wrap {display: inline-block;}\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">dropdown</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=always | outsideClick | disabled {string}</div><code>auto-close</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>dropdown-append-to-body</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean} (bound)</div><code>is-open</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">dropdown-toggle</code></li>\n" +
    "      </ul>\n" +
    "      <h3 id=\"ink\">Ink</h3><a href=\"http://www.google.com/design/spec/animation/responsive-interaction.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/animation/responsive-interaction.html\">Responsive interaction encourages deeper exploration of an app by creating timely, logical, and delightful screen reactions to user input. Each interaction is thoughtful, perhaps whimsical, but never distracting.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <p>Use the <code>ink-color</code> option to change the ink effect's color:</p>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <div class=\"collection\">\n" +
    "                  <a class=\"collection-item\" href ink>Default Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"light\">Light Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"green\">Green Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"orange\">Orange Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"purple\">Purple Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"red\">Red Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"teal\">Teal Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"yellow\">Yellow Ink</a>\n" +
    "                </div>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;collection&quot;&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink&gt;Default Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;light&quot;&gt;Light Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;red&quot;&gt;Red Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;yellow&quot;&gt;Yellow Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;orange&quot;&gt;Orange Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;purple&quot;&gt;Purple Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;green&quot;&gt;Green Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;teal&quot;&gt;Teal Ink&lt;/a&gt;\n" +
    "&lt;/div&gt;\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <p>ng-materialize includes the ink effect by default on these components:</p>\n" +
    "          <ul class=\"bulleted\">\n" +
    "            <li><code>&lt;button&gt;</code></li>\n" +
    "            <li><code>&lt;accordion-heading&gt;</code></li>\n" +
    "            <li><code>&lt;tab-heading&gt;</code></li>\n" +
    "          </ul>\n" +
    "          <p>Use the <code>no-ink</code> option to disable the effect on buttons:</p>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <button type=\"button\" class=\"btn btn-default\">Button</button>\n" +
    "                <button type=\"button\" no-ink=\"no-ink\" class=\"btn btn-default\">No Ink</button>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;Button&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; no-ink=&quot;true&quot;&gt;No Ink&lt;/button&gt;\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">ink</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=classic | light | red | yellow | orange | purple | green | teal {string}</div><code>ink-color</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>no-ink</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <p>\n" +
    "        Note: To provide Material Design's ripple effect, Materialize wraps the <a href=\"http://fian.my.id/Waves/\">Waves project</a> into its JavaScript.\n" +
    "        ng-materialize unbundles the project and includes it as a dependency. It is required to use the ink directive.\n" +
    "      </p>\n" +
    "      <h3 id=\"tabs\">Tabs</h3><a href=\"http://www.google.com/design/spec/components/tabs.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/tabs.html\">Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l7\">\n" +
    "          <h4>Default (with content)</h4>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <tabset>\n" +
    "                  <tab ng-repeat=\"tab in tabs\" active=\"tab.activeInline\" disable=\"tab.disable\">\n" +
    "                    <tab-heading>{{tab.heading}}</tab-heading>\n" +
    "                    <p>{{tab.content}}</p>\n" +
    "                  </tab>\n" +
    "                </tabset>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;tabset&gt;\n" +
    "  &lt;tab ng-repeat=&quot;tab in tabs&quot; active=&quot;tab.active&quot; disable=&quot;tab.disable&quot;&gt;\n" +
    "    &lt;tab-heading&gt;{{tab.heading}}&lt;/tab-heading&gt;\n" +
    "    &lt;p&gt;{{tab.content}}&lt;/p&gt;\n" +
    "  &lt;/tab&gt;\n" +
    "&lt;/tabset&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('TabsDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.tabs = [\n" +
    "      {heading: 'Tab 1', content: lorem[0], disable: false},\n" +
    "      {heading: 'Tab 2', content: lorem[1], disable: false},\n" +
    "      {heading: 'Disabled Tab 3', content: 'This tab is disabled', disable: true},\n" +
    "      {heading: 'Tab 4', content: lorem[2], disable: false}\n" +
    "    ];\n" +
    "  });\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l5\">\n" +
    "          <h4>Justified (no content)</h4>\n" +
    "          <p>\n" +
    "            Tab headers can act independently of tab content.\n" +
    "            Use the <code>no-content</code> option along with <code>active</code> or <code>select()</code> to assist in content display.\n" +
    "          </p>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <tabset justified=\"true\" no-content=\"true\">\n" +
    "                  <tab ng-repeat=\"tab in justifiedTabs\">\n" +
    "                    <tab-heading>{{tab.heading}}</tab-heading>\n" +
    "                  </tab>\n" +
    "                </tabset>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;tabset justified=&quot;true&quot; no-content=&quot;true&quot;&gt;\n" +
    "  &lt;tab ng-repeat=&quot;tab in tabs&quot;&gt;\n" +
    "    &lt;tab-heading&gt;{{tab}}&lt;/tab-heading&gt;\n" +
    "  &lt;/tab&gt;\n" +
    "&lt;/tabset&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('TabsDemoCtrl', function ($scope) {\n" +
    "    $scope.tabs = ['Tab 1', 'Tab 2', 'Tab 3'];\n" +
    "  });</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tabset&gt;</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>justified</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>no-content</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tab&gt;</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean} (bound)</div><code>active</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean} (bound)</div><code>disable</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{func}</div><code>select()</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{func}</div><code>deselect()</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tab-heading&gt;</code></li>\n" +
    "      </ul>\n" +
    "      <h3 id=\"text-field\">Text Field</h3><a href=\"http://www.google.com/design/spec/components/text-fields.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/text-fields.html\">Text fields allow the user to input text. They can be single-line, with or without scrolling, or multi-line, and can have an icon.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <form name=\"exampleForm\" novalidate=\"novalidate\">\n" +
    "                  <div class=\"input-field\">\n" +
    "                    <input id=\"example1\" type=\"text\" name=\"example1\" ng-model=\"textFields.example1\" floating-label=\"Counter &amp; Validation\" character-counter=\"10\" ng-maxlength=\"10\" ng-required=\"true\" class=\"validate\"/>\n" +
    "                    <div ng-messages=\"exampleForm.example1.$error\" ng-show=\"exampleForm.example1.$dirty\" class=\"field-hint\">\n" +
    "                      <div ng-message=\"required\">This is required.</div>\n" +
    "                      <div ng-message=\"maxlength\">This field may not exceed 10 characters.</div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"input-field\">\n" +
    "                    <textarea id=\"example2\" materialize-textarea=\"true\" floating-label=\"Expanding Textarea\" ng-model=\"textfields.example2\"></textarea>\n" +
    "                  </div>\n" +
    "                </form>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;form name=&quot;exampleForm&quot; novalidate&gt;\n" +
    "  &lt;div class=&quot;input-field&quot;&gt;\n" +
    "    &lt;input\n" +
    "      type=&quot;text&quot;\n" +
    "      class=&quot;validate&quot;\n" +
    "      id=&quot;example1&quot;\n" +
    "      name=&quot;example1&quot;\n" +
    "      ng-model=&quot;inputs.example1&quot;\n" +
    "      floating-label=&quot;Counter and Validation&quot;\n" +
    "      character-counter=&quot;10&quot;\n" +
    "      ng-maxlength=&quot;10&quot;\n" +
    "      ng-required=&quot;true&quot;/&gt;\n" +
    "    &lt;div class=&quot;field-hint&quot; ng-messages=&quot;exampleForm.example1.$error&quot; ng-show=&quot;exampleForm.example1.$dirty&quot;&gt;\n" +
    "      &lt;div ng-message=&quot;required&quot;&gt;This is required.&lt;/div&gt;\n" +
    "      &lt;div ng-message=&quot;maxlength&quot;&gt;This field may not exceed 10 characters.&lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;input-field&quot;&gt;\n" +
    "    &lt;textarea\n" +
    "      id=&quot;example2&quot;\n" +
    "      materialize-textarea=&quot;true&quot;\n" +
    "      floating-label=&quot;Expanding Textarea&quot;\n" +
    "      ng-model=&quot;form.example2&gt;\n" +
    "    &lt;/textarea&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/form&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('InputDemoCtrl', function ($scope) {\n" +
    "    $scope.form = {\n" +
    "      example1: null,\n" +
    "      example2: null\n" +
    "    };\n" +
    "  });</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <p>ng-materialize uses directives and CSS classes to stylize text fields:</p>\n" +
    "          <ul class=\"bulleted\">\n" +
    "            <li>\n" +
    "              <p>Use the <code>floating-label</code> directive to add labels to inputs and textareas (The element must also declare the <code>id</code> attribute).</p>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <p>Use the <code>character-counter</code> directive to add a character hint to inputs and textareas.</p>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <p>\n" +
    "                Add the <code>validate</code> class to inputs/textareas for success and error state styling when using <a href=\"https://docs.angularjs.org/api/ng/directive/input\">Angular.JS input validation</a>.\n" +
    "                Include the <code>ignore-success</code> class to exclude success state styling.\n" +
    "              </p>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <p>Wrap error state messages in a div with the <code>field-hint</code> class. Optionally use <a href=\"https://docs.angularjs.org/api/ngMessages/directive/ngMessages\">ngMessages</a> to streamline the process.</p>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <p>Use the <code>materialize-textarea</code> directive on a <code>textarea</code> to make the field resize itself based on its contents.</p>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">floating-label</code>\n" +
    "          <div class=\"right\">{string}</div>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">character-counter</code>\n" +
    "          <div class=\"right\">{int}</div>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">materialize-textarea</code>\n" +
    "          <div class=\"right\">{boolean}</div>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <h3 id=\"tooltip\">Tooltip</h3><a href=\"http://www.google.com/design/spec/components/tooltips.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/tooltips.html\">Tooltips are labels that appear on hover and focus when the user hovers over an element with the cursor, focuses on an element using a keyboard (usually through the tab key), or upon touch (without releasing) in a touch UI. They contain textual identification for the element in question. They may also contain brief helper text regarding the function of the element.</blockquote></a>\n" +
    "      <div class=\"card\">\n" +
    "        <tabset>\n" +
    "          <tab>\n" +
    "            <tab-heading>Demo</tab-heading>\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col s12 l3\">\n" +
    "                <p>\n" +
    "                  <button type=\"button\" tooltip=\"helpful message\" class=\"btn btn-default\">Default</button>\n" +
    "                </p>\n" +
    "              </div>\n" +
    "              <div class=\"col s12 l3\">\n" +
    "                <p>\n" +
    "                  <button type=\"button\" tooltip=\"finally\" tooltip-popup-delay=\"500\" class=\"btn btn-default\">Delay</button>\n" +
    "                </p>\n" +
    "              </div>\n" +
    "              <div class=\"col s12 l3\">\n" +
    "                <p>\n" +
    "                  <button type=\"button\" tooltip=\"mouseleave or click\" tooltip-trigger=\"clickOff\" class=\"btn btn-default\">Click Off</button>\n" +
    "                </p>\n" +
    "              </div>\n" +
    "              <div class=\"col s12 l3\">\n" +
    "                <p>Append To Body?</p>\n" +
    "                <div class=\"card\">\n" +
    "                  <div class=\"card-content\">\n" +
    "                    <button type=\"button\" tooltip=\"over\" tooltip-append-to-body=\"true\" class=\"btn btn-default\">True</button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"card\">\n" +
    "                  <div class=\"card-content\">\n" +
    "                    <button type=\"button\" tooltip=\"under\" class=\"btn btn-default\">False</button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </tab>\n" +
    "          <tab>\n" +
    "            <tab-heading>HTML</tab-heading>\n" +
    "            <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;row&quot;&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;helpful message&quot;&gt;Default&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;finally&quot; tooltip-popup-delay=&quot;500&quot;&gt;Delay&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;mouseleave or click&quot; tooltip-trigger=&quot;clickOff&quot;&gt;Click Off&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;p&gt;Append To Body?&lt;/p&gt;\n" +
    "    &lt;div class=&quot;card&quot;&gt;\n" +
    "      &lt;div class=&quot;card-content&quot;&gt;\n" +
    "        &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;over&quot; tooltip-append-to-body=&quot;true&quot;&gt;True&lt;/button&gt;\n" +
    "      &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "    &lt;div class=&quot;card&quot;&gt;\n" +
    "      &lt;div class=&quot;card-content&quot;&gt;\n" +
    "        &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;under&quot;&gt;False&lt;/button&gt;\n" +
    "      &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/div&gt;</code></pre>\n" +
    "          </tab>\n" +
    "        </tabset>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">tooltip</code>\n" +
    "          <div class=\"right\">{string}</div>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>tooltip-append-to-body</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=0 {int} (ms)</div><code>tooltip-popup-delay</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=mouseenter | focus | click | clickOff {string}</div><code>tooltip-trigger</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <h2 id=\"services\" class=\"header\">Services</h2>\n" +
    "      <h3 id=\"modal\">Modal</h3><a href=\"http://www.google.com/design/spec/components/dialogs.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/dialogs.html\">Dialogs inform users about critical information, require users to make decisions, or encapsulate multiple tasks within a discrete process. Use dialogs sparingly because they are interruptive in nature.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <button ng-click=\"openModal()\" class=\"btn btn-default\">Default Modal</button>\n" +
    "                <button ng-click=\"openModal($event)\" class=\"btn btn-default\">Anchored Modal</button>\n" +
    "                <p>{{modalResult}}</p>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; ng-click=&quot;openModal()&quot;&gt;Default Modal&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; ng-click=&quot;openModal($event)&quot;&gt;Anchored Modal&lt;/button&gt;\n" +
    "&lt;p&gt;{{modalResult}}&lt;/p&gt;</code></pre>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;modal-content&quot;&gt;\n" +
    "  &lt;h4 class=&quot;light black-text&quot;&gt;Sample Modal&lt;/h4&gt;\n" +
    "  &lt;p ng-repeat=&quot;item in items&quot;&gt;\n" +
    "    &lt;input type=&quot;radio&quot; name=&quot;item&quot; id=&quot;item-{{$index}}&quot; value=&quot;{{item}}&quot; ng-model=&quot;form.selectedItem&quot;/&gt;\n" +
    "    &lt;label for=&quot;item-{{$index}}&quot;&gt;{{item}}&lt;/label&gt;\n" +
    "  &lt;/p&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;div class=&quot;modal-footer&quot;&gt;\n" +
    "  &lt;button type=&quot;button&quot; class=&quot;btn-flat&quot; ng-click=&quot;select(form.selectedItem)&quot;&gt;Select&lt;/button&gt;\n" +
    "  &lt;button type=&quot;button&quot; class=&quot;btn-flat&quot; ng-click=&quot;cancel()&quot;&gt;Cancel&lt;/button&gt;\n" +
    "&lt;/div&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('ModalDemoCtrl', function ($scope) {\n" +
    "    var items = ['item 1', 'item 2', 'item 3'];\n" +
    "    $scope.openModal = function ($event) {\n" +
    "      var modalInstance = $modal.open({\n" +
    "        templateUrl: 'views/partials/modals/example-modal.html',\n" +
    "        anchorElement: $event ? angular.element($event.target) : undefined,\n" +
    "        controller: 'ModalInstanceCtrl',\n" +
    "        resolve: {\n" +
    "          items: function () {\n" +
    "            return items;\n" +
    "          }\n" +
    "        }\n" +
    "      });\n" +
    "      modalInstance.result.then(function (selectedItem) {\n" +
    "        $scope.modalResult = 'You selected ' + selectedItem;\n" +
    "      }, function () {\n" +
    "        $scope.modalResult = 'You dismissed the modal';\n" +
    "      });\n" +
    "    };\n" +
    "  })\n" +
    "  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {\n" +
    "    $scope.items = items;\n" +
    "    $scope.form = {selectedItem: items[0]};\n" +
    "\n" +
    "    $scope.select = function (item) {\n" +
    "      $modalInstance.close(item);\n" +
    "    };\n" +
    "\n" +
    "    $scope.cancel = function () {\n" +
    "      $modalInstance.dismiss('cancel');\n" +
    "    };\n" +
    "  });</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">@returns {modalInstance}</div><code style=\"font-weight: bold;\">$modal.open(options)</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{jQuery object}</div><code>anchorElement</code><span> - jQuery-wrapped element (see <a href=\"https://docs.angularjs.org/api/ng/function/angular.element\">angular.element</a>) the modal animates from</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>templateUrl</code><span> - path to template representing modal's content</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>template</code><span> - inline template representing modal's content</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=$rootScope</div><code>scope</code><span> - scope instance used for the modal's content</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>controller</code><span> - controller for the modal instance</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{func}</div><code>resolve</code><span> - members resolved and passed to the controller as locals (similar to Angular.JS routes)</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">modalInstance</code></li>\n" +
    "        <li class=\"collection-item\"><code>modalInstance.close(result)</code><span> - closes modal, passing a result</span></li>\n" +
    "        <li class=\"collection-item\"><code>modalInstance.dismiss(reason)</code><span> - dismisses modal, passing a reason</span></li>\n" +
    "        <li class=\"collection-item\"><code>modalInstance.result</code><span> - promise that is resolved when modal is closed and rejected when dismissed</span></li>\n" +
    "      </ul>\n" +
    "      <p>Note: The modal is a fork of <a href=\"http://angular-ui.github.io/bootstrap/#/modal\">UI Bootstrap's</a>. Look there for extended documentation.</p>\n" +
    "      <h3 id=\"toast\">Toast</h3><a href=\"http://www.google.com/design/spec/components/snackbars-toasts.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/snackbars-toasts.html\">Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen...Toasts are similar to snackbars but do not contain actions and cannot be swiped off screen.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <button ng-click=\"showToast()\" class=\"btn btn-default\">Default Toast</button>\n" +
    "                <button ng-click=\"showToast(undefined, 'rounded')\" class=\"btn btn-default\">Rounded Toast</button>\n" +
    "                <button ng-click=\"showToast(500)\" class=\"btn btn-default\">Quick Toast</button>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast()&quot;&gt;Default Toast&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast(undefined, 'rounded')&quot;&gt;Rounded Toast&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast(500)&quot;&gt;Quick Toast&lt;/button&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('ToastDemoCtrl', function ($scope) {\n" +
    "    var toastCounter = 1;\n" +
    "    $scope.showToast = function (duration, className) {\n" +
    "      $toast.show('This is sample toast ' + toastCounter + '.', duration, className);\n" +
    "      toastCounter++;\n" +
    "    };\n" +
    "  });\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">$toast.show(message, [duration], [className])</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>message - the message to display</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=2500 {int} (ms)</div><code>duration - the duration to display the tooltip</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>className - a css class to assign to the tooltip</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <p>Note: Toasts are automatically placed (and animated) based on screen width. They appear at the bottom of small screens, the bottom left of medium screens, and the top right of large screens.</p>\n" +
    "    </div>\n" +
    "    <div class=\"col s12\">\n" +
    "      <h2 id=\"alternatives\" class=\"header\">Alternatives</h2>\n" +
    "      <ul>\n" +
    "        <li><strong><a href=\"https://material.angularjs.org/\">Angular Material</a></strong>\n" +
    "          <p>\n" +
    "            Angular Material is Google's official implementation of Material Design in AngularJS.\n" +
    "            The framework is very modern (flexbox, AMCSS) but suffers from performance issues, particularly noticeable on mobile (it is pre 1.0).\n" +
    "            Another consideration is the project's JavaScript-based theming (something usually handled by a CSS preprocessor).\n" +
    "            It also lacks the Atomic CSS helper/utility classes often found in other frameworks.\n" +
    "          </p>\n" +
    "        </li>\n" +
    "        <li><strong><a href=\"http://krescruz.github.io/angular-materialize/\">angular-materialize</a></strong>\n" +
    "          <p>\n" +
    "            The directives of angular-materialize are mostly initialization wrappers of Materialize's custom JavaScript.\n" +
    "            Therefore, the library largely ignores the \"Angular way\" of doing things. It misses out on things like service-based components, leveraging data binding, templating and ngAnimate.\n" +
    "            It also maintains Materialize's jQuery, Velocity.js and custom JavaScript dependencies.\n" +
    "            It does, however, offer more components.\n" +
    "          </p>\n" +
    "        </li>\n" +
    "        <li><strong><a href=\"https://angular-ui.github.io/bootstrap/\">UI Bootstrap</a></strong>\n" +
    "          <p>\n" +
    "            UI Bootstrap is a full set of AngularJS directives built on top of the Bootstrap framework.\n" +
    "            The project is well-documented and can be paired with a <a href=\"https://fezvrasta.github.io/bootstrap-material-design/\">Material Design-inspired Bootstrap Theme</a>.\n" +
    "            This can result in muddled design that is neither Bootstrap nor Material, particularly when considering details like animations.\n" +
    "          </p>\n" +
    "        </li>\n" +
    "        <li><strong><a href=\"http://ui.lumapps.com/\">lumX</a></strong>\n" +
    "          <p>\n" +
    "            A full framework built for AngularJS based on Material Design. It has about the same level of maturity as Materialize.\n" +
    "            In addition to AngularJS, it has jQuery, Velocity.js and Moment.js dependencies.\n" +
    "            It strictly implements Material Design, but lacks some polish with things like animation.\n" +
    "          </p>\n" +
    "        </li>\n" +
    "        <li><strong><a href=\"http://www.getmdl.io/index.html\">Material Design Lite</a></strong>\n" +
    "          <p>A framework agnostic library by Google. It includes basic components such as inputs, buttons, menus and tooltips. A good choice for a light weight website.</p>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('views/partials/app.html',
    "\n" +
    "<header>\n" +
    "  <div class=\"navbar-fixed\">\n" +
    "    <nav>\n" +
    "      <div class=\"nav-wrapper row\">\n" +
    "        <div class=\"col s12\"><a ng-href=\"/\" class=\"brand-logo\">ng-materialize</a>\n" +
    "          <ul class=\"right hide-on-med-and-down\">\n" +
    "            <li><a href=\"#about\" ng-click=\"scrollTo($event, 'about')\">About</a></li>\n" +
    "            <li><a href=\"#getting-started\" ng-click=\"scrollTo($event, 'getting-started')\">Getting Started</a></li>\n" +
    "            <li dropdown=\"dropdown\"><a href=\"#directives\" dropdown-toggle=\"dropdown-toggle\">Directives<i class=\"material-icons right\">arrow_drop_down</i></a>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                <li ng-repeat=\"directive in directives\"><a ng-href=\"#{{directive.id}}\" ng-bind=\"directive.name\" ng-click=\"scrollTo($event, directive.id)\"></a></li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "            <li dropdown=\"dropdown\"><a href=\"#services\" dropdown-toggle=\"dropdown-toggle\">Services<i class=\"material-icons right\">arrow_drop_down</i></a>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                <li ng-repeat=\"service in services\"><a ng-href=\"#{{service.id}}\" ng-bind=\"service.name\" ng-click=\"scrollTo($event, service.id)\"></a></li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "            <li><a href=\"#alternatives\" ng-click=\"scrollTo($event, 'alternatives')\">Alternatives</a></li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </nav>\n" +
    "  </div>\n" +
    "</header><main ui-view></main>\n" +
    "<footer class=\"page-footer\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col s12\">\n" +
    "      <p class=\"grey-text text-lighten-2\">Built by <a href=\"http://www.twitter.com/willthomsen\">Will Thomsen</a> under the <a href=\"http://opensource.org/licenses/MIT\">MIT License</a>.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>"
  );


  $templateCache.put('views/partials/components/accordion.html',
    "\n" +
    "<h3 id=\"accordion\">Accordion</h3>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <h4>Default</h4>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <p>\n" +
    "            <input id=\"open-one\" type=\"checkbox\" ng-model=\"openOne\"/>\n" +
    "            <label for=\"open-one\">Open only one at a time</label>\n" +
    "          </p>\n" +
    "          <accordion close-others=\"openOne\">\n" +
    "            <accordion-group ng-repeat=\"accordionGroup in flatAccordionGroups\">\n" +
    "              <accordion-heading><i ng-bind=\"accordionGroup.icon\" class=\"material-icons\"></i><span ng-bind=\"accordionGroup.title\"></span></accordion-heading>\n" +
    "              <p ng-bind=\"accordionGroup.content\"></p>\n" +
    "            </accordion-group>\n" +
    "          </accordion>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;p&gt;\n" +
    "  &lt;input type=&quot;checkbox&quot; id=&quot;open-one&quot; ng-model=&quot;openOne&quot;/&gt;\n" +
    "  &lt;label for=&quot;open-one&quot;&gt;Open only one at a time&lt;/label&gt;\n" +
    "&lt;/p&gt;\n" +
    "&lt;accordion close-others=&quot;openOne&quot;&gt;\n" +
    "  &lt;accordion-group ng-repeat=&quot;accordionGroup in accordionGroups&quot;&gt;\n" +
    "    &lt;accordion-heading&gt;\n" +
    "      &lt;i class=&quot;material-icons&quot;&gt;{{accordionGroup.icon}}&lt;/i&gt;\n" +
    "      {{accordionGroup.title}}\n" +
    "    &lt;/accordion-heading&gt;\n" +
    "    &lt;p&gt;{{accordionGroup.content}}&lt;/p&gt;\n" +
    "  &lt;/accordion-group&gt;\n" +
    "&lt;/accordion&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('AccordionDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.openOne = true;\n" +
    "    $scope.accordionGroups = [\n" +
    "      {\n" +
    "        title: 'First',\n" +
    "        icon: 'subtitles',\n" +
    "        content: lorem[0]\n" +
    "      }, {\n" +
    "        title: 'Second',\n" +
    "        icon: 'games',\n" +
    "        content: lorem[1]\n" +
    "      }, {\n" +
    "        title: 'Third',\n" +
    "        icon: 'library_books',\n" +
    "        content: lorem[2]\n" +
    "      }\n" +
    "    ];\n" +
    "  });</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <h4>Popout</h4>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <div class=\"row\">\n" +
    "            <div ng-repeat=\"accordionGroup in popoutAccordionGroups\" class=\"col s12 m4\">\n" +
    "              <input type=\"checkbox\" ng-model=\"accordionGroup.open\" id=\"{{accordionGroup.title}}\"/>\n" +
    "              <label for=\"{{accordionGroup.title}}\" ng-bind=\"accordionGroup.title\"></label>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <accordion accordion-popout=\"accordion-popout\" close-others=\"false\">\n" +
    "            <accordion-group ng-repeat=\"accordionGroup in popoutAccordionGroups\" is-open=\"accordionGroup.open\">\n" +
    "              <accordion-heading><i ng-bind=\"accordionGroup.icon\" class=\"material-icons\"></i><span ng-bind=\"accordionGroup.title\"></span></accordion-heading>\n" +
    "              <p ng-bind=\"accordionGroup.content\"></p>\n" +
    "            </accordion-group>\n" +
    "          </accordion>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;row&quot;&gt;\n" +
    "  &lt;div class=&quot;col s12 m4&quot; ng-repeat=&quot;accordionGroup in accordionGroups&quot;&gt;\n" +
    "    &lt;input type=&quot;checkbox&quot; id=&quot;{{accordionGroup.title}}&quot; ng-model=&quot;accordionGroup.open&quot;/&gt;\n" +
    "    &lt;label for=&quot;{{accordionGroup.title}}&quot;&gt;{{accordionGroup.title}}&lt;/label&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;accordion accordion-popout, close-others=&quot;false&quot;&gt;\n" +
    "  &lt;accordion-group ng-repeat=&quot;accordionGroup in accordionGroups&quot; is-open=&quot;accordionGroup.open&quot;&gt;\n" +
    "    &lt;accordion-heading&gt;\n" +
    "      &lt;i class=&quot;material-icons&quot;&gt;{{accordionGroup.icon}}&lt;/i&gt;\n" +
    "      {{accordionGroup.title}}\n" +
    "    &lt;/accordion-heading&gt;\n" +
    "    &lt;p&gt;{{accordionGroup.content}}&lt;/p&gt;\n" +
    "  &lt;/accordion-group&gt;\n" +
    "&lt;/accordion&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('AccordionDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.accordionGroups = [\n" +
    "      {\n" +
    "        title: 'First',\n" +
    "        icon: 'subtitles',\n" +
    "        content: lorem[0],\n" +
    "        open: false\n" +
    "      }, {\n" +
    "        title: 'Second',\n" +
    "        icon: 'games',\n" +
    "        content: lorem[1],\n" +
    "        open: false\n" +
    "      }, {\n" +
    "        title: 'Third',\n" +
    "        icon: 'library_books',\n" +
    "        content: lorem[2],\n" +
    "        open: false\n" +
    "      }\n" +
    "    ];\n" +
    "  });\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;accordion&gt;</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=true {boolean} (bound)</div><code>close-others</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>accordion-popout</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;accordion-group&gt;</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean} (bound)</div><code>is-open</code>\n" +
    "  </li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/components/dropdown.html',
    "\n" +
    "<h3 id=\"dropdown\">Dropdown</h3><a href=\"http://www.google.com/design/spec/components/menus.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/menus.html\">Menus allow users to take an action by selecting from a list of choices revealed upon opening a temporary, new sheet of material.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <div style=\"min-height: 200px;\">\n" +
    "            <div dropdown=\"dropdown\">\n" +
    "              <button type=\"button\" dropdown-toggle=\"dropdown-toggle\" class=\"btn btn-default\">Default Dropdown</button>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                <li><a href=\"href\">One</a></li>\n" +
    "                <li><a href=\"href\">Two</a></li>\n" +
    "                <li class=\"divider\"></li>\n" +
    "                <li><a href=\"href\">Three</a></li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div dropdown&gt;\n" +
    "  &lt;button type=&quot;button&quot; dropdown-toggle class=&quot;btn btn-default&quot;&gt;Default Dropdown&lt;/button&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;ul class=&quot;dropdown-menu&quot;&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;One&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Two&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Three&lt;/a&gt;&lt;/li&gt;\n" +
    "&lt;/ul&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular.module('ng-materialize.demo');</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <div style=\"min-height: 200px;\">\n" +
    "            <div dropdown=\"dropdown\" auto-close=\"outsideClick\" style=\"display: inline-block;\">\n" +
    "              <button type=\"button\" dropdown-toggle=\"dropdown-toggle\" class=\"btn btn-default\">Outside Click to Close</button>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                <li><a>One</a></li>\n" +
    "                <li><a>Two</a></li>\n" +
    "                <li class=\"divider\"></li>\n" +
    "                <li><a>Three</a></li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div dropdown auto-close=&quot;outsideClick&quot; class=&quot;dropdown-wrap&quot;&gt;\n" +
    "  &lt;button type=&quot;button&quot; dropdown-toggle class=&quot;btn btn-default&quot;&gt;Outside Click to Close&lt;/button&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;ul class=&quot;dropdown-menu&quot;&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;One&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Two&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Three&lt;/a&gt;&lt;/li&gt;\n" +
    "&lt;/ul&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular.module('ng-materialize.demo');</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>CSS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-css\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-css\">.dropdown-wrap {display: inline-block;}\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">dropdown</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=always | outsideClick | disabled {string}</div><code>auto-close</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>dropdown-append-to-body</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean} (bound)</div><code>is-open</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">dropdown-toggle</code></li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/components/ink.html',
    "\n" +
    "<h3 id=\"ink\">Ink</h3><a href=\"http://www.google.com/design/spec/animation/responsive-interaction.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/animation/responsive-interaction.html\">Responsive interaction encourages deeper exploration of an app by creating timely, logical, and delightful screen reactions to user input. Each interaction is thoughtful, perhaps whimsical, but never distracting.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <p>Use the <code>ink-color</code> option to change the ink effect's color:</p>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <div class=\"collection\">\n" +
    "            <a class=\"collection-item\" href ink>Default Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"light\">Light Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"green\">Green Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"orange\">Orange Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"purple\">Purple Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"red\">Red Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"teal\">Teal Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"yellow\">Yellow Ink</a>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;collection&quot;&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink&gt;Default Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;light&quot;&gt;Light Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;red&quot;&gt;Red Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;yellow&quot;&gt;Yellow Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;orange&quot;&gt;Orange Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;purple&quot;&gt;Purple Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;green&quot;&gt;Green Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;teal&quot;&gt;Teal Ink&lt;/a&gt;\n" +
    "&lt;/div&gt;\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <p>ng-materialize includes the ink effect by default on these components:</p>\n" +
    "    <ul class=\"bulleted\">\n" +
    "      <li><code>&lt;button&gt;</code></li>\n" +
    "      <li><code>&lt;accordion-heading&gt;</code></li>\n" +
    "      <li><code>&lt;tab-heading&gt;</code></li>\n" +
    "    </ul>\n" +
    "    <p>Use the <code>no-ink</code> option to disable the effect on buttons:</p>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <button type=\"button\" class=\"btn btn-default\">Button</button>\n" +
    "          <button type=\"button\" no-ink=\"no-ink\" class=\"btn btn-default\">No Ink</button>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;Button&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; no-ink=&quot;true&quot;&gt;No Ink&lt;/button&gt;\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">ink</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=classic | light | red | yellow | orange | purple | green | teal {string}</div><code>ink-color</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>no-ink</code>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "<p>\n" +
    "  Note: To provide Material Design's ripple effect, Materialize wraps the <a href=\"http://fian.my.id/Waves/\">Waves project</a> into its JavaScript.\n" +
    "  ng-materialize unbundles the project and includes it as a dependency. It is required to use the ink directive.\n" +
    "</p>"
  );


  $templateCache.put('views/partials/components/modal.html',
    "\n" +
    "<h3 id=\"modal\">Modal</h3><a href=\"http://www.google.com/design/spec/components/dialogs.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/dialogs.html\">Dialogs inform users about critical information, require users to make decisions, or encapsulate multiple tasks within a discrete process. Use dialogs sparingly because they are interruptive in nature.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <button ng-click=\"openModal()\" class=\"btn btn-default\">Default Modal</button>\n" +
    "          <button ng-click=\"openModal($event)\" class=\"btn btn-default\">Anchored Modal</button>\n" +
    "          <p>{{modalResult}}</p>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; ng-click=&quot;openModal()&quot;&gt;Default Modal&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; ng-click=&quot;openModal($event)&quot;&gt;Anchored Modal&lt;/button&gt;\n" +
    "&lt;p&gt;{{modalResult}}&lt;/p&gt;</code></pre>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;modal-content&quot;&gt;\n" +
    "  &lt;h4 class=&quot;light black-text&quot;&gt;Sample Modal&lt;/h4&gt;\n" +
    "  &lt;p ng-repeat=&quot;item in items&quot;&gt;\n" +
    "    &lt;input type=&quot;radio&quot; name=&quot;item&quot; id=&quot;item-{{$index}}&quot; value=&quot;{{item}}&quot; ng-model=&quot;form.selectedItem&quot;/&gt;\n" +
    "    &lt;label for=&quot;item-{{$index}}&quot;&gt;{{item}}&lt;/label&gt;\n" +
    "  &lt;/p&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;div class=&quot;modal-footer&quot;&gt;\n" +
    "  &lt;button type=&quot;button&quot; class=&quot;btn-flat&quot; ng-click=&quot;select(form.selectedItem)&quot;&gt;Select&lt;/button&gt;\n" +
    "  &lt;button type=&quot;button&quot; class=&quot;btn-flat&quot; ng-click=&quot;cancel()&quot;&gt;Cancel&lt;/button&gt;\n" +
    "&lt;/div&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('ModalDemoCtrl', function ($scope) {\n" +
    "    var items = ['item 1', 'item 2', 'item 3'];\n" +
    "    $scope.openModal = function ($event) {\n" +
    "      var modalInstance = $modal.open({\n" +
    "        templateUrl: 'views/partials/modals/example-modal.html',\n" +
    "        anchorElement: $event ? angular.element($event.target) : undefined,\n" +
    "        controller: 'ModalInstanceCtrl',\n" +
    "        resolve: {\n" +
    "          items: function () {\n" +
    "            return items;\n" +
    "          }\n" +
    "        }\n" +
    "      });\n" +
    "      modalInstance.result.then(function (selectedItem) {\n" +
    "        $scope.modalResult = 'You selected ' + selectedItem;\n" +
    "      }, function () {\n" +
    "        $scope.modalResult = 'You dismissed the modal';\n" +
    "      });\n" +
    "    };\n" +
    "  })\n" +
    "  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {\n" +
    "    $scope.items = items;\n" +
    "    $scope.form = {selectedItem: items[0]};\n" +
    "\n" +
    "    $scope.select = function (item) {\n" +
    "      $modalInstance.close(item);\n" +
    "    };\n" +
    "\n" +
    "    $scope.cancel = function () {\n" +
    "      $modalInstance.dismiss('cancel');\n" +
    "    };\n" +
    "  });</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">@returns {modalInstance}</div><code style=\"font-weight: bold;\">$modal.open(options)</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{jQuery object}</div><code>anchorElement</code><span> - jQuery-wrapped element (see <a href=\"https://docs.angularjs.org/api/ng/function/angular.element\">angular.element</a>) the modal animates from</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>templateUrl</code><span> - path to template representing modal's content</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>template</code><span> - inline template representing modal's content</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=$rootScope</div><code>scope</code><span> - scope instance used for the modal's content</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>controller</code><span> - controller for the modal instance</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{func}</div><code>resolve</code><span> - members resolved and passed to the controller as locals (similar to Angular.JS routes)</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">modalInstance</code></li>\n" +
    "  <li class=\"collection-item\"><code>modalInstance.close(result)</code><span> - closes modal, passing a result</span></li>\n" +
    "  <li class=\"collection-item\"><code>modalInstance.dismiss(reason)</code><span> - dismisses modal, passing a reason</span></li>\n" +
    "  <li class=\"collection-item\"><code>modalInstance.result</code><span> - promise that is resolved when modal is closed and rejected when dismissed</span></li>\n" +
    "</ul>\n" +
    "<p>Note: The modal is a fork of <a href=\"http://angular-ui.github.io/bootstrap/#/modal\">UI Bootstrap's</a>. Look there for extended documentation.</p>"
  );


  $templateCache.put('views/partials/components/tabs.html',
    "\n" +
    "<h3 id=\"tabs\">Tabs</h3><a href=\"http://www.google.com/design/spec/components/tabs.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/tabs.html\">Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l7\">\n" +
    "    <h4>Default (with content)</h4>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <tabset>\n" +
    "            <tab ng-repeat=\"tab in tabs\" active=\"tab.activeInline\" disable=\"tab.disable\">\n" +
    "              <tab-heading>{{tab.heading}}</tab-heading>\n" +
    "              <p>{{tab.content}}</p>\n" +
    "            </tab>\n" +
    "          </tabset>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;tabset&gt;\n" +
    "  &lt;tab ng-repeat=&quot;tab in tabs&quot; active=&quot;tab.active&quot; disable=&quot;tab.disable&quot;&gt;\n" +
    "    &lt;tab-heading&gt;{{tab.heading}}&lt;/tab-heading&gt;\n" +
    "    &lt;p&gt;{{tab.content}}&lt;/p&gt;\n" +
    "  &lt;/tab&gt;\n" +
    "&lt;/tabset&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('TabsDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.tabs = [\n" +
    "      {heading: 'Tab 1', content: lorem[0], disable: false},\n" +
    "      {heading: 'Tab 2', content: lorem[1], disable: false},\n" +
    "      {heading: 'Disabled Tab 3', content: 'This tab is disabled', disable: true},\n" +
    "      {heading: 'Tab 4', content: lorem[2], disable: false}\n" +
    "    ];\n" +
    "  });\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l5\">\n" +
    "    <h4>Justified (no content)</h4>\n" +
    "    <p>\n" +
    "      Tab headers can act independently of tab content.\n" +
    "      Use the <code>no-content</code> option along with <code>active</code> or <code>select()</code> to assist in content display.\n" +
    "    </p>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <tabset justified=\"true\" no-content=\"true\">\n" +
    "            <tab ng-repeat=\"tab in justifiedTabs\">\n" +
    "              <tab-heading>{{tab.heading}}</tab-heading>\n" +
    "            </tab>\n" +
    "          </tabset>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;tabset justified=&quot;true&quot; no-content=&quot;true&quot;&gt;\n" +
    "  &lt;tab ng-repeat=&quot;tab in tabs&quot;&gt;\n" +
    "    &lt;tab-heading&gt;{{tab}}&lt;/tab-heading&gt;\n" +
    "  &lt;/tab&gt;\n" +
    "&lt;/tabset&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('TabsDemoCtrl', function ($scope) {\n" +
    "    $scope.tabs = ['Tab 1', 'Tab 2', 'Tab 3'];\n" +
    "  });</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tabset&gt;</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>justified</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>no-content</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tab&gt;</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean} (bound)</div><code>active</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean} (bound)</div><code>disable</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{func}</div><code>select()</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{func}</div><code>deselect()</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tab-heading&gt;</code></li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/components/text-field.html',
    "\n" +
    "<h3 id=\"text-field\">Text Field</h3><a href=\"http://www.google.com/design/spec/components/text-fields.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/text-fields.html\">Text fields allow the user to input text. They can be single-line, with or without scrolling, or multi-line, and can have an icon.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <form name=\"exampleForm\" novalidate=\"novalidate\">\n" +
    "            <div class=\"input-field\">\n" +
    "              <input id=\"example1\" type=\"text\" name=\"example1\" ng-model=\"textFields.example1\" floating-label=\"Counter &amp; Validation\" character-counter=\"10\" ng-maxlength=\"10\" ng-required=\"true\" class=\"validate\"/>\n" +
    "              <div ng-messages=\"exampleForm.example1.$error\" ng-show=\"exampleForm.example1.$dirty\" class=\"field-hint\">\n" +
    "                <div ng-message=\"required\">This is required.</div>\n" +
    "                <div ng-message=\"maxlength\">This field may not exceed 10 characters.</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"input-field\">\n" +
    "              <textarea id=\"example2\" materialize-textarea=\"true\" floating-label=\"Expanding Textarea\" ng-model=\"textfields.example2\"></textarea>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;form name=&quot;exampleForm&quot; novalidate&gt;\n" +
    "  &lt;div class=&quot;input-field&quot;&gt;\n" +
    "    &lt;input\n" +
    "      type=&quot;text&quot;\n" +
    "      class=&quot;validate&quot;\n" +
    "      id=&quot;example1&quot;\n" +
    "      name=&quot;example1&quot;\n" +
    "      ng-model=&quot;inputs.example1&quot;\n" +
    "      floating-label=&quot;Counter and Validation&quot;\n" +
    "      character-counter=&quot;10&quot;\n" +
    "      ng-maxlength=&quot;10&quot;\n" +
    "      ng-required=&quot;true&quot;/&gt;\n" +
    "    &lt;div class=&quot;field-hint&quot; ng-messages=&quot;exampleForm.example1.$error&quot; ng-show=&quot;exampleForm.example1.$dirty&quot;&gt;\n" +
    "      &lt;div ng-message=&quot;required&quot;&gt;This is required.&lt;/div&gt;\n" +
    "      &lt;div ng-message=&quot;maxlength&quot;&gt;This field may not exceed 10 characters.&lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;input-field&quot;&gt;\n" +
    "    &lt;textarea\n" +
    "      id=&quot;example2&quot;\n" +
    "      materialize-textarea=&quot;true&quot;\n" +
    "      floating-label=&quot;Expanding Textarea&quot;\n" +
    "      ng-model=&quot;form.example2&gt;\n" +
    "    &lt;/textarea&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/form&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('InputDemoCtrl', function ($scope) {\n" +
    "    $scope.form = {\n" +
    "      example1: null,\n" +
    "      example2: null\n" +
    "    };\n" +
    "  });</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <p>ng-materialize uses directives and CSS classes to stylize text fields:</p>\n" +
    "    <ul class=\"bulleted\">\n" +
    "      <li>\n" +
    "        <p>Use the <code>floating-label</code> directive to add labels to inputs and textareas (The element must also declare the <code>id</code> attribute).</p>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <p>Use the <code>character-counter</code> directive to add a character hint to inputs and textareas.</p>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <p>\n" +
    "          Add the <code>validate</code> class to inputs/textareas for success and error state styling when using <a href=\"https://docs.angularjs.org/api/ng/directive/input\">Angular.JS input validation</a>.\n" +
    "          Include the <code>ignore-success</code> class to exclude success state styling.\n" +
    "        </p>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <p>Wrap error state messages in a div with the <code>field-hint</code> class. Optionally use <a href=\"https://docs.angularjs.org/api/ngMessages/directive/ngMessages\">ngMessages</a> to streamline the process.</p>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <p>Use the <code>materialize-textarea</code> directive on a <code>textarea</code> to make the field resize itself based on its contents.</p>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">floating-label</code>\n" +
    "    <div class=\"right\">{string}</div>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">character-counter</code>\n" +
    "    <div class=\"right\">{int}</div>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">materialize-textarea</code>\n" +
    "    <div class=\"right\">{boolean}</div>\n" +
    "  </li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/components/toast.html',
    "\n" +
    "<h3 id=\"toast\">Toast</h3><a href=\"http://www.google.com/design/spec/components/snackbars-toasts.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/snackbars-toasts.html\">Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen...Toasts are similar to snackbars but do not contain actions and cannot be swiped off screen.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <button ng-click=\"showToast()\" class=\"btn btn-default\">Default Toast</button>\n" +
    "          <button ng-click=\"showToast(undefined, 'rounded')\" class=\"btn btn-default\">Rounded Toast</button>\n" +
    "          <button ng-click=\"showToast(500)\" class=\"btn btn-default\">Quick Toast</button>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast()&quot;&gt;Default Toast&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast(undefined, 'rounded')&quot;&gt;Rounded Toast&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast(500)&quot;&gt;Quick Toast&lt;/button&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('ToastDemoCtrl', function ($scope) {\n" +
    "    var toastCounter = 1;\n" +
    "    $scope.showToast = function (duration, className) {\n" +
    "      $toast.show('This is sample toast ' + toastCounter + '.', duration, className);\n" +
    "      toastCounter++;\n" +
    "    };\n" +
    "  });\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">$toast.show(message, [duration], [className])</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>message - the message to display</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=2500 {int} (ms)</div><code>duration - the duration to display the tooltip</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>className - a css class to assign to the tooltip</code>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "<p>Note: Toasts are automatically placed (and animated) based on screen width. They appear at the bottom of small screens, the bottom left of medium screens, and the top right of large screens.</p>"
  );


  $templateCache.put('views/partials/components/tooltip.html',
    "\n" +
    "<h3 id=\"tooltip\">Tooltip</h3><a href=\"http://www.google.com/design/spec/components/tooltips.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/tooltips.html\">Tooltips are labels that appear on hover and focus when the user hovers over an element with the cursor, focuses on an element using a keyboard (usually through the tab key), or upon touch (without releasing) in a touch UI. They contain textual identification for the element in question. They may also contain brief helper text regarding the function of the element.</blockquote></a>\n" +
    "<div class=\"card\">\n" +
    "  <tabset>\n" +
    "    <tab>\n" +
    "      <tab-heading>Demo</tab-heading>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l3\">\n" +
    "          <p>\n" +
    "            <button type=\"button\" tooltip=\"helpful message\" class=\"btn btn-default\">Default</button>\n" +
    "          </p>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l3\">\n" +
    "          <p>\n" +
    "            <button type=\"button\" tooltip=\"finally\" tooltip-popup-delay=\"500\" class=\"btn btn-default\">Delay</button>\n" +
    "          </p>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l3\">\n" +
    "          <p>\n" +
    "            <button type=\"button\" tooltip=\"mouseleave or click\" tooltip-trigger=\"clickOff\" class=\"btn btn-default\">Click Off</button>\n" +
    "          </p>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l3\">\n" +
    "          <p>Append To Body?</p>\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-content\">\n" +
    "              <button type=\"button\" tooltip=\"over\" tooltip-append-to-body=\"true\" class=\"btn btn-default\">True</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-content\">\n" +
    "              <button type=\"button\" tooltip=\"under\" class=\"btn btn-default\">False</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "    <tab>\n" +
    "      <tab-heading>HTML</tab-heading>\n" +
    "      <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;row&quot;&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;helpful message&quot;&gt;Default&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;finally&quot; tooltip-popup-delay=&quot;500&quot;&gt;Delay&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;mouseleave or click&quot; tooltip-trigger=&quot;clickOff&quot;&gt;Click Off&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;p&gt;Append To Body?&lt;/p&gt;\n" +
    "    &lt;div class=&quot;card&quot;&gt;\n" +
    "      &lt;div class=&quot;card-content&quot;&gt;\n" +
    "        &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;over&quot; tooltip-append-to-body=&quot;true&quot;&gt;True&lt;/button&gt;\n" +
    "      &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "    &lt;div class=&quot;card&quot;&gt;\n" +
    "      &lt;div class=&quot;card-content&quot;&gt;\n" +
    "        &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;under&quot;&gt;False&lt;/button&gt;\n" +
    "      &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/div&gt;</code></pre>\n" +
    "    </tab>\n" +
    "  </tabset>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">tooltip</code>\n" +
    "    <div class=\"right\">{string}</div>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>tooltip-append-to-body</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=0 {int} (ms)</div><code>tooltip-popup-delay</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=mouseenter | focus | click | clickOff {string}</div><code>tooltip-trigger</code>\n" +
    "  </li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/modals/example-modal.html',
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <h4 class=\"light black-text\">Sample Modal</h4>\n" +
    "  <p ng-repeat=\"item in items\">\n" +
    "    <input type=\"radio\" ng-model=\"form.selectedItem\" name=\"item\" id=\"item-{{$index}}\" value=\"{{item}}\"/>\n" +
    "    <label for=\"item-{{$index}}\" ng-bind=\"item\"></label>\n" +
    "  </p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button ng-click=\"select(form.selectedItem)\" class=\"btn-flat\">Select</button>\n" +
    "  <button ng-click=\"cancel()\" class=\"btn-flat\">Cancel</button>\n" +
    "</div>"
  );

}]);
