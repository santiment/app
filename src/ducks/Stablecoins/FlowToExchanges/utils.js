import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { getTimerangePeriod } from '../../../utils/dates'

export const EXCHANGE_INTERESTS = {
  high: 'Very High',
  normal: 'Normal',
  low: 'Low'
}

export const EXCHANGES_DEFAULT_SETTINGS = {
  ...getTimerangePeriod('1d'),
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
        selector: { label: "centralized_exchange" }
        from: $from
        to: $to
        metric: "exchange_inflow_per_exchange"
        aggregation: SUM
      )

      exchange_inflow_decentralized: aggregatedTimeseriesData(
        selector: { label: "decentralized_exchange" }
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
