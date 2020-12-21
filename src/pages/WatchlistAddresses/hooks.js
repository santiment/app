import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { WATCHLIST_QUERY } from './gql'
import { useUser } from '../../stores/user'

const OBJECT = {}
const ARRAY = []

export const ADDRESS_HISTORICAL_BALANCE_QUERY = gql`
  query historicalBalance($address: String!) {
    historicalBalance(
      address: $address
      from: "utc_now-7d"
      to: "utc_now"
      interval: "4h"
      selector: { slug: "ethereum" }
    ) {
      balance
    }
  }
`

export function useAddressWatchlist (id = 1188) {
  const { data, loading } = useQuery(WATCHLIST_QUERY, {
    variables: { id }
  })

  return {
    watchlist: data ? data.watchlist || OBJECT : OBJECT,
    isLoading: loading
  }
}

export function useAddressHistoricalBalance (address) {
  const { data } = useQuery(ADDRESS_HISTORICAL_BALANCE_QUERY, {
    variables: { address }
  })

  return data ? data.historicalBalance : ARRAY
}

export function useIsWatchlistAuthor (watchlist) {
  const { user } = useUser()
  const userId = user && user.id
  const authorId = watchlist.user && watchlist.user.id
  return userId === authorId
}

const itemAccessor = ({ blockchainAddress }) => blockchainAddress
export const useAddressWatchlistItems = ({ listItems }) =>
  useMemo(() => (listItems ? listItems.map(itemAccessor) : ARRAY), [listItems])
