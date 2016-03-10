'use strict'

angular.module('app')
  .directive('email', function() {
    return {
      scope: {
        email: '='
      },
      restrict: 'A',
      link: function($scope, iElm, iAttrs) {
        iElm.attr('href','mailto:' + iAttrs.email.replace('*', '@') )
      }
    }
  })
  .directive('imgPreload', ['$rootScope', function($rootScope) {
      return {
        restrict: 'A',
        scope: {
          ngSrc: '@'
        },
        link: function(scope, element) {
          element.on('load', function() {
            element.removeClass('an-start')
          }).on('error', function() {
            //
          })

          if( window.global.ie9 ) {
            element.removeClass('an-start')
          }

          scope.$watch('ngSrc', function() {
            element.addClass('an-start')
          })
        }
      }
  }])
  .directive('imgResponsive', function(){
    // Runs during compile
    return {
      scope: {
        normal: '@normal',
        large: '@large'
      }, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.update = function () {
          if( window.global.mediaQuery === 'lg' ) {
            $element.attr('src', $scope.large)
          } else {
            $element.attr('src', $scope.normal)
          }
        }
      },
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      link: function($scope, iElm, iAttrs, controller, $watch) {
        $scope.$watch('normal', function() {
          $scope.update()
        })
        $scope.$watch('large', function() {
          $scope.update()
        })

      }
    }
  })
  .directive('uiAnchor', function() {
    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs, $transclude, $state) {
        $element.bind('click', function() {
          var _currentState = $state.$current.name

          if( _currentState !== $attrs.uiAnchor ) {
            // Trigger UI Router state change
            $state.go($attrs.uiAnchor)
          } else {
            // If target state is the same, rerun the main view's scroll navigation handler
            $scope.homeNavigation( $attrs.uiAnchor, _currentState )
          }
        })
      }
    }
  })
  .directive('getUrl', function() {
    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs, $location) {
        $scope.url = $location.absUrl()
      }
    }
  })
