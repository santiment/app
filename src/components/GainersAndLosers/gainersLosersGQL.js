import gql from 'graphql-tag'

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
