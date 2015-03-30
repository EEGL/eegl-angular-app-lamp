'use strict';

/**
*  My app
*
* provides routing
*/
angular.module('myApp', [
    'ngTouch',
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'angular-images-loaded',
    'angular-inview',
    'eegl-ng-seo',
    'eegl-ng-dynamostates'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true)

    // The known route, initial side load
    $urlRouterProvider.when('', '/')

    $urlRouterProvider.when('/index.html', '/')
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: '/templates/main.html',
        controller: 'HomeCtr',
        data: {
          title:'Home',
          seoDescription: '',
          seoKeywords: '',
          slug: 'home'
        }
      })
      .state('404', {
        url: '/404',
        templateUrl: '/templates/404.html',
        controller: 'SubpageCtr',
        data: {
          title:'404',
          seoDescription: 'Sorry, there is nothing here',
          seoKeywords: '',
          slug: '404'
        }
      })
      .state('terms', {
        url: '/terms',
        templateUrl: '/templates/terms.html',
        controller: 'SubpageCtr',
        data: {
          title:'Terms and Conditions',
          seoDescription: '',
          seoKeywords: '',
          slug: 'terms'
        }
      })
      .state('privacy', {
        url: '/privacy?scrollTo',
        templateUrl: '/templates/privacy.html',
        controller: 'SubpageCtr',
        data: {
          title:'Privacy Policy',
          seoDescription: '',
          seoKeywords: '',
          slug: 'privacy'
        }
      })

    // For any unmatched url, send to 404
    $urlRouterProvider.otherwise('/404')
  })
  .animation('.an-reveal', function ($timeout) {
    return {
      enter: function(element, done) {

        $('html, body').velocity('scroll', { duration: 300 } )
        
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
  })