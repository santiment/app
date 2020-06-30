import gql from 'graphql-tag'

export const SOCIAL_DOMINANCE_QUERY = gql`
  query socialDominance(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
    $source: SocialDominanceSources! = ALL
  ) {
    socialDominance(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
      source: $source
    ) {
      datetime
      dominance
    }
  }
`
