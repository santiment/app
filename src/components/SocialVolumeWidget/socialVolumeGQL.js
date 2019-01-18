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

export const totalSocialVolumeGQL = gql`
  query topicSearch($from: DateTime!, $to: DateTime!) {
    telegram: topicSearch(
      source: TELEGRAM
      searchText: "*"
      interval: "1d"
      from: $from
      to: $to
    ) {
      chartData {
        mentionsCount
        datetime
      }
    }

    reddit: topicSearch(
      source: REDDIT
      searchText: "*"
      interval: "1d"
      from: $from
      to: $to
    ) {
      chartData {
        mentionsCount
        datetime
      }
    }

    professional_traders_chat: topicSearch(
      source: PROFESSIONAL_TRADERS_CHAT
      searchText: "*"
      interval: "1d"
      from: $from
      to: $to
    ) {
      chartData {
        mentionsCount
        datetime
      }
    }

    discord: topicSearch(
      source: DISCORD
      searchText: "*"
      interval: "1d"
      from: $from
      to: $to
    ) {
      chartData {
        mentionsCount
        datetime
      }
    }
  }
`
