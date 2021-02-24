import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { getCategoryGraph } from './Sidebar/utils'
import { getMarketSegment } from './timeseries/marketSegments'
import { useIsBetaMode } from '../../stores/ui'
import { Metric } from '../dataHub/metrics'
import { getMergedTimeboundSubmetrics } from '../dataHub/timebounds'
import { getAssetNewMetrics } from '../dataHub/metrics/news'

const PROJECT_METRICS_QUERIES_SEGMENTS_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      availableMetrics
      availableQueries
      marketSegments
    }
  }
`

export const PROJECT_METRICS_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      availableMetrics
    }
  }
`

export const DEFAULT_METRICS = [
  'price_usd',
  'volume_usd',
  'marketcap_usd',
  'twitter_followers',
  'dev_activity',
  'age_consumed',
  'transaction_volume',
  'exchange_balance',
  'age_distribution',
  'nvt',
  'mean_age',
  'mean_realized_price_usd',
  'exchange_token_supply',
  'daily_active_addresses',
  'mvrv_usd',
  'realized_value_usd',
  'nvt_transaction_volume',
  'circulation',
  'mean_dollar_invested_age',
  'percent_of_total_supply_on_exchanges',
  'velocity',
  'social_dominance_total',
  'social_volume_total'
]

const DEFAULT_HIDDEN_METRICS = [Metric.mvrv_usd]

const DEFAULT_STATE = {
  Submetrics: [],
  availableMetrics: [],
  categories: getCategoryGraph(DEFAULT_METRICS)
}

export function useProjectMetrics (
  slug,
  hiddenMetrics = DEFAULT_HIDDEN_METRICS,
  noMarketSegments
) {
  const isBeta = useIsBetaMode()
  const { data } = useQuery(PROJECT_METRICS_QUERIES_SEGMENTS_BY_SLUG_QUERY, {
    variables: { slug }
  })

  return useMemo(
    () => {
      if (!data) return DEFAULT_STATE

      const {
        availableMetrics,
        availableQueries,
        marketSegments
      } = data.project

      const Submetrics = getMergedTimeboundSubmetrics(availableMetrics)
      const categories = getCategoryGraph(
        availableQueries
          .concat(availableMetrics)
          .concat(noMarketSegments ? [] : marketSegments.map(getMarketSegment)),
        hiddenMetrics,
        Submetrics,
        isBeta
      )

      return {
        categories,
        Submetrics,
        availableMetrics,
        ...getAssetNewMetrics(availableMetrics, { slug, isBeta })
      }
    },
    [data, isBeta, hiddenMetrics, noMarketSegments]
  )
}

export default Component => props => {
  const { slug, hiddenMetrics, noMarketSegments } = props
  const projectMetrics = useProjectMetrics(
    slug,
    hiddenMetrics,
    noMarketSegments
  )
  return <Component {...props} {...projectMetrics} />
}
