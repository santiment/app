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
