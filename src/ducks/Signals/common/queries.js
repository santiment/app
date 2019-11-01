import gql from 'graphql-tag'

export const TRIGGERS_COMMON = gql`
  fragment triggersCommon on Trigger {
    id
    isPublic
    cooldown
    settings
    title
    isActive
    isRepeating
    description
    tags {
      name
    }
  }
`

export const PUBLIC_TRIGGERS_FOR_USER_QUERY = gql`
  query publicTriggersForUser($userId: ID!) {
    publicTriggersForUser(userId: $userId) {
      trigger {
        ...triggersCommon
      }
      userId
      __typename
    }
  }
  ${TRIGGERS_COMMON}
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
  ${TRIGGERS_COMMON}
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
  ${TRIGGERS_COMMON}
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
  ${TRIGGERS_COMMON}
`
