import { initTwitterPixel } from 'webkit/analytics/twitter'

const TRACKER_IDs = ['UA-100571693-1', 'UA-100571693-2']
const APP_NAME = 'Sanbase'
const OPTIMIZE_ID = 'OPT-TKTHGHT'

export const NAVBAR_EXPERIMENT_ID = 'CG6tK8zVQ9Ww9wb7WJtYmg'
export const isBrowser = typeof window !== 'undefined'
export const isProdApp = window.location.origin === 'https://app.santiment.net'
export const hasDoNotTrack = () => {
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack
  return dnt === '1' || dnt === 'yes'
}

// GA strings need to have trailing whitespace trimmed,
function trim(s) {
  return s.replace(/^\s+|\s+$/g, '')
}

function mixScript(src) {
  const script = document.createElement('script')
  script.async = true
  script.type = 'text/javascript'
  script.src = src

  const head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}

function loadScript() {
  mixScript('//www.googletagmanager.com/gtag/js?id=' + TRACKER_IDs[0])
  mixScript('//www.googleoptimize.com/optimize.js?id=' + OPTIMIZE_ID)
}

export function initializeTracking(trackerIDs = TRACKER_IDs) {
  if (isBrowser && isProdApp && !hasDoNotTrack()) {
    loadScript()
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())

    trackerIDs.forEach(function (ID) {
      gtag('config', ID, { app_name: APP_NAME })
    })

    initTwitterPixel()
  }
}

export const update =
  isBrowser && isProdApp && !hasDoNotTrack()
    ? (user) => {
        window.gtag('set', {
          user_id: user.id,
        })
        window.gtag('event', 'screen_view', {
          app_name: APP_NAME,
          app_version: process.env.REACT_APP_VERSION,
        })
        window.Intercom('update', {
          name: user.username,
          user_id: user.id,
          email: user.email,
          ethAccounts: user.ethAccounts,
          nightmode: (user.settings || {}).theme,
          app_version: process.env.REACT_APP_VERSION,
        })
      }
    : () => {}

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

export const event =
  isBrowser && isProdApp && !hasDoNotTrack()
    ? ({ action, category, label, ...values }, type = ['ga']) => {
        if (type.includes('ga')) {
          window.gtag('event', action, {
            event_category: category,
            event_label: label,
            ...values,
          })
        }
        if (type.includes('intercom')) {
          window.Intercom('trackEvent', action, {
            event_category: category,
            event_label: label,
            ...values,
          })
        }
        if (type.includes('twitter')) {
          window.twq('track', action, {
            content_type: category,
            content_name: label,
            ...values,
          })
        }
      }
    : () => {}

/**
 * pageview:
 * Basic GA pageview tracking
 * @param  {String} path - the current page e.g. '/about'
 * @param {Array} trackerIDs - (optional) a list of extra trackers to run the command on
 */
export function pageview(rawPath, trackerIDs = TRACKER_IDs) {
  if (!isBrowser || !isProdApp || hasDoNotTrack()) {
    return
  }
  // path is required in .pageview()
  if (!rawPath) {
    return
  }

  const path = trim(rawPath)

  // path cannot be an empty string in .pageview()
  if (path === '') {
    return
  }

  if (typeof window.gtag === 'function') {
    trackerIDs.forEach(function (ID) {
      window.gtag('config', ID, { page_path: path, app_name: APP_NAME })
    })
  }
}

export default {
  initializeTracking,
  event,
  pageview,
  update,
}
