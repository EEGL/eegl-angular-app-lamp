(function() {
  'use strict'

  /* @ngInject */
  function AppController ($scope, $rootScope, $timeout, PageTitle, MetaInformation, $state, $stateParams) {

    /* --------------------------
     * Private variables
     * -------------------------- */
    var _scrollSpeed = 1200
    var _scrollOffset = (window.global.mediaQuery === 'xs') ? 0 : 0

    /* --------------------------
     * Public variables
     * -------------------------- */

    var loaded = window.global.ie9 ? true : false

    /* --------------------------
     * Private methods
     * -------------------------- */

    function stateChangeSuccess (event, toState, toParams, from, fromParams) {
      console.log('Route changed...')

      // --- SEO ---
      PageTitle.setTitle(toState.data.title)
      MetaInformation.setMetaDescription(toState.data.description)
      MetaInformation.setMetaKeywords(toState.data.keywords)

      // --- GA -------------
      console.log('GA track:', toState.name )
      window.ga('send', 'pageview', { page: toState.url, title: toState.name  })


      // --- STATE MACHINE ---
      console.log('state: ', toState.name, ' params: ', $stateParams)

      switch( toState.name ) {
        // --- Home ---
        case 'home':
          break
        default:
          break
      }
    }

    function imgLoadedDone (instance) {
     //  console.log('Images loaded', instance)
      $scope.loaded = true
    }

    /* --------------------------
     * Event Handlers
     * -------------------------- */

    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess )

    /* --------------------------
     * Exports
     * -------------------------- */

    angular.extend( $scope, {
      // Lodash
      _ : window._,

      loaded : loaded,

      // SEO
      PageTitle : PageTitle,
      MetaInformation : MetaInformation,

      // Images loaded event
      imgLoadedEvents : {
        done: imgLoadedDone
      }
    })

  }

  angular.module('app')
    .controller('AppController', AppController)

})()
