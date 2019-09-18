import gql from 'graphql-tag'

export const GAS_USED_QUERY = gql`
  query gasUsed(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: String
  ) {
    gasUsed(slug: $slug, from: $from, to: $to, interval: $interval) {
      gasUsed
      datetime
    }
  }
`
