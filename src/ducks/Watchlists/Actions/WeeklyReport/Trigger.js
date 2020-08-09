import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import WeeklyReport from './index'
import styles from './Trigger.module.scss'

const WeeklyReportTrigger = ({ isMonitored, ...props }) => {
  return (
    <WeeklyReport
      {...props}
      isMonitored={isMonitored}
      trigger={
        <Button
          border
          variant='flat'
          accent='positive'
          className={styles.trigger}
        >
          <Icon type='report' className={styles.icon} />
          {isMonitored && <span className={styles.active} />}
          {!isMonitored && <span className={styles.text}>Enable report</span>}
        </Button>
      }
    />
  )
}

export default WeeklyReportTrigger
