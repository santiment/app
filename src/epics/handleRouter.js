import { Observable } from 'rxjs'
import { push } from 'react-router-redux'
import { checkIsLoggedIn } from './../pages/UserSelectors'

const ignoredPages = ['/privacy-policy', '/roadmap']

const handleRouter = (action$, store, { client }) =>
  action$
    .ofType('@@router/LOCATION_CHANGE')
    .filter(({ payload = { pathname: '' } }) => {
      const state = store.getState()
      const { privacyPolicyAccepted = false } = state.user.data
      const isLoggedIn = checkIsLoggedIn(state)

      return (
        !state.user.isLoading &&
        isLoggedIn &&
        !privacyPolicyAccepted &&
        !ignoredPages.includes(payload.pathname)
      )
    })
    .exhaustMap(() => Observable.of(push('/gdpr')))

export default handleRouter
