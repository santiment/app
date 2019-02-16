import React from 'react'
import cx from 'classnames'
import SignalCard from './SignalCard'
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

const SignalCardsGrid = ({ signals = defaultSignals, className = '' }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {signals.map(({ id, ...signal }) => (
        <SignalCard key={id} className={styles.card} {...signal} />
      ))}
    </div>
  )
}

export default SignalCardsGrid
