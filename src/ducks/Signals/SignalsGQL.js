import gql from 'graphql-tag'

export const TRIGGERS_QUERY = gql`
  query {
    currentUser {
      id
      triggers {
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
          __typename
        }
      }
    }
  }
`

export const TRIGGER_BY_ID_QUERY = gql`
  query getTriggerById($id: Int) {
    trigger: getTriggerById(id: $id) {
      trigger {
        id
        settings
        isPublic
        isActive
        isRepeating
        cooldown
        tags {
          name
        }
        title
        description
      }
      userId
    }
  }
`
