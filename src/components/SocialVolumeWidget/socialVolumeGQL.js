import gql from 'graphql-tag'

export const socialVolumeGQL = gql`
  query socialVolume($from: DateTime!, $to: DateTime!, $slug: String!) {
    socialVolume(
      from: $from
      socialVolumeType: PROFESSIONAL_TRADERS_CHAT_OVERVIEW
      to: $to
      slug: $slug
      interval: "1d"
    ) {
      mentionsCount
      datetime
    }
  }
`
