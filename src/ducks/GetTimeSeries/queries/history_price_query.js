import gql from 'graphql-tag'

export const HISTORY_PRICE_QUERY = gql`
  query historyPrice(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: String
  ) {
    price: historyPrice(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
    ) {
      priceBtc
      priceUsd
      volume
      datetime
      marketcap
    }
  }
`
