import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import WatchlistWeeklyReport from './WatchlistWeeklyReport'
import styles from './WatchlistWeeklyReportTrigger.module.scss'

const WatchlistWeeklyReportTrigger = ({ name, isMonitored, ...props }) => {
  return (
    <WatchlistWeeklyReport
      {...props}
      isMonitored={isMonitored}
      trigger={
        <Button border variant='flat' accent='positive'>
          <Icon type='report' className={styles.icon} />
          <span className={cx(styles.text, isMonitored && styles.active)}>
            Weekly report
          </span>
        </Button>
      }
    />
  )
}

export default WatchlistWeeklyReportTrigger
