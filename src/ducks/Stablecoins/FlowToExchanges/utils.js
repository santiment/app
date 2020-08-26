import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { getIntervalDates } from '../StablecoinsMarketCap/utils'

export const EXCHANGE_INTERESTS = {
  high: 'Very High',
  normal: 'Normal',
  low: 'Low'
}

export const ExchangesAssets = [
  {
    slug: 'tether'
  },
  {
    slug: 'trueusd'
  },
  {
    slug: 'usd-coin'
  },
  {
    slug: 'multi-collateral-dai'
  }
]

export const EXCHANGES_DEFAULT_SETTINGS = {
  ...getIntervalDates({ value: '1d' }),
  interval: '1h'
}

const EXCHANGE_INFLOW_QUERY = gql`
  query getMetric(
    $from: DateTime!
    $to: DateTime!
    $slug: String!
    $interval: interval!
  ) {
    getMetric(metric: "exchange_inflow") {
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

export const useFlowToExchanges = ({ slug, from, to, interval }) => {
  const { data: { getMetric } = {}, loading, error } = useQuery(
    EXCHANGE_INFLOW_QUERY,
    {
      variables: { slug, from, to, interval }
    }
  )

  return { data: getMetric ? getMetric.timeseriesData : [], loading, error }
}
