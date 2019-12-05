import React from 'react'
import SonarFeedActivityPage from '../../SonarFeed/SonarFeedActivityPage'
import styles from './GeneralFeed.module.scss'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'

const GeneralFeed = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>General feed</div>
        <HelpTooltip
          position='bottom'
          align='start'
          classes={styles}
          withDesc={false}
        >
          This is a continuous stream of updates on cryptocurrency assets, your
          personal watchlists and general market conditions, using various
          Santiment metrics and tools
        </HelpTooltip>
      </div>

      <div className={styles.scrollable}>
        <SonarFeedActivityPage classes={styles} />
      </div>
    </div>
  )
}

export default GeneralFeed
