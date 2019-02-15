import React from 'react'
import SignalCard from '../../components/SignalCard/SignalCard'
import styles from './SonarFeedExplorePage.module.scss'

const signals = [
  {
    title: 'Daily trending words',
    description:
      'Subscribe to this signal to get daily list of trending words connected with crypto',
    author: 'Santiment team',
    subscriptionsNumber: 0,
    isSubscribed: false
  },
  {
    title: 'Ethereum price tracking',
    description:
      'Subscribe to this signal to track the activity of selected address based on the Ethereum',
    author: 'Santiment team',
    subscriptionsNumber: 0,
    isSubscribed: false
  }
]

const SonarFeedExplorePage = () => {
  return (
    <div className={styles.wrapper}>
      {signals.map(signal => (
        <SignalCard className={styles.card} {...signal} />
      ))}
    </div>
  )
}

export default SonarFeedExplorePage
