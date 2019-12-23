import React from 'react'
import SonarFeedActivityPage from '../../../SonarFeed/SonarFeedActivityPage'
import FeedItemRenderer from '../FeedItemRenderer/FeedItemRenderer'
import styles from '../GeneralFeed.module.scss'

const FeedList = ({ events }) => {
  return (
    <div className={styles.scrollable}>
      {!events || !events.length ? (
        <SonarFeedActivityPage />
      ) : (
        events.map((item, index) => {
          return <FeedItemRenderer item={item} key={index} />
        })
      )}
    </div>
  )
}

export default FeedList
