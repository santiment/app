import React from 'react'
import FeedItemRenderer from '../FeedItemRenderer/FeedItemRenderer'
import SonarFeedRecommendations from '../../../SonarFeed/SonarFeedRecommendations'
import Loader from '@santiment-network/ui/Loader/Loader'
import externalStyles from '../GeneralFeed.module.scss'
import styles from './FeedList.module.scss'

const FeedList = ({ events, isLoading }) => {
  return (
    <div className={externalStyles.scrollable}>
      {events && events.length > 0 ? (
        events.map((item, index) => {
          return <FeedItemRenderer item={item} key={index} index={index} />
        })
      ) : (
        <SonarFeedRecommendations description='There are not any activities yet' />
      )}
      {isLoading && <Loader className={styles.loader} />}
    </div>
  )
}

export default FeedList
