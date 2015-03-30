'use strict';

/*
 * Load the site data from the API
 */
$.ajax({
  url: '/api/',
  async: false,
  success: function(data){
    if( !window.global ) { window.global = {} }
    window.global.data = data
  }
})