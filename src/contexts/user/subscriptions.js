import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { client } from '../../index'
import { PLANS, getSanbaseSubscription } from '../../utils/plans'
import { ONE_DAY_IN_MS } from '../../utils/dates'

const { PRO } = PLANS

export const USER_SUBSCRIPTIONS_QUERY = gql`
  query {
    currentUser {
      id
      subscriptions {
        id
        trialEnd
        cancelAtPeriodEnd
        currentPeriodEnd
        plan {
          id
          name
          product {
            id
          }
        }
      }
    }
  }
`
export function updateUserSubscriptions (newUserSubscriptions) {
  const { currentUser } = client.readQuery({
    query: USER_SUBSCRIPTIONS_QUERY
  })

  if (newUserSubscriptions) {
    currentUser.subscriptions = newUserSubscriptions
  }

  client.writeQuery({
    query: USER_SUBSCRIPTIONS_QUERY,
    data: {
      currentUser: newUserSubscriptions && Object.assign({}, currentUser)
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
        trialDaysLeft =
          trialEnd &&
          Math.ceil((new Date(trialEnd) - Date.now()) / ONE_DAY_IN_MS)
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
