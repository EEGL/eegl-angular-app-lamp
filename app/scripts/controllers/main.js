'use strict';

angular.module('myApp')
  .controller('AppCtr',  function ($scope, $rootScope, $timeout, $location, PageTitle, MetaInformation, Api, $state, $interval) {

    /* --------------------------
     * Private variables
     * -------------------------- */
    
    /* --------------------------
     * Public variables
     * -------------------------- */

    // -- Underscore --
    $scope._ = _


    /* ---- Site data ---- */
    if( window.global.data ) {
      $scope.siteData = window.global.data
    }
    
    /* ---- SEO ---- */
    PageTitle.setGlobalTitle( 'Sitetitle | ' )
    $scope.PageTitle = PageTitle
    $scope.MetaInformation = MetaInformation
    /* ---- ------- ---- */

    /* --------------------------
     * Public methods
     * -------------------------- */


    /* --------------------------
     * Private methods
     * -------------------------- */

    function scrollHandler (section, fromName) {
      $scope.scrolling = true
      if( fromName && fromName.indexOf('home') > -1 ) {
        var _top = angular.element('#' + section).offset().top - _scrollOffset
        scrollTo(_top)
      } else {
        $timeout(function () {
          var _top = angular.element('#' + section).offset().top - _scrollOffset
          scrollTo(_top)
        }, 300)
      }
    }

    function scrollTo (_top) {
      $('html, body').animate({ 
        scrollTop: _top
      }, _scrollSpeed, function () { $scope.scrolling = false } )
    }


    /* --------------------------
     * Event Handlers
     * -------------------------- */

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, from, fromParams) {
      console.log('Route changed...')

      // --- SEO ---
      PageTitle.setTitle(toState.data.title)
      MetaInformation.setMetaDescription(toState.data.seoDescription)
      MetaInformation.setMetaKeywords(toState.data.seoKeywords)

      
      // --- STATE MACHINE ---
      console.log('state: ', toState.name)

      switch( toState.name ) {
        default:
          break
      }
    })

    // --- ASSET LOADING ---
    $scope.imgLoadedEvents = {
        always: function(instance) {
          // Do stuff
        },
        done: function(instance) {
          // console.log('loaded', instance)
          if( window.global.data ) {
            $scope.loaded = true
          }
        },
        fail: function(instance) {
          // Do stuff
        }
    }
    if( window.global.ie9 && window.global.data ) { $scope.loaded = true }

    // // check if data is loaded - it's async, so we are using promises
    // if( $scope.imagesLoaded && window.global.data ) {
    //   $scope.loaded = true
    // } else {
    //   var _loaded = $interval(function(){
    //     if( $scope.imagesLoaded && window.global.data ) {
    //       $scope.loaded = true
    //       $interval.cancel(_loaded)
    //     }
    //   }, 200)
    // }

  })