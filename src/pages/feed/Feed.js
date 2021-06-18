import React from 'react'
import cx from 'classnames'
import GeneralFeed from './GeneralFeed/GeneralFeed'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import FeedAlerts from './FeedAlerts/FeedAlerts'
import styles from './Feed.module.scss'

const FeedPage = ({ location }) => {
  return (
    <div className={cx('page', styles.feed)}>
      <MobileOnly>
        <MobileHeader title='Feed' />
      </MobileOnly>

      <DesktopOnly>
        <FeedAlerts />
      </DesktopOnly>

      <MobileOnly>
        <div className={styles.feeds}>
          <GeneralFeed location={location} />
        </div>
      </MobileOnly>
    </div>
  )
}

export default FeedPage
