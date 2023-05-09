function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { buildRefetcher, update } from './utils';
import { client } from '../../apollo';
import { PLANS, getSanbaseSubscription, calculateTrialDaysLeft, STATUSES } from '../../utils/plans';
const {
  PRO,
  PRO_PLUS
} = PLANS;
export const USER_SUBSCRIPTIONS_QUERY = gql`
  {
    currentUser {
      id
      isEligibleForSanbaseTrial
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
  }
`;
export const refetchUserSubscriptions = buildRefetcher(USER_SUBSCRIPTIONS_QUERY);
export function updateUserSubscriptions(newUserSubscriptions) {
  const {
    currentUser
  } = client.readQuery({
    query: USER_SUBSCRIPTIONS_QUERY
  });
  client.writeQuery({
    query: USER_SUBSCRIPTIONS_QUERY,
    data: {
      currentUser: newUserSubscriptions && _extends({}, currentUser, {
        subscriptions: update(currentUser.subscriptions, newUserSubscriptions)
      })
    }
  });
}
export function useUserSubscriptions() {
  const query = useQuery(USER_SUBSCRIPTIONS_QUERY);
  return useMemo(() => {
    const {
      loading,
      data
    } = query;
    return {
      loading,
      isEligibleForSanbaseTrial: data && data.currentUser && data.currentUser.isEligibleForSanbaseTrial,
      subscriptions: data && data.currentUser && data.currentUser.subscriptions
    };
  }, [query]);
}
export function useUserSubscription() {
  const data = useUserSubscriptions();
  return useMemo(() => {
    const {
      loading,
      subscriptions,
      isEligibleForSanbaseTrial
    } = data;
    return {
      loading,
      isEligibleForSanbaseTrial,
      subscription: subscriptions && getSanbaseSubscription(subscriptions)
    };
  }, [data]);
}
export function useUserSubscriptionStatus() {
  const data = useUserSubscription();
  return useMemo(() => {
    const {
      loading,
      subscription,
      isEligibleForSanbaseTrial
    } = data;
    let isPro = false;
    let isProPlus = false;
    let isTrial = false;
    let trialDaysLeft = null;

    if (subscription) {
      const {
        trialEnd,
        plan,
        status
      } = subscription;
      isProPlus = plan.name === PRO_PLUS;
      isPro = isProPlus || plan.name === PRO;
      trialDaysLeft = status === STATUSES.TRIALING && trialEnd && calculateTrialDaysLeft(trialEnd);
      isTrial = trialDaysLeft > 0 && status === STATUSES.TRIALING;
    }

    return {
      loading,
      isPro,
      isProPlus,
      isTrial,
      trialDaysLeft,
      isEligibleForSanbaseTrial
    };
  }, [data]);
}