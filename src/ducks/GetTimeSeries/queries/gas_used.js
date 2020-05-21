import gql from 'graphql-tag'

export const GAS_USED_QUERY = gql`
  query gasUsed(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: interval
  ) {
    gasUsed(slug: $slug, from: $from, to: $to, interval: $interval) {
      gasUsed
      datetime
    }
  }
`
