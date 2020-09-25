import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import { HISTORICAL_BALANCE_QUERY } from '../../../ducks/HistoricalBalance/common/queries'

const { from } = getTimeIntervalFromToday(-30, DAY)
const to = new Date()

const TOP_CLAIMERS_QUERY = gql`
  query getMetric($from: DateTime!, $to: DateTime!) {
    getMetric(metric: "uniswap_top_claimers") {
      histogramData(
        selector: { slug: "uniswap" }
        from: $from
        to: $to
        limit: 50
      ) {
        values {
          ... on StringAddressFloatValueList {
            data {
              address
              value
              labels
            }
          }
        }
      }
    }
  }
`

export function useTopClaimers ({ from, to, slug }) {
  const { data = {}, loading } = useQuery(TOP_CLAIMERS_QUERY, {
    variables: { from, to }
  })

  if (
    data.getMetric &&
    data.getMetric.histogramData &&
    data.getMetric.histogramData.values
  ) {
    return [data.getMetric.histogramData.values.data || [], loading]
  }

  return [[], loading]
}

export function useUniswapBalance (address) {
  const { data: { historicalBalance } = {}, loading } = useQuery(
    HISTORICAL_BALANCE_QUERY,
    {
      skip: !address,
      variables: {
        selector: {
          slug: 'uniswap',
          infrastructure: 'ETH'
        },
        address,
        interval: '1d',
        to: to.toISOString(),
        from
      }
    }
  )

  return [historicalBalance, loading]
}
