import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import EmailImage from './EmailImage'
import styles from './WatchlistWeeklyReport.module.scss'

const WatchlistWeeklyReport = ({ trigger, isMonitoring = true }) => {
  return (
    <Dialog trigger={trigger} classes={{ title: styles.header }}>
      <Dialog.ScrollContent className={styles.wrapper}>
        <EmailImage className={styles.image} />
        <h4 className={styles.title}>Stay in touch with the latest events</h4>
        <p className={styles.description}>
          Every week you can receive a report to your inbox with insights from
          other people based on your monitored watchlists.
        </p>
        <Button
          variant='flat'
          onClick={() => {}}
          className={cx(styles.toggleWrapper, isMonitoring && styles.active)}
        >
          <Toggle isActive={isMonitoring} className={styles.toggle} />
          Receive weekly report
        </Button>
        <Dialog.Actions className={styles.actions}>
          <Dialog.Approve className={styles.approve}>
            Save preferences
          </Dialog.Approve>
        </Dialog.Actions>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default WatchlistWeeklyReport
