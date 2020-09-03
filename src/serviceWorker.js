const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

const addSw = (swUrl, config) => {
  if (isLocalhost) {
    // This is running on localhost. Let's check if a service worker still exists or not.
    checkValidServiceWorker(swUrl, config)

    // Add some additional logging to localhost, pointing developers to the
    // service worker/PWA documentation.
    navigator.serviceWorker.ready.then(() => {
      console.log('Sanbase is being served cache-first by a service')
    })
  } else {
    // Is not localhost. Just register service worker
    registerValidSW(swUrl, config)
  }
}

const canExecuteSw = () => {
  // The URL constructor is available in all browsers that support SW.
  // Our service worker won't work if PUBLIC_URL is on a different origin
  // from what our page is served on. This might happen if a CDN is used to
  // serve assets; see https://github.com/facebook/create-react-app/issues/2374
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.origin)
  return publicUrl.origin === window.location.origin
}

export function register (config) {
  if (
    (process.env.NODE_ENV === 'production' || isLocalhost) &&
    'serviceWorker' in navigator &&
    canExecuteSw()
  ) {
    addSw(`${process.env.PUBLIC_URL}/service-worker.js`, config)
  }
}

export function registerSonarActivitiesSw (config) {
  if ('serviceWorker' in navigator && canExecuteSw()) {
    console.log('Register sonar service worker')
    addSw(`${process.env.PUBLIC_URL}/san-sonar-service-worker.js`, config)
  }
}

export const requestNotificationPermission = (success, reject) => {
  const permission = window.Notification.requestPermission()
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.

  permission.then(p => {
    if (p !== 'granted') {
      console.warn('Permission not granted for Notification')
      reject && reject()
    } else {
      success && success()
    }
  })
}

function registerValidSW (
  swUrl,
  {
    callback,
    hideRegistrationChecking,
    markAsLatestApp,
    onUpdate,
    onSuccess
  } = {}
) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      if (!hideRegistrationChecking) {
        const activeWorker = registration.active

        registration.onupdatefound = () => {
          const installingWorker = registration.installing

          if (installingWorker == null) {
            return
          }

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // At this point, the updated precached content has been fetched,
                // but the previous service worker will still serve the older
                // content until all client tabs are closed.
                console.log(
                  'New content is available and will be used when all ' +
                    'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                )

                registration.needUpdates = true

                // Execute callback
                if (onUpdate) {
                  onUpdate(registration)
                }
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a
                // "Content is cached for offline use." message.
                console.log('Content is cached for offline use.')

                // Execute callback
                if (onSuccess) {
                  onSuccess(registration)
                }
              }
            }
          }
        }

        setTimeout(() => {
          if (!registration.needUpdates && markAsLatestApp) {
            markAsLatestApp()
          }
        }, 5000)
      } else {
        registration.update()
        callback && callback()
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker (swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type')
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config)
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    })
}

export function unregister () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}
