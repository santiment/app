import React from 'react'
import gql from 'graphql-tag'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { PanelWithHeader as Panel, Toggle } from '@santiment-network/ui'
import { toggleTrigger } from './../../ducks/Signals/actions'

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

const SignalDetails = ({ data: { trigger, loading }, toggleSignal }) => {
  if (loading) {
    return <Panel header='Signals details'>Loading...</Panel>
  }
  const { active, cooldown, isPublic, id } = trigger.trigger
  return (
    <Panel header='Signals details'>
      {active ? 'active' : 'not active'}
      {cooldown}
      {isPublic}
      {id}
      <Toggle
        onClick={() => toggleSignal({ id, isActive: active })}
        isActive={active}
      />
    </Panel>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleSignal: ({ id, isActive }) => {
    dispatch(toggleTrigger({ id, isActive }))
  }
})

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(TRIGGER_BY_ID_QUERY, {
    options: ({
      match: {
        params: { id }
      }
    }) => ({
      variables: {
        id: +id
      },
      fetchPolicy: 'network-only'
    })
  })
)

export default enhance(SignalDetails)
