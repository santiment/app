function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import gql from 'graphql-tag';
import * as Sentry from '@sentry/react';
import { Observable } from 'rxjs';
import { showNotification } from './../actions/rootActions';
import * as actions from './../actions/types';
import { getCoupon } from '../utils/coupon';
import { USER_SUBSCRIPTIONS_QUERY } from '../queries/plans';
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
`;

const updateCache = (cache, {
  data: {
    createPromoSubscription: subscriptions
  }
}) => {
  const {
    currentUser = {}
  } = cache.readQuery({
    query: USER_SUBSCRIPTIONS_QUERY
  });
  currentUser.subscriptions = subscriptions;
  cache.writeQuery({
    query: USER_SUBSCRIPTIONS_QUERY,
    data: {
      currentUser: _objectSpread({}, currentUser)
    }
  });
};

const getTrial$ = client => {
  const coupon = getCoupon();
  if (!coupon) return Observable.empty();
  return Observable.from(client.mutate({
    mutation: TRIAL_SUBSCRIPTION_MUTATION,
    variables: {
      coupon
    },
    update: updateCache
  })).mergeMap(() => Observable.of(showNotification('Your trial account will be valid for 14 days'))).catch(Sentry.captureException);
};

export const trialSubscriptionEpic = (action$, store, {
  client
}) => action$.ofType(actions.USER_LOGIN_SUCCESS).mergeMap(({
  user: {
    privacyPolicyAccepted
  }
}) => {
  return privacyPolicyAccepted ? getTrial$(client) : action$.ofType(actions.USER_SETTING_GDPR).filter(({
    payload: {
      privacyPolicyAccepted
    }
  }) => privacyPolicyAccepted).switchMap(() => getTrial$(client));
}).take(1);