import gql from 'graphql-tag'

export const SOCIAL_GAINERS_LOSERS_STATUS_QUERY = gql`
  query socialGainersLosersStatus(
    $slug: String!
    $timeWindow: String!
    $from: DateTime!
    $to: DateTime!
  ) {
    socialGainersLosersStatus(
      slug: $slug
      from: $from
      to: $to
      timeWindow: $timeWindow
    ) {
      datetime
      change
    }
  }
`

export const TOP_SOCIAL_GAINERS_LOSERS_QUERY = gql`
  query topSocialGainersLosers(
    $status: SocialGainersLosersStatusEnum!
    $from: DateTime!
    $to: DateTime!
    $timeWindow: String!
    $size: Int
  ) {
    topSocialGainersLosers(
      status: $status
      from: $from
      to: $to
      timeWindow: $timeWindow
      size: $size
    ) {
      datetime
      projects {
        change
        status
        project {
          name
          slug
          ticker
          logoUrl
          darkLogoUrl
        }
      }
    }
  }
`
