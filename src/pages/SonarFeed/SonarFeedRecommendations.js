import React from 'react'
import { Link } from 'react-router-dom'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import Image from './sonar_activity_artboard.png'
import styles from './SonarFeedRecommendations.module.scss'

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
const SonarFeedRecommendations = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <img className={styles.pic} alt='Artboard' src={Image} />
      Please create your own signal or subscribe to existing in the{' '}
      <Link to='/sonar/feed/explore'>Explore</Link> tab to get signals feed
    </div>
    <h4 className={styles.subtitle}>Recommended for you</h4>
    <SignalCardsGrid signals={defaultSignals} />
  </div>
)

export default SonarFeedRecommendations
