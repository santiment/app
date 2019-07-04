import gql from 'graphql-tag'

export const historicalBalanceGQL = gql`
  query historicalBalance(
    $from: DateTime!
    $to: DateTime!
    $address: String!
    $interval: String!
    $slug: String
  ) {
    historicalBalance(
      address: $address
      interval: $interval
      slug: $slug
      from: $from
      to: $to
    ) {
      datetime
      balance
    }
  }
`
