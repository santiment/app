import * as Sentry from '@sentry/react'
import { ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import gql from 'graphql-tag'
import { hasMetamask } from '../web3Helpers'
import * as actions from './../actions/types'

export const USER_GQL_FRAGMENT = gql`
  {
    firstLogin
    id
    email
    username
    sanBalance
    privacyPolicyAccepted
    marketingAccepted
    consent_id
    avatarUrl
    ethAccounts {
      address
    }
    settings {
      newsletterSubscription
      isBetaMode
      theme
      isPromoter
    }
    apikeys
    subscriptions {
      id
      status
      trialEnd
      cancelAtPeriodEnd
      currentPeriodEnd
      plan {
        id
        name
        amount
        interval
        product {
          id
        }
      }
    }
  }
`
export const USER_EMAIL_LOGIN_QEURY = gql`
  query {
    currentUser
      ${USER_GQL_FRAGMENT}
  }
`

const handleLaunch = (action$, store, { client }) =>
  action$.pipe(
    ofType(actions.APP_LAUNCHED),
    mergeMap(() => {
      const queryPromise = client.query({
        options: { fetchPolicy: 'network-only' },
        query: USER_EMAIL_LOGIN_QEURY
      })
      return Observable.from(queryPromise)
        .map(({ data }) => {
          if (data.currentUser) {
            return {
              type: actions.CHANGE_USER_DATA,
              user: data.currentUser,
              hasMetamask: hasMetamask()
            }
          }
          client.cache.reset()
          return {
            type: actions.APP_USER_HAS_INACTIVE_TOKEN
          }
        })
        .catch(error => {
          Sentry.captureException(error)
          client.cache.reset()
          if (!/Network error/.test(error)) {
            return Observable.of({
              type: actions.APP_USER_HAS_INACTIVE_TOKEN,
              payload: {
                error
              }
            })
          }
          return Observable.of({
            type: '_'
          })
        })
        .takeUntil(action$.ofType(actions.USER_LOGIN_SUCCESS))
    })
  )

export default handleLaunch
