import gql from 'graphql-tag'

export const HISTORICAL_BALANCE_QUERY = gql`
  query historicalBalance(
    $from: DateTime!
    $to: DateTime!
    $address: String!
    $interval: interval!
    $selector: HistoricalBalanceSelector
  ) {
    historicalBalance(
      address: $address
      interval: $interval
      selector: $selector
      from: $from
      to: $to
    ) {
      datetime
      balance
    }
  }
`

export const ASSETS_BY_WALLET_QUERY = gql`
  query assetsHeldByAddress($address: String!) {
    assetsHeldByAddress(address: $address) {
      slug
      balance
    }
  }
`
