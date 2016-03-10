(function() {
  'use strict'


  angular.module('app')
    .config(config)

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider, $locationProvider, PageTitleProvider) {
    $locationProvider.html5Mode(true)

    // Site title, format: {pagetitle} {separator} {globalTitle}
    PageTitleProvider.config({
      globalTitle: 'Sitetitle',
      seperator: ' | ',
      position: 'postfix'
    })

    // The known route, initial side load
    $urlRouterProvider.when('', '/')
    $urlRouterProvider.when('/index.html', '/')

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/app/home/home.html',
        controller: 'HomeController',
        data: {
          title: 'Home',
          description: '',
          keywords: '',
          slug: 'home'
        }
      })
      .state('404', {
        url: '/404',
        templateUrl: '/app/subpages/404.html',
        data: {
          title: '404',
          description: 'Sorry, it appears the page you were looking for doesn’t exist anymore or may have moved. Go back to our Home Page to explore more.',
          keywords: '',
          slug: '404'
        }
      })
      .state('terms', {
        url: '/terms',
        templateUrl: '/app/subpages/terms.html',
        data: {
          title: 'Terms and Conditions',
          description: '',
          keywords: '',
          slug: 'terms'
        }
      })
      .state('privacy', {
        url: '/privacy',
        templateUrl: '/app/subpages/privacy.html',
        data: {
          title: 'Privacy Policy',
          description: '',
          keywords: '',
          slug: 'privacy'
        }
      })

    // For any unmatched url, send to 404
    $urlRouterProvider.otherwise('/404')

  }

})()
