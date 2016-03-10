(function() {
  'use strict'

  angular.module('app')
    .animation('.an-reveal', anReveal)

  function anReveal () {
    return {
      enter: function(element, done) {

        angular.element('html, body').velocity('scroll', { duration: 300 } )

        element.velocity('fadeIn', { delay: 300, duration: 600, complete: done })

        return function() {
          element.stop()
        }

      },
      leave: function(element, done) {

        element.velocity('fadeOut', { duration: 300, complete: done })

        return function() {
          element.stop()
        }

      }
    }
  }

})();
