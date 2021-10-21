import React from 'react'
import cx from 'classnames'
import GeneralFeed from './GeneralFeed/GeneralFeed'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import styles from './Feed.module.scss'

const FeedPage = ({ location }) => {
  return (
    <div className={cx('page', styles.feed)}>
      <MobileHeader title='Feed' />
      <div className={styles.feeds}>
        <GeneralFeed location={location} />
      </div>
    </div>
  )
}

export default FeedPage
