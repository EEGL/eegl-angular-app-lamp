'use strict';

angular.module('myApp')
  .factory('Api', function ($http) {
    var _url = '/api'

    return {
      getCSRF: function () {
        return $http({
          method          : 'GET',
          url             : _url + '/csrf'
        })
      }
    }
  })