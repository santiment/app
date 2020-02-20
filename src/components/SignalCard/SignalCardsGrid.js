import React from 'react'
import { push } from 'react-router-redux'
import cx from 'classnames'
import { connect } from 'react-redux'
import SignalCard from './card/SignalCard'
import {
  removeTrigger,
  toggleTrigger
} from '../../ducks/Signals/common/actions'
import styles from './SignalCardsGrid.module.scss'

const SignalCardsGrid = ({
  userId,
  ownerId,
  signals,
  className = '',
  toggleSignal,
  removeSignal,
  goToSignalSettings,
  deleteEnabled = true,
  classes = {}
}) => {
  const isAuthor = +userId === +ownerId

  return (
    <div className={cx(styles.wrapper, className)}>
      {signals
        .sort((a, b) => b.id - a.id)
        .map(signal => {
          const { id, index, userId: signalOwnerId, isActive } = signal

          return (
            <SignalCard
              deleteEnabled={deleteEnabled}
              isUserTheAuthor={
                isAuthor || (signalOwnerId && +signalOwnerId === +userId)
              }
              key={id || index}
              id={id}
              toggleSignal={() =>
                toggleSignal({
                  id,
                  isActive
                })
              }
              goToSignalSettings={() => {
                goToSignalSettings(id)
              }}
              removeSignal={() => {
                removeSignal(id)
              }}
              className={cx(styles.card, classes.card)}
              signal={signal}
            />
          )
        })}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleSignal: ({ id, isActive }) => {
    id && dispatch(toggleTrigger({ id, isActive }))
  },
  removeSignal: id => {
    id && dispatch(removeTrigger(id))
  },
  goToSignalSettings: id => {
    id && dispatch(push(`/sonar/signal/${id}${window.location.search}`))
  }
})

const mapStateToProps = ({ user }) => ({
  userId: user && user.data ? user.data.id : undefined
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalCardsGrid)
