import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import * as actions from './../actions/types'
import { getCoupon } from '../utils/coupon'

export const TRIAL_SUBSCRIPTION_MUTATION = gql`
  mutation createPromoSubscription($coupon: String!) {
    createPromoSubscription(couponCode: $coupon) {
      id
      trialEnd
      status
      plan {
        id
        name
        product {
          name
        }
      }
    }
  }
`

export const trialSubscriptionEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_SETTING_GDPR)
    .filter(({ payload: { privacyPolicyAccepted } }) => privacyPolicyAccepted)
    .switchMap(() => {
      const coupon = getCoupon()

      if (!coupon) return Observable.empty()

      return Observable.from(
        client.mutate({
          mutation: TRIAL_SUBSCRIPTION_MUTATION,
          variables: { coupon }
        })
      )
        .mergeMap(() =>
          Observable.of(
            showNotification('Your trial account will be valid for 14 days')
          )
        )
        .catch(console.error)
    })
