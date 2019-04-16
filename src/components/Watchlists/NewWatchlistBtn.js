import React from 'react'
import cx from 'classnames'
import { Icon, Button, Tooltip } from '@santiment-network/ui'
import NewWatchlistForm from './NewWatchlistForm'
import styles from './NewWatchlistBtn.module.scss'

const NewWatchlistBtn = ({ isMobile }) => {
  return (
    <Tooltip
      closeTimeout={500}
      position={isMobile ? 'bottom' : 'top'}
      on='click'
      trigger={
        <Button
          border
          className={cx(styles.btn, {
            [styles.mobile]: isMobile
          })}
        >
          <Icon type='plus-round' />
          &nbsp; New watchlist
        </Button>
      }
    >
      <NewWatchlistForm isMobile={isMobile} />
    </Tooltip>
  )
}

export default NewWatchlistBtn
