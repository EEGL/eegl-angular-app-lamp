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

    var loaded = false
    if( window.global.ie9 ) { loaded = true }

    /* --------------------------
     * Private methods
     * -------------------------- */

    function scrollHandler (section, fromName) {
      $scope.scrolling = true
      $timeout(function () {
        var _el = angular.element('#' + section)
        var _offset = (_el.data('offset')) ? _el.data('offset') : 0
        var _top = _el.offset().top - _scrollOffset - _offset
        scrollTo(_top)
      }, 100)
    }

    function scrollTo (_top) {
      $('html, body').animate({
        scrollTop: _top
      }, _scrollSpeed, function () { $scope.scrolling = false } )
    }

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
