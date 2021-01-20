import gql from 'graphql-tag'

export const TopHoldersPercentOfTotalSupply = gql`
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
