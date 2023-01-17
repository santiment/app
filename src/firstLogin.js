import { query } from 'webkit/api'
import { parseAuthSearchParams } from 'webkit/utils/auth'
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
    if (window.isFirstLogin) {
      window.onGdprAccept = () => {
        trackSignupFinish(auth)
      }
    } else {
      trackLoginFinish(auth)
    }

    window.history.replaceState(window.history.state, null, window.location.pathname)
  }
})
