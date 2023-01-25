import { query } from 'webkit/api'
import { parseAuthSearchParams } from 'webkit/utils/auth'
import { Tracker } from 'webkit/analytics'
import { trackLoginFinish } from 'webkit/analytics/events/general'
import { trackSignupFinish } from 'webkit/analytics/events/onboarding'

query(`{
  currentUser {
    firstLogin
  }
}`).then(({ currentUser }) => {
  window.isFirstLogin = Boolean(currentUser && currentUser.firstLogin)

  const { auth } = parseAuthSearchParams()

  if (auth) {
    trackSignupLogin(auth)
    window.history.replaceState(window.history.state, null, window.location.pathname)
  }
})

export function trackSignupLogin(method) {
  if (window.isFirstLogin) {
    trackSignupFinish(method, [Tracker.GA, Tracker.AMPLITUDE])

    window.onGdprAccept = () => trackSignupFinish(method, [Tracker.SAN])
  } else {
    trackLoginFinish(method)
  }
}
