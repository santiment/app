import React from 'react'
import FeedItemRenderer from '../FeedItemRenderer/FeedItemRenderer'
import styles from '../GeneralFeed.module.scss'
import SonarFeedRecommendations from '../../../SonarFeed/SonarFeedRecommendations'

const FeedList = ({ events }) => {
  return (
    <div className={styles.scrollable}>
      {events && events.length > 0 ? (
        events.map((item, index) => {
          return <FeedItemRenderer item={item} key={index} />
        })
      ) : (
        <SonarFeedRecommendations description='There are not any activities yet' />
      )}
    </div>
  )
}

export default FeedList
