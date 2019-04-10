import Raven from 'raven-js'
import GoogleAnalytics from 'react-ga'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import { replace } from 'react-router-redux'
import { showNotification } from './../actions/rootActions'
import * as actions from './../actions/types'
import { savePrevAuthProvider } from './../utils/localStorage'

export const SUBSCRIPTION_FLAG = 'hasToggledSubscription'

const emailLoginVerifyGQL = gql`
  mutation emailLoginVerify($email: String!, $token: String!) {
    emailLoginVerify(email: $email, token: $token) {
      token
      user {
        id
        email
        username
        privacyPolicyAccepted
        marketingAccepted
        consent_id
        sanBalance
        ethAccounts {
          address
          sanBalance
        }
      }
    }
  }
`

const emailChangeVerifyGQL = gql`
  mutation emailChangeVerify($emailCandidate: String!, $token: String!) {
    emailChangeVerify(emailCandidate: $emailCandidate, token: $token) {
      token
      user {
        id
        email
        username
        privacyPolicyAccepted
        marketingAccepted
        consent_id
        sanBalance
        ethAccounts {
          address
          sanBalance
        }
      }
    }
  }
`

const NEWSLETTER_SUBSCRIPTION_MUTATION = gql`
  mutation changeNewsletterSubscription(
    $subscription: NewsletterSubscriptionType
  ) {
    changeNewsletterSubscription(newsletterSubscription: $subscription) {
      newsletterSubscription
    }
  }
`

export const handleLoginSuccess = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_LOGIN_SUCCESS)
    .mergeMap(action => {
      const {
        token,
        consent,
        user: { email }
      } = action

      const hasSubscribed = localStorage.getItem(SUBSCRIPTION_FLAG)

      if (hasSubscribed) {
        localStorage.removeItem(SUBSCRIPTION_FLAG)
      }

      return Observable.merge(
        Observable.of(showNotification('You are logged in!')),

        consent
          ? Observable.of(replace(`/consent?consent=${consent}&token=${token}`))
          : Observable.empty()
      ).map(() =>
        // NOTE(@vanguard): Delaying mutation because there is possible bug that appolo store have not updated it's store and query will fail
        Observable.timer(2000).subscribe(() =>
          hasSubscribed
            ? client.mutate({
              mutation: NEWSLETTER_SUBSCRIPTION_MUTATION,
              variables: {
                subscription: 'WEEKLY'
              }
            })
            : undefined
        )
      )
    })
    .catch(error => {
      return Observable.of({ type: actions.USER_LOGIN_FAILED, payload: error })
    })

const handleEmailLogin = (action$, store, { client }) =>
  action$.ofType(actions.USER_EMAIL_LOGIN).switchMap(action => {
    const mutationGQL = action.payload.email
      ? emailLoginVerifyGQL
      : emailChangeVerifyGQL
    const mutation = client.mutate({
      mutation: mutationGQL,
      variables: action.payload
    })
    return Observable.from(mutation)
      .mergeMap(({ data }) => {
        const { token, user } = data.emailLoginVerify || data.emailChangeVerify
        GoogleAnalytics.event({
          category: 'User',
          action: 'Success login with email'
        })
        savePrevAuthProvider('email')
        return Observable.of({
          type: actions.USER_LOGIN_SUCCESS,
          token,
          user,
          consent: user.consent_id || null
        })
      })
      .catch(error => {
        Raven.captureException(error)
        GoogleAnalytics.event({
          category: 'User',
          action: 'Failed login with email'
        })
        return Observable.of({
          type: actions.USER_LOGIN_FAILED,
          payload: error
        })
      })
  })

export default handleEmailLogin
