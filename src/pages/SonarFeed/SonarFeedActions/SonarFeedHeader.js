import React from 'react'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import styles from './SonarFeedHeader.module.scss'

const SonarFeedHeader = () => (
  <div className={styles.header}>
    <h1>My Alerts</h1>
    <div className={styles.explanation}>
      <HelpPopup position='bottom' align='start'>
        Create your own alert or subscribe to existing
      </HelpPopup>
    </div>
  </div>
)

export default SonarFeedHeader
