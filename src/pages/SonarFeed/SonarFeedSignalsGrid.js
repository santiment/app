import React from 'react'
import cx from 'classnames'
import SignalCard from '../../components/SignalCard/SignalCard'
import styles from './SonarFeedSignalsGrid.module.scss'

const defaultSignals = [
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

const SignalCardGrid = ({ signals = defaultSignals, className = '' }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {signals.map(({ id, ...signal }) => (
        <SignalCard key={id} className={styles.card} {...signal} />
      ))}
    </div>
  )
}

export default SignalCardGrid
