import React from 'react'
import StoriesList from '../../components/Stories/StoriesList'
import GeneralFeed from './GeneralFeed/GeneralFeed'
import RecentsFeed from './RecentsFeed/RecentsFeed'
import styles from './Feed.module.scss'

const FeedPage = ({}) => {
  return (
    <div className='page'>
      <StoriesList classes={styles} />

      <div className={styles.feeds}>
        <GeneralFeed />
        <RecentsFeed />
      </div>
    </div>
  )
}

export default FeedPage
