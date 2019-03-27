import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SignalCard from './SignalCard'
import { toggleTrigger } from './../../ducks/Signals/actions'
import styles from './SignalCardsGrid.module.scss'

export const defaultSignals = [
  {
    id: 0,
    title: 'Daily trending words',
    description:
      'Subscribe to this signal to get daily list of trending words connected with crypto',
    author: 'Santiment team',
    subscriptionsNumber: 0,
    isSubscribed: false,
    isPublished: true
  },
  {
    id: 1,
    title: 'Ethereum price tracking',
    description:
      'Subscribe to this signal to track the activity of selected address based on the Ethereum',
    author: 'Santiment team',
    subscriptionsNumber: 0,
    isSubscribed: false,
    isPublished: true
  }
]

const SignalCardsGrid = ({
  signals = defaultSignals,
  className = '',
  toggleSignal,
  gotoSignalByID
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {signals
        .sort((a, b) => a.id - b.id)
        .map(({ id, ...signal }) => (
          <SignalCard
            key={id}
            toggleSignal={() =>
              toggleSignal({
                id,
                isActive: signal.isActive
              })
            }
            gotoSignalByID={() => gotoSignalByID(id)}
            className={styles.card}
            {...signal}
          />
        ))}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleSignal: ({ id, isActive }) => {
    dispatch(toggleTrigger({ id, isActive }))
  },
  gotoSignalByID: id => {
    dispatch(push(`/sonar/feed/details/${id}`))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignalCardsGrid)
