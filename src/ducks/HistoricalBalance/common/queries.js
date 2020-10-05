import gql from 'graphql-tag'

// TODO: Move to timeseries fetcher metrics [@vanguard | Oct  5, 2020]
export const HISTORICAL_BALANCE_QUERY = gql`
  query historicalBalance(
    $from: DateTime!
    $to: DateTime!
    $address: String!
    $interval: interval!
    $slug: String!
    $infrastructure: String!
  ) {
    historicalBalance(
      address: $address
      interval: $interval
      from: $from
      to: $to
      selector: { slug: $slug, infrastructure: $infrastructure }
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
