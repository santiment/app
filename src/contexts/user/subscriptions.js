import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { client } from '../../index'
import { PLANS, getSanbaseSubscription } from '../../utils/plans'

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

/*
 * export function updateUser(newUser) {
 *   const { currentUser } = client.readQuery({
 *     query: USER_QUERY,
 *   })
 *
 *   client.writeQuery({
 *     query: USER_QUERY,
 *     data: {
 *       currentUser: newUser && {
 *         ...currentUser,
 *         ...newUser,
 *       },
 *     },
 *   })
 * } */

export function useUserSubscriptions () {
  const query = useQuery(USER_SUBSCRIPTIONS_QUERY)

  return useMemo(
    () => {
      const { loading, data } = query
      return {
        loading,
        subscriptions: data && data.currentUser.subscriptions
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

export function useIsProUser () {
  const data = useUserSubscription()

  return useMemo(
    () => {
      const { loading, subscription } = data
      return {
        loading,
        isProUser: subscription && subscription.plan.name === PRO
      }
    },
    [data]
  )
}
