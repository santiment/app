import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { getCategoryGraph, getTimeboundMetrics } from './Sidebar/utils'
import { getMarketSegment } from './timeseries/marketSegments'

const PROJECT_METRICS_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      availableMetrics
      availableQueries
      marketSegments
    }
  }
`

const DEFAULT_METRICS = [
  'price_usd',
  'volume_usd',
  'marketcap_usd',
  'twitter_followers',
  'dev_activity',
  'age_destroyed',
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

const DEFAULT_QUERIES = ['historyTwitterData', 'icoPrice']

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  props: ({
    data: {
      loading,
      project: {
        availableMetrics = DEFAULT_METRICS,
        availableQueries = DEFAULT_QUERIES,
        marketSegments = []
      } = {}
    },
    ownProps: { noMarketSegments, hiddenMetrics = [] }
  }) => {
    let categories = getCategoryGraph(
      availableQueries
        .concat(availableMetrics)
        .concat(noMarketSegments ? [] : marketSegments.map(getMarketSegment)),
      hiddenMetrics
    )

    return {
      categories,
      Timebound: getTimeboundMetrics(availableMetrics)
    }
  },
  skip: ({ slug }) => !slug,
  options: ({ slug }) => {
    return { variables: { slug } }
  }
})
