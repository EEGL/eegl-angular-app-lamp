'use strict';

angular.module('myApp')
  .filter('snakeCase', function() {
    return function(text) {
      return (text) ? text.trim().replace(' ', '_') : ''
    }
  })
  .filter('ytembed', function () {
    return function (input) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = input.match(regExp);
      if (match && match[2].length === 11) {
          return '//www.youtube.com/embed/' + match[2];
      }
      return '//';
    };
  })
  .filter('trusted', ['$sce', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url)
    }
  }])
  .filter('phoneNumber', function() {
    return function(text) {
      if( text === 'NOT_DEFINED' ) return ''
      return (text) ? text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : ''
    }
  })
  .filter('limitDecimals', function() {
    return function(number) {
      return (number) ? number.toFixed(1) : ''
    }
  })
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse()
    }
  })
  .filter('characters', function () {
    // --- from: https://github.com/sparkalow/angular-truncate
    return function (input, chars, breakOnWord) {
        if (isNaN(chars)) return input
        if (chars <= 0) return ''
        if (input && input.length > chars) {
            input = input.substring(0, chars)

            if (!breakOnWord) {
                var lastspace = input.lastIndexOf(' ')
                //get last space
                if (lastspace !== -1) {
                    input = input.substr(0, lastspace)
                }
            }else{
                while(input.charAt(input.length-1) === ' '){
                    input = input.substr(0, input.length -1)
                }
            }
            return input + '…'
        }
        return input
    }
    })
    .filter('splitcharacters', function() {
      // --- from: https://github.com/sparkalow/angular-truncate
      return function (input, chars) {
          if (isNaN(chars)) return input
          if (chars <= 0) return ''
          if (input && input.length > chars) {
              var prefix = input.substring(0, chars/2)
              var postfix = input.substring(input.length-chars/2, input.length)
              return prefix + '...' + postfix
          }
          return input
      }
    })
    .filter('words', function () {
      // --- from: https://github.com/sparkalow/angular-truncate
      return function (input, words) {
          if (isNaN(words)) return input
          if (words <= 0) return ''
          if (input) {
              var inputWords = input.split(/\s+/)
              if (inputWords.length > words) {
                  input = inputWords.slice(0, words).join(' ') + '…'
              }
          }
          return input
      }
    })