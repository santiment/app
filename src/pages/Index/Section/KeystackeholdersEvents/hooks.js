import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const READABLE_NAMES = {
  large_transactions: 'Large transactions',
  large_exchange_deposit: 'Large Exchange deposit',
  dai_mint: 'DAI mint',
  old_coins_moved: 'Old coins moved',
  mcd_art_liquidations: 'Large liquidation occurred',
  anomalies: 'Anomalies',
  ath: 'All Time High',
  price_usd_all_time_high: 'Price all time high (USD)',

  large_exchange_withdrawal: 'Large Exchange withdrawal',
  anomaly_active_deposits: 'Anomaly (active deposits)',
  anomaly_active_withdrawals: 'Anomaly (active withdrawals)',
  anomaly_age_consumed: 'Anomaly (age consumed)',
  anomaly_circulation_1d: 'Anomaly (circulation 1 day)',
  anomaly_cumulative_age_consumed: 'Anomaly (cumulative age consumed)',
  anomaly_daily_active_addresses: 'Anomaly (daily active addresses)',
  anomaly_mvrv_usd: 'Anomaly (MVRV USD)',
  anomaly_mvrv_usd_10y: 'Anomaly (MVRV USD 10 year)',
  anomaly_mvrv_usd_180d: 'Anomaly (MVRV USD 180 days)',
  anomaly_mvrv_usd_1d: 'Anomaly (MVRV USD 1 day)',
  anomaly_mvrv_usd_2y: 'Anomaly (MVRV USD 2 years)',
  anomaly_mvrv_usd_30d: 'Anomaly (MVRV USD 30 days)',
  anomaly_mvrv_usd_365d: 'Anomaly (MVRV USD 365 days)',
  anomaly_mvrv_usd_3y: 'Anomaly (MVRV USD 3 years)',
  anomaly_mvrv_usd_5y: 'Anomaly (MVRV USD 5 years)',
  anomaly_mvrv_usd_60d: 'Anomaly (MVRV USD 60 days)',
  anomaly_mvrv_usd_7d: 'Anomaly (MVRV USD 7 days)',
  anomaly_mvrv_usd_90d: 'Anomaly (MVRV USD 90 days)',
  anomaly_network_growth: 'Anomaly (network growth)',
  anomaly_payment_count: 'Anomaly (payment count)',
  anomaly_supply_on_exchanges: 'Anomaly (supply on exchanges)',
  anomaly_transaction_count: 'Anomaly (transaction count)',
  anomaly_transaction_volume: 'Anomaly (transaction volume)',
  anomaly_velocity: 'Anomaly (velocity)'
}

export const READABLE_EXCHANGE_NAMES = {
  ftx_exchange: 'FTX Exchange'
}

const RAW_SIGNALS_QUERY = gql`
  query getRawSignals($from: DateTime!, $to: DateTime!) {
    getRawSignals(from: $from, to: $to) {
      datetime
      signal
      slug
      value
      metadata
      project {
        slug
        ticker
        name
        logoUrl
      }
    }
  }
`

export const TEMPORARY_HIDDEN_LABELS = {
  anomaly_active_deposits: true,
  anomaly_active_withdrawals: true,
  anomaly_age_consumed: true,
  anomaly_circulation_1d: true,
  anomaly_cumulative_age_consumed: true,
  anomaly_daily_active_addresses: true,
  anomaly_mvrv_usd: true,
  anomaly_mvrv_usd_10y: true,
  anomaly_mvrv_usd_180d: true,
  anomaly_mvrv_usd_1d: true,
  anomaly_mvrv_usd_2y: true,
  anomaly_mvrv_usd_30d: true,
  anomaly_mvrv_usd_365d: true,
  anomaly_mvrv_usd_3y: true,
  anomaly_mvrv_usd_5y: true,
  anomaly_mvrv_usd_60d: true,
  anomaly_mvrv_usd_7d: true,
  anomaly_mvrv_usd_90d: true,
  anomaly_network_growth: true,
  anomaly_payment_count: true,
  anomaly_supply_on_exchanges: true,
  anomaly_transaction_count: true,
  anomaly_transaction_volume: true,
  anomaly_velocity: true,
  price_usd_all_time_high: true
}

export const useRawSignals = ({ from, to }) => {
  const query = useQuery(RAW_SIGNALS_QUERY, {
    variables: {
      from,
      to
    },
    errorPolicy: 'all'
  })

  return useMemo(
    () => {
      const { data, loading } = query
      return {
        data: (data ? data.getRawSignals.filter(Boolean) : []) || [],
        loading
      }
    },
    [query]
  )
}

export function useGroupedBySlugs (signals, hiddenLabels, selectedAssets) {
  const filteredByAssets = useMemo(
    () => {
      return signals.filter(({ slug }) => selectedAssets[slug])
    },
    [signals, selectedAssets]
  )

  const { slugs, projects } = useMemo(
    () => {
      return {
        slugs: [...new Set(signals.map(({ slug }) => slug))],
        projects: signals.reduce((acc, item) => {
          acc[item.slug] = item.project
          return acc
        }, {})
      }
    },
    [signals]
  )

  const labels = useMemo(
    () => {
      const labels = filteredByAssets.reduce((acc, item) => {
        const { signal } = item
        acc[signal] = true
        return acc
      }, {})

      return Object.keys(labels)
        .sort()
        .reverse()
    },
    [filteredByAssets]
  )

  const groups = useMemo(
    () => {
      return filteredByAssets.reduce((acc, item) => {
        const { slug, signal } = item

        const hidden = hiddenLabels[signal]

        if (!hidden) {
          if (!acc[slug]) {
            acc[slug] = {
              list: [],
              types: []
            }
          }

          acc[slug].list.push(item)
          acc[slug].types.push(item.signal)
        }
        return acc
      }, {})
    },
    [filteredByAssets, hiddenLabels]
  )

  const visibleSlugs = useMemo(() => Object.keys(groups), [groups])

  return { slugs, projects, visibleSlugs, labels, groups }
}
