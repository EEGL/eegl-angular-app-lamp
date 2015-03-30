'use strict';

angular.module('myApp')
  .directive('loader', function() {
    return {
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'templates/partials/loader.html',
      link: function(scope, element, attrs) {
        if( window.global.ie9 ) { element.hide() }
      }
    }
  })
  .directive('email', function() {
    return {
      scope: {
        email: '='
      },
      restrict: 'A',
      link: function($scope, iElm, iAttrs, controller) {
        iElm.attr('href','mailto:' + iAttrs.email.replace('*', '@') )
      }
    }
  })
  .directive('imgPreload',function($rootScope) {
      return {
        restrict: 'A',
        scope: {
          ngSrc: '@'
        },
        link: function(scope, element, attrs) {
          element.on('load', function() {
            element.removeClass('an-start')
          }).on('error', function() {
            //
          })

          if( window.global.ie9 ) {
            element.removeClass('an-start')
          }

          scope.$watch('ngSrc', function(newVal) {
            element.addClass('an-start')
          })
        }
      }
  })
  .directive('imgResponsive', function(){
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
        $scope.$watch('normal', function(value) {
          $scope.update()
        })
        $scope.$watch('large', function(value) {
          $scope.update()
        })
          
      }
    }
  })
  .directive('uiAnchor', function() {
    /*
     * A directive for handling scrolling navigation between anchors of the 
     *  homepage.
     * Reason: ui-sref doesn't trigger state change when toState and 
     *  fromState are the same
     */
    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs, $transclude, $state) {
        $element.bind('click', function(event) {
          var _currentState = $state.$current.name

          if( _currentState != $attrs.uiAnchor ) {
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