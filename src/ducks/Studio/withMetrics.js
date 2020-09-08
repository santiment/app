import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getCategoryGraph } from './Sidebar/utils'
import { getMarketSegment } from './timeseries/marketSegments'
import { useMergedTimeboundSubmetrics } from '../dataHub/timebounds'
import { getAssetNewMetrics } from '../dataHub/metrics/news'
import { useIsBetaMode } from '../../stores/ui'

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

export default graphql(PROJECT_METRICS_QUERIES_SEGMENTS_BY_SLUG_QUERY, {
  props: ({
    data: {
      project: {
        availableMetrics = DEFAULT_METRICS,
        availableQueries = [],
        marketSegments = []
      } = {}
    },
    ownProps: { noMarketSegments, hiddenMetrics = [], slug }
  }) => {
    const Submetrics = useMergedTimeboundSubmetrics(availableMetrics)

    const isBeta = useIsBetaMode()

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
  skip: ({ slug }) => !slug,
  options: ({ slug }) => ({ variables: { slug } })
})
