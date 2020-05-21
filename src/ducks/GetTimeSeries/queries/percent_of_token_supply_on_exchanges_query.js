import gql from 'graphql-tag'

export const PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES = gql`
  query percentOfTokenSupplyOnExchanges(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    percentOnExchanges: percentOfTokenSupplyOnExchanges(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
    ) {
      datetime
      percentOnExchanges
    }
  }
`
