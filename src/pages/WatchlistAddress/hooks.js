import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const OBJECT = {}
const ARRAY = []

export const WATCHLIST_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      id
      name
      isPublic
      listItems {
        blockchainAddress {
          address
          infrastructure
          labels {
            name
            origin
          }
          balanceChange(
            to: "utc_now"
            from: "utc_now-7d"
            selector: { slug: "ethereum" }
          ) {
            balanceChangePercent
            balanceEnd
          }
        }
      }
    }
  }
`

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
    watchlist: data ? data.watchlist : OBJECT,
    isLoading: loading
  }
}

export function useAddressHistoricalBalance (address) {
  const { data } = useQuery(ADDRESS_HISTORICAL_BALANCE_QUERY, {
    variables: { address }
  })

  return data ? data.historicalBalance : ARRAY
}
