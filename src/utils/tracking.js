const TRACKER_IDs = ['UA-100571693-1', 'UA-100571693-2']

const isBrowser = typeof window !== 'undefined'
const hasDoNotTrack = () => {
  const dnt =
    navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack
  return dnt !== '1' && dnt !== 'yes'
}
// GA strings need to have leading/trailing whitespace trimmed,
// and not all browsers have String.prototoype.trim()
function trim (s) {
  return s.replace(/^\s+|\s+$/g, '')
}

function loadScript () {
  const importGTAG = document.createElement('script')
  importGTAG.async = true
  importGTAG.type = 'text/javascript'
  importGTAG.src = '//www.googletagmanager.com/gtag/js?id=' + TRACKER_IDs[0]

  const head = document.getElementsByTagName('head')[0]
  head.appendChild(importGTAG)
}

export function initialize (trackerIDs = TRACKER_IDs) {
  if (isBrowser && process.env.BACKEND_URL === 'https://api.santiment.net') {
    if (hasDoNotTrack()) {
      console.debug('Respecting Do-Not-Track')
    } else {
      loadScript()
      window.dataLayer = window.dataLayer || []
      function gtag () {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())

      trackerIDs.forEach(function (ID) {
        gtag('config', ID)
      })
      window.gtag = gtag
    }
  }
}

/**
 * Use the event command to send event data
 *
 * For help check this - ttps://developers.google.com/gtagjs/reference/api
 * @param <event_name> is event name that you make up, with arbitrary (i.e. custom) parameters
 * @param <event_params> is one or more parameter-value pairs. Each pair separated by a comma
 *
 * @example
 *
 *   sendEvent('sign_up', {
 *     method: 'metamask',
 *   })
 */
export const event =
  isBrowser && process.env.BACKEND_URL === 'https://api.santiment.net'
    ? (...args) => window.gtag('event', ...args)
    : () => {}

/**
 * pageview:
 * Basic GA pageview tracking
 * @param  {String} path - the current page page e.g. '/about'
 * @param {Array} trackerIDs - (optional) a list of extra trackers to run the command on
 */

export function pageview (rawPath, trackerIDs = TRACKER_IDs) {
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
      window.gtag('config', ID, { page_path: path })
    })
  }
}

export default {
  initializeTracking: initialize,
  event,
  pageview
}
