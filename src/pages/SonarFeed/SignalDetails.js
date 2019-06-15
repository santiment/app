import React from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import {
  PanelWithHeader as Panel,
  Button,
  Icon,
  Message
} from '@santiment-network/ui'
import StatusLabel from './../../components/StatusLabel'
import { TRIGGER_BY_ID_QUERY } from '../../ducks/Signals/gql/SignalsGQL'
import {
  toggleTrigger,
  removeTrigger
} from '../../ducks/Signals/common/actions'
import { mapGQLTriggerToProps } from '../../ducks/Signals/utils/utils'
import { SignalCardWrapper } from './../../components/SignalCard/SignalCard'
import styles from './SignalDetails.module.scss'
import { ToggleSignal } from './ToggleSignal'
import LikeBtn from '../../components/Like/LikeBtn'

const SignalDetails = ({
  trigger: { trigger, isLoading, isError, errorMessage = '' },
  toggleSignal,
  removeSignal,
  redirect,
  closeModal,
  id,
  match = {},
  author = 'Santiment Team',
  likesCount = 0
}) => {
  const signalId = id || (match.params || {}).id
  if (isLoading) {
    return (
      <Panel header='Signals details'>
        <div className={styles.wrapper}>Loading...</div>
      </Panel>
    )
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
    <Panel header='Signals details' className={styles.container}>
      <Icon
        className={styles.closeButton}
        onClick={() => closeModal()}
        type='close'
      />
      <div className={styles.wrapper}>
        <SignalCardWrapper title={title} description={description} id={id}>
          <div className={styles.row}>
            <div className={styles.teamBlock}>
              {author && (
                <div>
                  by &nbsp;<span className={styles.teamLink}>{author}</span>
                </div>
              )}
              <div className={styles.likesBlock}>
                <LikeBtn disabled={true} likesNumber={likesCount} />
              </div>
            </div>
            <div className={styles.status}>
              <StatusLabel isPublic={isPublic} />
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.leftActions}>
              <SettingsSignalButton id={signalId} />
              <RemoveSignalButton
                id={signalId}
                removeSignal={removeSignal}
                redirect={closeModal || redirect}
              />
            </div>
            <ToggleSignal
              isActive={isActive}
              toggleSignal={toggleSignal}
              id={signalId}
            />
          </div>
        </SignalCardWrapper>
      </div>
    </Panel>
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
    props: mapGQLTriggerToProps
  })
)

export default enhance(SignalDetails)
