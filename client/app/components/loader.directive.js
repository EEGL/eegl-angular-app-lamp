'use strict'

angular.module('app')
  .directive('loader', function() {
    return {
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'app/components/loader.html',
      link: function(scope, element, attrs) {
        if( window.global.ie9 ) { element.hide() }
      }
    }
  })
