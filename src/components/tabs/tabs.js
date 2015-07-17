'use strict';

    angular.module('ngMaterialize.tabs', ['template/tabs/tabset.html', 'template/tabs/tab.html'])
      .controller('TabsetController', ['$scope', '$timeout', '$animate', '$window', '$q', function ($scope, $timeout, $animate, $window, $q) {
        var ctrl = this;
        var tabs = ctrl.tabs = $scope.tabs = [];
        var prevTab;
        var activeTab;
        var indicatorTimeout;
        var frozen;
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
            updateIndicator(activeTab, prevTab);
          } else {
            $timeout(function () {
              updateIndicator(activeTab, prevTab);
            });
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

        function unfreezeIndicator(css) {
          return $animate.move(
            $scope.indicator[0],
            $scope.tabsetElement[0],
            undefined,
            {from: css, to: css, duration: 0}
          ).then(function () {
            frozen = false;
          });
        }

        function freezeIndicator(targetHeading) {
          var css = {left: '', right: ''};
          return $animate.move(
            $scope.indicator[0],
            targetHeading[0],
            undefined,
            {from: css, to: css}
          ).then(function () {
            frozen = true;
          });
        }

        function updateIndicator(newTab, oldTab) {
          var indicator = $scope.indicator;
          var tabset = $scope.tabsetElement;
          var targetHeading = newTab.headingTranscludeElement.parent();

          var start = calcIndicatorCss(oldTab);
          var end = calcIndicatorCss(newTab);

          var addClass = end.left > start.left ? 'indicator-right' : 'indicator-left';
          var removeClass = addClass === 'indicator-right' ? 'indicator-left' : 'indicator-right';

          var transitionFrom = {left: start.left + 'px', right: start.right + 'px'};
          var transitionTo = {left: end.left + 'px', right: end.right + 'px'};
          var animating = true;

          function slideIndicator() {
            indicator.toggleClass(removeClass, false).toggleClass(addClass, true).css(transitionTo);
            $timeout.cancel(indicatorTimeout);
            indicatorTimeout = $timeout(function () {
              indicator.toggleClass(removeClass, false).toggleClass(addClass, false);
              freezeIndicator(targetHeading);
            }, 500);
          }

          if (oldTab) {
            if (frozen) {
              unfreezeIndicator(transitionFrom).then(slideIndicator);
            } else {
              slideIndicator();
            }
          } else if (!frozen) {
            freezeIndicator(targetHeading);
          }
        }

        var destroyed;
        $scope.$on('$destroy', function() {
          destroyed = true;
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
            if (!scope.disabled) {
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
