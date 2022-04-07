import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const TOP_EXCHANGES_QUERY = gql`
  query topExchangesByBalance(
    $limit: Int = 10
    $selector: MetricTargetSelectorInputObject
    $slug: String
  ) {
    topExchangesByBalance(slug: $slug, limit: $limit, selector: $selector) {
      owner
      label
      balance
      balanceChange1d
      balanceChange7d
      balanceChange30d
      datetimeOfFirstTransfer
      daysSinceFirstTransfer
    }
  }
`

export function useTopExchanges (props, skip) {
  const { data: { topExchangesByBalance = [] } = {}, loading } = useQuery(TOP_EXCHANGES_QUERY, {
    skip,
    variables: { ...props },
  })

  return [topExchangesByBalance, loading]
}
