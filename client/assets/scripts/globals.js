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

window.global = {
  height    : $(window).height(),
  iOS       : /(iPad|iPhone|iPod)/g.test( navigator.userAgent ),
  ie9       : $('html').hasClass('ie9'),
  touch     : $('html').hasClass('touch'),
}
window.global.mediaQuery = getMediaQuery()
window.global.width = $(window).width()
window.global.height = $(window).height()
$(window).on('resize', function(){
  window.global.mediaQuery = getMediaQuery()
  window.global.width = $(window).width()
  window.global.height = $(window).height()
})

var extension = location.hostname.split('.')
if (extension[extension.length-1] == 'dev') {
  window.global.dev = true
}
