import React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { PanelWithHeader as Panel, Toggle, Button } from '@santiment-network/ui'
import { TRIGGER_BY_ID_QUERY } from './../../ducks/Signals/SignalsGQL'
import { toggleTrigger, removeTrigger } from './../../ducks/Signals/actions'

const SignalDetails = ({
  data: { trigger, loading },
  toggleSignal,
  removeSignal,
  redirect
}) => {
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
      <Link to={`/sonar/feed/details/${id}/edit`}>Edit</Link>
      <Button
        border
        variant='flat'
        accent='negative'
        onClick={() => {
          removeSignal(id)
          redirect()
        }}
      >
        Remove
      </Button>
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
  },
  removeSignal: id => {
    dispatch(removeTrigger(id))
  },
  redirect: (path = '/sonar/feed/my-signals') => {
    dispatch(push(path))
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
