import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const TOP_CLAIMERS_QUERY = gql`
  query topClaimers(from: DateTime!, to: DateTime!){
    getMetric(metric: uniswap_top_claimers") {
      histogramData(selector: {slug: "uniswap"}, from: $from, to: $to, limit: 10) {
        values {
          ... on StringAddressFloatValueList{
          data {
            address
            value
          }
        }
      }
    }
  }
}
`

export function useTopClaimers ({ from, to }) {
  const { data = {}, loading } = useQuery(TOP_CLAIMERS_QUERY, {
    variables: { from, to }
  })

  return [data, loading]
}
