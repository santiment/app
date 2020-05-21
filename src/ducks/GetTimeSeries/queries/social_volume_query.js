import gql from 'graphql-tag'

const SocialVolume = gql`
  fragment socialVolume on SocialVolume {
    datetime
    socialVolume: mentionsCount
  }
`

export const SOCIAL_VOLUME_QUERY = gql`
  query socialVolume(
    $slug: String
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
  ) {
    proffesionalSocialVolume: socialVolume(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
      socialVolumeType: PROFESSIONAL_TRADERS_CHAT_OVERVIEW
    ) {
      ...socialVolume
    }
    telegramChatsSocialVolume: socialVolume(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
      socialVolumeType: TELEGRAM_CHATS_OVERVIEW
    ) {
      ...socialVolume
    }
    telegramDiscussionSocialVolume: socialVolume(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
      socialVolumeType: TELEGRAM_DISCUSSION_OVERVIEW
    ) {
      ...socialVolume
    }
    discordDiscussionSocialVolume: socialVolume(
      slug: $slug
      from: $from
      to: $to
      interval: $interval
      socialVolumeType: DISCORD_DISCUSSION_OVERVIEW
    ) {
      ...socialVolume
    }
  }
  ${SocialVolume}
`
