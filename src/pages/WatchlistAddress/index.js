import React from 'react'
import Page from '../../ducks/Page'
import BaseActions from '../../ducks/Watchlists/Widgets/TopPanel/BaseActions'

import styles from './index.module.scss'

const WatchlistAddress = ({ ...props }) => {
  return (
    <Page
      title='My watchlist'
      actions={
        <>
          <div className={styles.edit}>Edit</div>
          <div className={styles.share}>Share</div>
        </>
      }
    >
      123
    </Page>
  )
}

export default WatchlistAddress
