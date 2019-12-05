import React from 'react'
import StoriesList from '../../components/Stories/StoriesList'
import styles from './Feed.module.scss'
import GeneralFeed from './GeneralFeed/GeneralFeed'
import RecentsFeed from './RecentsFeed/RecentsFeed'

const FeedPage = ({}) => {
  return (
    <div className='page'>
      <StoriesList classes={styles} />

      <div>
        <GeneralFeed />
        <RecentsFeed />
      </div>
    </div>
  )
}

export default FeedPage
