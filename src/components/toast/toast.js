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