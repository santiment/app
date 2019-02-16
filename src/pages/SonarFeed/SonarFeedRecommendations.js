import React from 'react'
import { Link } from 'react-router-dom'
import SignalCardGrid from './SonarFeedSignalsGrid'
import Image from './sonar_activity_artboard.png'
import styles from './SonarFeedRecommendations.module.scss'

const SonarFeedRecommendations = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <img className={styles.pic} alt='Artboard' src={Image} />
      Please create your own signal or subscribe to existing in the{' '}
      <Link to='/sonar/feed/explore'>Explore</Link> tab to get signals feed
    </div>
    <h4 className={styles.subtitle}>Recommended for you</h4>
    <SignalCardGrid />
  </div>
)

export default SonarFeedRecommendations
