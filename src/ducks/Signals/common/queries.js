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

export const TRIGGERS_QUERY = gql`
  query {
    currentUser {
      id
      triggers {
        ...triggersCommon
      }
    }
  }
  ${TRIGGERS_COMMON_FRAGMENT}
`

export const FEATURED_USER_TRIGGERS_QUERY = gql`
  query featuredUserTriggers {
    featuredUserTriggers {
      userId
      trigger {
        ...triggersCommon
      }
    }
  }
  ${TRIGGERS_COMMON_FRAGMENT}
`

export const TRIGGER_BY_ID_QUERY = gql`
  query getTriggerById($id: Int) {
    trigger: getTriggerById(id: $id) {
      trigger {
        ...triggersCommon
      }
      userId
    }
  }
  ${TRIGGERS_COMMON_FRAGMENT}
`
