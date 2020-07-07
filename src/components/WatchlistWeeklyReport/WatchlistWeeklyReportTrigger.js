import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import WatchlistWeeklyReport from './WatchlistWeeklyReport'
import styles from './WatchlistWeeklyReportTrigger.module.scss'

const WatchlistWeeklyReportTrigger = ({ isMonitored, ...props }) => {
  return (
    <WatchlistWeeklyReport
      {...props}
      isMonitored={isMonitored}
      trigger={
        <Button border variant='flat' accent='positive'>
          <Icon type='report' className={styles.icon} />
          {isMonitored && <span className={styles.active} />}
          {!isMonitored && <span className={styles.text}>Enable report</span>}
        </Button>
      }
    />
  )
}

export default WatchlistWeeklyReportTrigger
