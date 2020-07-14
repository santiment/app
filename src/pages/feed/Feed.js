import React from 'react'
import cx from 'classnames'
import GeneralFeed from './GeneralFeed/GeneralFeed'
import RecentsFeed from './RecentsFeed/RecentsFeed'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import styles from './Feed.module.scss'
import FeedAlerts from './FeedAlerts/FeedAlerts'

const FeedPage = ({ location }) => {
  return (
    <div className={cx('page', styles.feed)}>
      <MobileOnly>
        <MobileHeader title='Feed' />
      </MobileOnly>

      <FeedAlerts />

      <div className={styles.feeds}>
        <GeneralFeed location={location} />

        <DesktopOnly>
          <RecentsFeed />
        </DesktopOnly>
      </div>
    </div>
  )
}

export default FeedPage
