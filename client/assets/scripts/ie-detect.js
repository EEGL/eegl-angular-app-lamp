'use strict';

(function() {
  /*
   * IE hack for grayscale images
   */
  window.global.IE10 = false,
  window.global.IE11 = false

  // IE feature detection from http://www.majas-lapu-izstrade.lv/cross-browser-grayscale-image-example-using-css3-js-v2-0-with-browser-feature-detection-using-modernizr/
  var ie10Styles = [
    'msTouchAction',
    'msWrapFlow'];
  var ie11Styles = [
    'msTextCombineHorizontal'];

    /*
    * Test all IE only CSS properties
    */   
    var d = document;
    var b = d.body;
    var s = b.style;
    var brwoser = null;
    var property;

    // Tests IE10 properties
    for (var i = 0; i < ie10Styles.length; i++) {
      property = ie10Styles[i];
      if (s[property] != undefined) {
        window.global.IE10 = true
        $('html').addClass('ie10')
      }
    }
     
    // Tests IE11 properties
    for (var i = 0; i < ie11Styles.length; i++) {
      property = ie11Styles[i];
      if (s[property] != undefined) {
        window.global.IE11 = true
        $('html').addClass('ie11')
      }
    }
}());