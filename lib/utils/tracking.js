const _excluded = ["action", "category", "label"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { initTwitterPixel } from 'san-webkit/lib/analytics/twitter';
import { initAmplitude, updateAmplitude } from 'san-webkit/lib/analytics/amplitude';
const TRACKER_IDs = ['UA-100571693-1', 'UA-100571693-2'];
const APP_NAME = 'Sanbase';
const OPTIMIZE_ID = 'OPT-TKTHGHT';
export const NAVBAR_EXPERIMENT_ID = 'CG6tK8zVQ9Ww9wb7WJtYmg';
export const isBrowser = typeof window !== 'undefined';
export const isProdApp = window.location.origin === 'https://app.santiment.net';
export const hasDoNotTrack = () => {
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}; // GA strings need to have trailing whitespace trimmed,

function trim(s) {
  return s.replace(/^\s+|\s+$/g, '');
}

function mixScript(src) {
  const script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = src;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

function loadScript() {
  mixScript('//www.googletagmanager.com/gtag/js?id=' + TRACKER_IDs[0]);
  mixScript('//www.googleoptimize.com/optimize.js?id=' + OPTIMIZE_ID);
}

export function initializeTracking(trackerIDs = TRACKER_IDs) {
  if (isBrowser && isProdApp && !hasDoNotTrack()) {
    loadScript();
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      window.dataLayer.push(arguments);
    }

    window.gtag = gtag;
    gtag('js', new Date());
    trackerIDs.forEach(function (ID) {
      gtag('config', ID, {
        app_name: APP_NAME
      });
    });
    initTwitterPixel();
    initAmplitude();
  }
}
export const update = isBrowser && isProdApp && !hasDoNotTrack() ? user => {
  window.gtag('set', {
    user_id: user.id
  });
  window.gtag('event', 'screen_view', {
    app_name: APP_NAME,
    app_version: process.env.REACT_APP_VERSION
  });
  window.Intercom('update', {
    name: user.username,
    user_id: user.id,
    email: user.email,
    ethAccounts: user.ethAccounts,
    nightmode: (user.settings || {}).theme,
    app_version: process.env.REACT_APP_VERSION
  });
  updateAmplitude(user.id, user.username, user.email);
} : () => {};
/**
 * Use the event command to send event data
 *
 * @example
 *
 *   event({
 *     category: 'user',
 *     action: 'sign_up'
 *     method: 'metamask',
 *   })
 */
// Please, use useTrackEvents hook from /hooks/tracking if it's possible

export const event = isBrowser && isProdApp && !hasDoNotTrack() ? (_ref, type = ['ga']) => {
  let {
    action,
    category,
    label
  } = _ref,
      values = _objectWithoutProperties(_ref, _excluded);

  if (type.includes('ga')) {
    window.gtag('event', action, _objectSpread({
      event_category: category,
      event_label: label
    }, values));
  }

  if (type.includes('intercom')) {
    window.Intercom('trackEvent', action, _objectSpread({
      event_category: category,
      event_label: label
    }, values));
  }

  if (type.includes('twitter')) {
    window.twq('track', action, _objectSpread({
      content_type: category,
      content_name: label
    }, values));
  }
} : () => {};
/**
 * pageview:
 * Basic GA pageview tracking
 * @param  {String} path - the current page e.g. '/about'
 * @param {Array} trackerIDs - (optional) a list of extra trackers to run the command on
 */

export function pageview(rawPath, trackerIDs = TRACKER_IDs) {
  if (!isBrowser || !isProdApp || hasDoNotTrack()) {
    return;
  } // path is required in .pageview()


  if (!rawPath) {
    return;
  }

  const path = trim(rawPath); // path cannot be an empty string in .pageview()

  if (path === '') {
    return;
  }

  if (typeof window.gtag === 'function') {
    trackerIDs.forEach(function (ID) {
      window.gtag('config', ID, {
        page_path: path,
        app_name: APP_NAME
      });
    });
  }
}
export default {
  initializeTracking,
  event,
  pageview,
  update
};