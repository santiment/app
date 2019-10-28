import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import WatchlistWeeklyReport from './WatchlistWeeklyReport'
import styles from '../../pages/assets/WatchlistActionButton.module.scss'

const WatchlistWeeklyReportTrigger = ({ name, ...props }) => {
  return (
    <WatchlistWeeklyReport
      {...props}
      trigger={
        <Button border variant='flat'>
          <Icon type='report' />
          <span className={styles.text}>Weekly report</span>
        </Button>
      }
    />
  )
}

export default WatchlistWeeklyReportTrigger
