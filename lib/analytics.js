'use babel';
// Don't use flow

import {GA_TRACKING_CODE} from './constants.js';

// taken from ga-react-router
if (typeof window !== 'undefined' && typeof GA_TRACKING_CODE !== 'undefined') {
  var scriptURL = ((document.location.protocol == 'https:')
      ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  (function(window, document, script, url, r, tag, firstScriptTag) {
    window.GoogleAnalyticsObject = r;
    window[r] = window[r] || function() {
      (window[r].q = window[r].q || []).push(arguments);
    };
    window[r].l = 1 * new Date();
    tag = document.createElement(script);
    firstScriptTag = document.getElementsByTagName(script)[0];
    tag.async = 1;
    tag.src = url;
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  })(
    window,
    document,
    'script',
    scriptURL,
    'ga'
  );

  var ga = window.ga;
  ga('create', GA_TRACKING_CODE, 'auto');
  module.exports = (state) => {
    ga('send', 'pageview', {
      'page': state.path
    });
  };
} else {
  module.exports = (state) => {
    console.log(state);
  };
}
