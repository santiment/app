import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { PanelWithHeader as Panel } from '@santiment-network/ui'

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

const SignalDetails = ({
  match: {
    params: { id }
  },
  ...rest
}) => <Panel header='Signals details'>{JSON.stringify(rest)}</Panel>

export default graphql(TRIGGER_BY_ID_QUERY, {
  options: ({
    match: {
      params: { id }
    }
  }) => ({
    variables: {
      id
    },
    fetchPolicy: 'network-only'
  })
})(SignalDetails)
