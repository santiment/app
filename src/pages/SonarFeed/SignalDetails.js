import React from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { PanelWithHeader as Panel, Toggle, Button } from '@santiment-network/ui'
import { TRIGGER_BY_ID_QUERY } from './../../ducks/Signals/SignalsGQL'
import { toggleTrigger, removeTrigger } from './../../ducks/Signals/actions'
import { mapTriggerToProps } from './../../ducks/Signals/utils'

const SignalDetails = ({
  trigger: { trigger, isLoading, isError, errorMessage },
  toggleSignal,
  removeSignal,
  redirect
}) => {
  if (isLoading) {
    return <Panel header='Signals details'>Loading...</Panel>
  }
  if (!isLoading && !trigger) {
    return <Redirect exact to={'/sonar/feed/my-signals'} />
  }
  const { isActive, cooldown, isPublic, id } = trigger
  return (
    <Panel header='Signals details'>
      {isActive ? 'active' : 'not active'}
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
        onClick={() => toggleSignal({ id, isActive })}
        isActive={isActive}
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
    }),
    props: mapTriggerToProps
  })
)

export default enhance(SignalDetails)
