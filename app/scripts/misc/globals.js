'use strict';
var getMediaQuery = function () {
  switch ( $('#media-query-detection').width() ) {
    case 0:
      return 'xs'
    case 768:
      return 'sm'
    case 992:
      return 'md'
    case 1200:
      return 'lg'
    default:
      return false
  }
}
if( !window.global ) { window.global = {} }
window.global.iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent ),
window.global.ie9 = $('html').hasClass('ie9')
window.global.mediaQuery = getMediaQuery()
$(window).on('resize', function(){ window.global.mediaQuery = getMediaQuery() })