import * as Sentry from '@sentry/react'
import { Observable } from 'rxjs'
import gql from 'graphql-tag'
import { replace } from 'react-router-redux'
import { track } from 'webkit/analytics'
import { TwitterTrackActions, trackTwitterSignUpEvent } from 'webkit/analytics/twitter'
import { getSaveLoginMethod } from 'webkit/analytics/events/utils'
import { trackLoginFinish, LoginType } from 'webkit/analytics/events/general'
import { trackSignupFinish } from 'webkit/analytics/events/onboarding'
import { changeDigestSubscription, showNotification } from '../actions/rootActions'
import * as actions from './../actions/types'
import { savePrevAuthProvider } from '../utils/localStorage'
import GA from './../utils/tracking'
import { setCoupon } from '../utils/coupon'
import { USER_GQL_FRAGMENT } from './handleLaunch'
import { NEWSLETTER_SUBSCRIPTION_MUTATION } from '../pages/Account/gql'

const EMAIL_LOGIN_VERIFY_MUTATION = gql`
  mutation emailLoginVerify($email: String!, $token: String!) {
    emailLoginVerify(email: $email, token: $token) {
      token
      user
        ${USER_GQL_FRAGMENT}
    }
  }
`

const EMAIL_CHANGE_VERIFY_MUTATION = gql`
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
        avatarUrl
        ethAccounts {
          address
        }
      }
    }
  }
`

export const handleLoginSuccess = (action$) =>
  action$
    .ofType(actions.USER_LOGIN_SUCCESS)
    .mergeMap((action) => {
      const { token, consent, user } = action

      const loggedEmails = localStorage.getItem('loggedEmails') || ''
      const { email } = user

      window.$FPROM &&
        window.$FPROM.trackSignup(
          {
            email,
            // TODO: add this after we will have this info --> uid:<user-billing-id>
          },
          function () {
            console.log('Pss... :) This is awesome!')
          },
        )
      GA.update(user)

      const { method = LoginType.EMAIL } = getSaveLoginMethod() || {}
      if (user.firstLogin) {
        trackSignupFinish(method)
      } else {
        trackLoginFinish(method)
      }

      if (user.firstLogin || (email && !loggedEmails.includes(email))) {
        trackTwitterSignUpEvent()
        track.event(TwitterTrackActions.signup, {
          content_category: 'contact form',
          content_name: 'sign-up',
        })
        if (email) {
          localStorage.setItem('loggedEmails', loggedEmails + email + ';')
        }
      }

      return Observable.merge(
        Observable.of(showNotification('You are logged in!')),
        consent
          ? Observable.of(replace(`/consent?consent=${consent}&token=${token}`))
          : Observable.empty(),
      )
    })
    .catch((error) => {
      return Observable.of({ type: actions.USER_LOGIN_FAILED, payload: error })
    })

export const digestSubscriptionEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_LOGIN_SUCCESS)
    .take(1)
    .mergeMap(({ subscribeToWeeklyNewsletter, user: { privacyPolicyAccepted } }) =>
      (privacyPolicyAccepted ? Observable.of(true) : action$.ofType(actions.USER_SETTING_GDPR))
        .delayWhen(() => Observable.timer(2000))
        .take(1)
        .mergeMap((action) => {
          if (subscribeToWeeklyNewsletter) {
            return Observable.from(
              client.mutate({
                mutation: NEWSLETTER_SUBSCRIPTION_MUTATION,
                variables: {
                  subscription: 'WEEKLY',
                },
              }),
            ).mergeMap(() => Observable.of(changeDigestSubscription()))
          }

          return Observable.empty()
        }),
    )

const handleEmailLogin = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_EMAIL_LOGIN)
    .takeUntil(action$.ofType(actions.USER_LOGIN_SUCCESS))
    .switchMap((action) => {
      setCoupon(action.payload.coupon)
      const mutationGQL = action.payload.email
        ? EMAIL_LOGIN_VERIFY_MUTATION
        : EMAIL_CHANGE_VERIFY_MUTATION
      const mutation = client.mutate({
        mutation: mutationGQL,
        variables: action.payload,
      })

      return Observable.from(mutation)
        .mergeMap(({ data }) => {
          const { token, user } = data.emailLoginVerify || data.emailChangeVerify
          GA.event({
            category: 'User',
            action: 'Success login with email',
          })
          savePrevAuthProvider('email')
          return Observable.of({
            type: actions.USER_LOGIN_SUCCESS,
            token,
            user,
            consent: user.consent_id || null,
            subscribeToWeeklyNewsletter: action.payload.subscribe_to_weekly_newsletter === 'true',
          })
        })
        .catch((error) => {
          Sentry.captureException(error)
          GA.event({
            category: 'User',
            action: 'Failed login with email',
          })
          return Observable.of({
            type: actions.USER_LOGIN_FAILED,
            payload: error,
          })
        })
    })

export default handleEmailLogin
