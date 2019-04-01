import React from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import {
  PanelWithHeader as Panel,
  Toggle,
  Button,
  Icon,
  Message
} from '@santiment-network/ui'
import StatusLabel from './../../components/StatusLabel'
import { TRIGGER_BY_ID_QUERY } from './../../ducks/Signals/SignalsGQL'
import { toggleTrigger, removeTrigger } from './../../ducks/Signals/actions'
import { mapTriggerToProps } from './../../ducks/Signals/utils'
import { SignalCardWrapper } from './../../components/SignalCard/SignalCard'
import styles from './SignalDetails.module.scss'

const SignalDetails = ({
  trigger: { trigger, isLoading, isError, errorMessage = '' },
  toggleSignal,
  removeSignal,
  redirect,
  closeModal,
  id,
  match = {}
}) => {
  const WrapperEl = isModal(match) ? 'div' : Panel
  const signalId = id || (match.params || {}).id
  if (isLoading) {
    return <WrapperEl header='Signals details'>Loading...</WrapperEl>
  }
  if (isError) {
    return (
      <div>
        <Message variant='error'>{errorMessage}</Message>
        <hr />
        <p>You can try to delete this</p>
        <RemoveSignalButton
          id={signalId}
          removeSignal={removeSignal}
          redirect={closeModal || redirect}
        />
      </div>
    )
  }
  if (!isLoading && !trigger) {
    return <Redirect exact to={'/sonar/feed/my-signals'} />
  }
  const { isActive, isPublic, title, description } = trigger
  return (
    <WrapperEl header='Signals details'>
      <div className={styles.wrapper}>
        <SignalCardWrapper title={title} description={description} id={id} />
        <div className={styles.row}>
          <StatusLabel isPublic={isPublic} />
        </div>
        <div className={styles.bottom}>
          <div>
            <SettingsSignalButton id={signalId} />
            <RemoveSignalButton
              id={signalId}
              removeSignal={removeSignal}
              redirect={closeModal || redirect}
            />
          </div>
          <Toggle
            onClick={() => toggleSignal({ id: signalId, isActive })}
            isActive={isActive}
          />
        </div>
      </div>
    </WrapperEl>
  )
}

const RemoveSignalButton = ({ id, removeSignal, redirect }) => (
  <Button
    variant='ghost'
    onClick={() => {
      removeSignal(id)
      redirect()
    }}
  >
    <Icon type='remove' />
  </Button>
)

const SettingsSignalButton = ({ id }) => (
  <Button variant='ghost'>
    <Link to={`/sonar/feed/details/${id}/edit`}>
      <Icon type='settings' />
    </Link>
  </Button>
)

const isModal = (match = {}) => !match.params

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
    options: ({ id, match = {} }) => ({
      variables: {
        id: +(id || (match.params || {}).id)
      },
      fetchPolicy: 'network-only'
    }),
    props: mapTriggerToProps
  })
)

export default enhance(SignalDetails)
