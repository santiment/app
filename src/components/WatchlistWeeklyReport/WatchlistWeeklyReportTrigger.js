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
          <svg
            width='16'
            height='20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 14.7v-7c0-.3.1-.5.3-.7l6-5.4a1 1 0 011.4 0l6 5.4c.2.2.3.4.3.7v7c0 .6-.4 1-1 1H2a1 1 0 01-1-1z'
              stroke='#14C393'
              strokeWidth='1.5'
            />
            <path
              d='M1 7.6l4.4 3.5m0 0l-4.1 3.3c-.2.1-.3.4-.3.6v0c0 .4.3.7.7.7h12.6c.4 0 .7-.3.7-.7v0c0-.2-.1-.5-.3-.6l-4.1-3.3m-5.2 0l2-1.5a1 1 0 011.2 0l2 1.5m0 0L15 7.6'
              stroke='#14C393'
              stroke-width='1.5'
            />
            <path d='M7 5.1h2' stroke='#14C393' strokeLinecap='round' />
            <path d='M5.4 6.9h5.2' stroke='#14C393' strokeLinecap='round' />
          </svg>
          <span className={styles.text}>Weekly report</span>
        </Button>
      }
    />
  )
}

export default WatchlistWeeklyReportTrigger
