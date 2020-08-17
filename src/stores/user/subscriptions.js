import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { buildRefetcher, update } from './utils'
import { client } from '../../apollo'
import {
  PLANS,
  getSanbaseSubscription,
  calculateTrialDaysLeft
} from '../../utils/plans'

const { PRO } = PLANS

export const USER_SUBSCRIPTIONS_QUERY = gql`
  {
    currentUser {
      id
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
`

export const refetchUserSubscriptions = buildRefetcher(USER_SUBSCRIPTIONS_QUERY)

export function updateUserSubscriptions (newUserSubscriptions) {
  const { currentUser } = client.readQuery({
    query: USER_SUBSCRIPTIONS_QUERY
  })

  client.writeQuery({
    query: USER_SUBSCRIPTIONS_QUERY,
    data: {
      currentUser:
        newUserSubscriptions &&
        Object.assign({}, currentUser, {
          subscriptions: update(currentUser.subscriptions, newUserSubscriptions)
        })
    }
  })
}

export function useUserSubscriptions () {
  const query = useQuery(USER_SUBSCRIPTIONS_QUERY)

  return useMemo(
    () => {
      const { loading, data } = query
      return {
        loading,
        subscriptions:
          data && data.currentUser && data.currentUser.subscriptions
      }
    },
    [query]
  )
}

export function useUserSubscription () {
  const data = useUserSubscriptions()

  return useMemo(
    () => {
      const { loading, subscriptions } = data
      return {
        loading,
        subscription: subscriptions && getSanbaseSubscription(subscriptions)
      }
    },
    [data]
  )
}

export function useUserSubscriptionStatus () {
  const data = useUserSubscription()

  return useMemo(
    () => {
      const { loading, subscription } = data

      let isPro = false
      let isTrial = false
      let trialDaysLeft = null

      if (subscription) {
        const { trialEnd, plan } = subscription
        isPro = plan.name === PRO
        trialDaysLeft = trialEnd && calculateTrialDaysLeft(trialEnd)
        isTrial = trialDaysLeft > 0
      }

      return {
        loading,
        isPro,
        isTrial,
        trialDaysLeft
      }
    },
    [data]
  )
}
