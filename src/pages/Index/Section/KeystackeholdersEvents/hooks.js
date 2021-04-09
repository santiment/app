import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useMemo } from 'react'

export const READABLE_NAMES = {
  large_transactions: 'Large transactions',
  large_exchange_deposit: 'Large Exchange deposit',
  dai_mint: 'DAI mint',
  old_coins_moved: 'Old coins moved',
  mcd_art_liquidations: 'Large liquidation occurred',
  anomalies: 'Anomalies'
}

const RAW_SIGNALS_QUERY = gql`
  query getMetric($from: DateTime!, $to: DateTime!) {
    getRawSignals(from: $from, to: $to) {
      datetime
      signal
      slug
      value
      metadata
    }
  }
`

export const useRawSignals = ({ from, to }) => {
  const { data, loading } = useQuery(RAW_SIGNALS_QUERY, {
    variables: {
      from,
      to
    }
  })

  return { data: data ? data.getRawSignals : [], loading }
}

export function useGroupedBySlugs (signals) {
  const groups = useMemo(
    () => {
      return signals.reduce((acc, item) => {
        const { slug } = item
        if (!acc[slug]) {
          acc[slug] = {
            list: [],
            types: []
          }
        }

        acc[slug].list.push(item)
        acc[slug].types.push(item.signal)
        return acc
      }, {})
    },
    [signals]
  )

  const slugs = useMemo(() => Object.keys(groups), [groups])

  return { slugs, groups }
}
