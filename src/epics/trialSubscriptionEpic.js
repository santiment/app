import gql from 'graphql-tag'
import * as Sentry from '@sentry/react'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import * as actions from './../actions/types'
import { getCoupon } from '../utils/coupon'
import { USER_SUBSCRIPTIONS_QUERY } from '../queries/plans'

export const TRIAL_SUBSCRIPTION_MUTATION = gql`
  mutation createPromoSubscription($coupon: String!) {
    createPromoSubscription(couponCode: $coupon) {
      id
      cancelAtPeriodEnd
      currentPeriodEnd
      trialEnd
      plan {
        id
        name
        amount
        interval
        product {
          id
          name
        }
      }
    }
  }
`

const updateCache = (
  cache,
  { data: { createPromoSubscription: subscriptions } }
) => {
  const { currentUser = {} } = cache.readQuery({
    query: USER_SUBSCRIPTIONS_QUERY
  })

  currentUser.subscriptions = subscriptions

  cache.writeQuery({
    query: USER_SUBSCRIPTIONS_QUERY,
    data: { currentUser: { ...currentUser } }
  })
}

const getTrial$ = client => {
  const coupon = getCoupon()

  if (!coupon) return Observable.empty()

  return Observable.from(
    client.mutate({
      mutation: TRIAL_SUBSCRIPTION_MUTATION,
      variables: { coupon },
      update: updateCache
    })
  )
    .mergeMap(() =>
      Observable.of(
        showNotification('Your trial account will be valid for 14 days')
      )
    )
    .catch(Sentry.captureException)
}

export const trialSubscriptionEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_LOGIN_SUCCESS)

    .mergeMap(({ user: { privacyPolicyAccepted } }) => {
      return privacyPolicyAccepted
        ? getTrial$(client)
        : action$
          .ofType(actions.USER_SETTING_GDPR)
          .filter(
            ({ payload: { privacyPolicyAccepted } }) => privacyPolicyAccepted
          )
          .switchMap(() => getTrial$(client))
    })
    .take(1)
