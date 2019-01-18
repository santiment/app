import gql from 'graphql-tag'

export const socialVolumeGQL = gql`
  query socialVolume($from: DateTime!, $to: DateTime!, $slug: String!) {
    telegram_discussion: socialVolume(
      from: $from
      socialVolumeType: TELEGRAM_DISCUSSION_OVERVIEW
      to: $to
      slug: $slug
      interval: "1d"
    ) {
      mentionsCount
      datetime
    }

    telegram_chats: socialVolume(
      from: $from
      socialVolumeType: TELEGRAM_CHATS_OVERVIEW
      to: $to
      slug: $slug
      interval: "1d"
    ) {
      mentionsCount
      datetime
    }

    discord: socialVolume(
      from: $from
      socialVolumeType: DISCORD_DISCUSSION_OVERVIEW
      to: $to
      slug: $slug
      interval: "1d"
    ) {
      mentionsCount
      datetime
    }

    professional_traders_chat: socialVolume(
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

export const allProjetsGQL = gql`
  query allProjects {
    allProjects {
      slug
      ticker
    }
  }
`
