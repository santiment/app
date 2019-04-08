import gql from 'graphql-tag'

export const TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY = gql`
  query topHoldersPercentOfTotalSupply(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
  ) {
    topHoldersPercentOfTotalSupply(
      slug: $slug
      numberOfHolders: 10
      from: $from
      to: $to
    ) {
      datetime
      inExchanges
      outsideExchanges
      inTopHoldersTotal
    }
  }
`
