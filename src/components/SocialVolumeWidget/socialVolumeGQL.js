import gql from 'graphql-tag'

export const socialVolumeGQL = gql`
  query socialVolume {
    socialVolume(
      from: "2018-11-20T07:11:08.908783Z"
      socialVolumeType: PROFESSIONAL_TRADERS_CHAT_OVERVIEW
      to: "2018-12-25T07:11:08.908783Z"
      slug: "ethereum"
      interval: "1d"
    ) {
      mentionsCount
      datetime
    }
  }
`
