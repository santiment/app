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
  ...getIntervalDates('1d'),
  interval: '1h'
}

const EXCHANGES_INFLOW_AGGREGATED_QUERY = gql`
  query allProjects($from: DateTime!, $to: DateTime!) {
    allProjects(
      selector: {
        filters: {
          name: "market_segments"
          args: "{\\"market_segments\\": [\\"Stablecoin\\"]}"
        }
      }
    ) {
      slug
      ticker
      name
      exchange_inflow_centralized: aggregatedTimeseriesData(
        label: "centralized_exchange"
        from: $from
        to: $to
        metric: "exchange_inflow_per_exchange"
        aggregation: SUM
      )

      exchange_inflow_decentralized: aggregatedTimeseriesData(
        label: "decentralized_exchange"
        from: $from
        to: $to
        metric: "exchange_inflow_per_exchange"
        aggregation: SUM
      )
    }
  }
`

export const useFlowToExchanges = ({ from, to }) => {
  const { data: { allProjects } = {}, loading, error } = useQuery(
    EXCHANGES_INFLOW_AGGREGATED_QUERY,
    {
      variables: { from, to }
    }
  )

  return { data: allProjects || [], loading, error }
}
