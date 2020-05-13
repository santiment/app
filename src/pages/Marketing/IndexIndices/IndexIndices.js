import React, { useState } from 'react'
import cx from 'classnames'
import WatchlistCards from '../../../components/Watchlists/WatchlistCards'
import { CATEGORIES } from '../../assets/assets-overview-constants'
import MyWatchlist from '../../../components/Watchlists/MyWatchlist'
import externalStyles from '../MarketingPage.module.scss'
import styles from './IndexIndices.module.scss'

const TABS = {
  YOUR: 'your',
  PUBLIC: 'public'
}

export default () => {
  const [tab, setTab] = useState(TABS.PUBLIC)

  return (
    <>
      <div className={styles.header}>
        <div
          className={cx(
            externalStyles.subTitle,
            styles.title,
            tab === TABS.PUBLIC && styles.active
          )}
          onClick={() => setTab(TABS.PUBLIC)}
        >
          Indices
        </div>
        <div
          className={cx(
            styles.title,
            styles.your,
            tab === TABS.YOUR && styles.active
          )}
          onClick={() => setTab(TABS.YOUR)}
        >
          Your watchlists
        </div>
      </div>
      {tab === TABS.PUBLIC && (
        <WatchlistCards
          watchlists={CATEGORIES}
          classes={externalStyles}
          showNew={true}
        />
      )}
      {tab === TABS.YOUR && <MyWatchlist showHeader={false} showNew={true} />}
    </>
  )
}
