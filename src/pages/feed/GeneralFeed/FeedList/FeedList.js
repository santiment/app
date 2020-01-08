import React, { Fragment } from 'react'
import FeedItemRenderer from '../FeedItemRenderer/FeedItemRenderer'
import SonarFeedRecommendations from '../../../SonarFeed/SonarFeedRecommendations'
import Loader from '@santiment-network/ui/Loader/Loader'
import externalStyles from '../GeneralFeed.module.scss'
import styles from './FeedList.module.scss'
import MakeProSubscriptionCard from '../MakeProSubscriptionCard/MakeProSubscriptionCard'

const FeedList = ({ events, isLoading }) => {
  const data = events.filter(({ post, payload }) => payload || post)
  return (
    <div className={externalStyles.scrollable}>
      {data && data.length > 0 ? (
        data.map((item, index) => {
          return (
            <Fragment key={index}>
              <FeedItemRenderer item={item} index={index} />
              {index === 2 && <MakeProSubscriptionCard />}
            </Fragment>
          )
        })
      ) : (
        <SonarFeedRecommendations description='There are not any activities yet' />
      )}
      {isLoading && <Loader className={styles.loader} />}
    </div>
  )
}

export default FeedList
