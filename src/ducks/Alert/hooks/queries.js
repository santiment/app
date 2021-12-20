import gql from 'graphql-tag'

export const TRIGGERS_COMMON_FRAGMENT = gql`
  fragment triggersCommon on Trigger {
    id
    title
    description
    isPublic
    cooldown
    settings
    isActive
    isRepeating
  }
`

export const TRIGGER_BY_ID_QUERY = gql`
  query getTriggerById($id: Int!) {
    trigger: getTriggerById(id: $id) {
      authorId: userId
      trigger {
        ...triggersCommon
      }
    }
  }
  ${TRIGGERS_COMMON_FRAGMENT}
`

export const IS_TELEGRAM_CHAT_VALID_QUERY = gql`
  query isTelegramChatIdValid($id: String!) {
    isTelegramChatIdValid(chatId: $id)
  }
`

export const LAST_PRICE_QUERY = gql`
  query getMetric($slug: String!) {
    metric: getMetric(metric: "price_usd") {
      price: aggregatedTimeseriesData(
        slug: $slug
        from: "utc_now-90d"
        to: "utc_now"
        aggregation: LAST
      )
    }
  }
`
