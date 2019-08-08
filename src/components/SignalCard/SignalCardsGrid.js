import React from 'react'
import { push } from 'react-router-redux'
import cx from 'classnames'
import { connect } from 'react-redux'
import SignalCard from './SignalCard'
import {
  removeTrigger,
  toggleTrigger
} from '../../ducks/Signals/common/actions'
import styles from './SignalCardsGrid.module.scss'

export const defaultSignals = [
  {
    index: 0,
    title: 'Daily trending words',
    description:
      'Subscribe to this signal to get daily list of trending words connected with crypto',
    author: 'Santiment team',
    subscriptionsNumber: 0,
    isSubscribed: false,
    isPublished: true
  },
  {
    index: 1,
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
  removeSignal,
  goToSignalSettings
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {signals
        .sort((a, b) => b.id - a.id)
        .map(({ id, index, ...signal }) => (
          <SignalCard
            key={id || index}
            id={id}
            toggleSignal={() =>
              toggleSignal({
                id,
                isActive: signal.isActive
              })
            }
            goToSignalSettings={() => {
              goToSignalSettings(id)
            }}
            removeSignal={() => {
              removeSignal(id)
            }}
            className={styles.card}
            signal={signal}
          />
        ))}
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
    id && dispatch(push(`/sonar/signal/${id}/edit`))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignalCardsGrid)
