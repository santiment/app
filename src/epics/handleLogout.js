import * as Sentry from '@sentry/react'
import { ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import * as actions from './../actions/types'

const handleLogout = (action$, store, { client }) =>
  action$.pipe(
    ofType(actions.USER_LOGOUT_SUCCESS),
    mergeMap(() => {
      return Observable.from(client.clearStore())
        .map(() => {
          return {
            type: actions.APP_USER_HAS_INACTIVE_TOKEN
          }
        })
        .catch(error => {
          Sentry.captureException(error)
          client.cache.reset()
          return Observable.of({
            type: actions.APP_USER_HAS_INACTIVE_TOKEN,
            payload: {
              error
            }
          })
        })
    })
  )

export default handleLogout
