import {GA_TRACKING_CODE} from './constants.js';
// taken from ga-react-router

'use strict';
console.log("foo");
console.log(typeof GA_TRACKING_CODE);
if(typeof window !== 'undefined' && typeof GA_TRACKING_CODE !== 'undefined') {
  (function(window, document, script, url, r, tag, firstScriptTag) {
    window['GoogleAnalyticsObject']=r;
    window[r] = window[r] || function() {
      (window[r].q = window[r].q || []).push(arguments)
    };
    window[r].l = 1*new Date();
    tag = document.createElement(script),
    firstScriptTag = document.getElementsByTagName(script)[0];
    tag.async = 1;
    tag.src = url;
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  })(
    window,
    document,
    'script',
    ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js',
    'ga'
  );

  var ga = window.ga;

  ga('create', GA_TRACKING_CODE, 'auto');

  module.exports = function() {
    return window.ga.apply(window.ga, arguments);
  };
} else {
  module.exports = function() {console.log(arguments)};
}
