import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import SignalCard from './card/SignalCard'
import {
  removeTrigger,
  toggleTrigger
} from '../../ducks/Signals/common/actions'
import { sortById } from '../../utils/sortMethods'
import styles from './SignalCardsGrid.module.scss'

const SignalCardsGrid = ({
  userId,
  ownerId,
  signals,
  className = '',
  toggleSignal,
  removeSignal,
  deleteEnabled = true,
  classes = {}
}) => {
  const isAuthor = +userId === +ownerId

  return (
    <div className={cx(styles.wrapper, className)}>
      {signals.sort(sortById).map(signal => {
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
  }
})

const mapStateToProps = ({ user }) => ({
  userId: user && user.data ? user.data.id : undefined
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalCardsGrid)
