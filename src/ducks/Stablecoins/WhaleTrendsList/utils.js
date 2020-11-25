import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { getIntervalByTimeRange } from '../../../utils/dates'

export const WhaleAssets = [
  {
    slug: 'tether'
  },
  {
    slug: 'binance-usd'
  }
]

export const WHALES_DEFAULT_SETTINGS = {
  ...getIntervalByTimeRange('30d'),
  interval: '1d'
}

const WHALE_TRENDS_QUERY = gql`
  query getMetric(
    $from: DateTime!
    $to: DateTime!
    $slug: String!
    $interval: interval!
  ) {
    getMetric(metric: "amount_in_non_exchange_top_holders") {
      timeseriesData(
        slug: $slug
        from: $from
        to: $to
        includeIncompleteData: true
        interval: $interval
      ) {
        datetime
        value
      }
    }
  }
`

export const useWhaleTrends = ({ slug, from, to, interval }) => {
  const { data: { getMetric } = {}, loading, error } = useQuery(
    WHALE_TRENDS_QUERY,
    {
      variables: { slug, from, to, interval }
    }
  )

  return { data: getMetric ? getMetric.timeseriesData : [], loading, error }
}
