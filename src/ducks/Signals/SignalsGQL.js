import gql from 'graphql-tag'

export const TRIGGER_BY_ID_QUERY = gql`
  query getTriggerById($id: Int) {
    trigger: getTriggerById(id: $id) {
      trigger {
        id
        settings
        isPublic
        active
        repeating
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
