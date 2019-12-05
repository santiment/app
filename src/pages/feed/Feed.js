import React from 'react'
import StoriesList from '../../components/Stories/StoriesList'
import GeneralFeed from './GeneralFeed/GeneralFeed'
import RecentsFeed from './RecentsFeed/RecentsFeed'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import styles from './Feed.module.scss'

const FeedPage = ({}) => {
  return (
    <div className='page'>
      <MobileOnly>
        <MobileHeader title='Feed' />
      </MobileOnly>

      <StoriesList classes={styles} />

      <div className={styles.feeds}>
        <GeneralFeed />

        <DesktopOnly>
          <RecentsFeed />
        </DesktopOnly>
      </div>
    </div>
  )
}

export default FeedPage
