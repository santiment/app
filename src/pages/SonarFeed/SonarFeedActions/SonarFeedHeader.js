import React from 'react'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import styles from './SonarFeedHeader.module.scss'

const SonarFeedHeader = () => (
  <div className={styles.header}>
    <h1>My Signals</h1>
    <div className={styles.explanation}>
      <HelpTooltip
        withDesc={false}
        position='bottom'
        align='start'
        classes={styles}
      >
        Create your own signal or subscribe to existing
      </HelpTooltip>
    </div>
  </div>
)

export default SonarFeedHeader
