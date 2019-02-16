import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SonarFeedActivityPage.module.scss'
import Image from './sonar_activity_artboard.png'

const SonarFeedActivityPage = () => (
  <div className={styles.content}>
    <img className={styles.pic} alt='Artboard' src={Image} />
    Please create your own signal or subscribe to existing in the{' '}
    <Link to='/sonar/feed/explore'>Explore</Link> tab to get signals feed
  </div>
)

export default SonarFeedActivityPage
