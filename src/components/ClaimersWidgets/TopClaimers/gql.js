const TOP_CLAIMERS_QUERY = gql`
  query topClaimers($selector: String) {
    topClaimers(selector: $selector) {
      address
      value
    }
  }
`

export function useTopClaimers (selector) {
  const { data = ({ topClaimers = [] } = {}), loading } = useQuery(
    TOP_CLAIMERS_QUERY,
    {
      variables: {
        selector
      }
    }
  )

  return [topClaimers, loading]
}
