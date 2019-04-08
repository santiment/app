import gql from 'graphql-tag'

export const SOCIAL_DOMINANCE_QUERY = gql`
  query socialDominance(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $interval: String!
    $source: SocialDominanceSources!
  ) {
    datetime
    dominance
  }
`
