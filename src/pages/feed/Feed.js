import React from 'react'
import StoriesList from '../../components/Stories/StoriesList'
import styles from './Feed.module.scss'

const FeedPage = ({}) => {
  return (
    <div className='page'>
      <StoriesList classes={styles} />
      Feed
    </div>
  )
}

export default FeedPage
