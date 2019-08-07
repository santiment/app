import React from 'react'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import styles from './SonarFeedHeader.module.scss'

const SonarFeedHeader = () => {
  return (
    <div className={styles.header}>
      <h1>Sonar</h1>
      <div className={styles.explanation}>
        <HelpPopup position='bottom left'>
          Create your own signal or subscribe to existing
        </HelpPopup>
      </div>
    </div>
  )
}

export default SonarFeedHeader
