import React, { Fragment } from 'react'
import FeedItemRenderer from '../FeedItemRenderer/FeedItemRenderer'
import SonarFeedRecommendations from '../../../SonarFeed/SonarFeedRecommendations'
import Loader from '@santiment-network/ui/Loader/Loader'
import MakeProSubscriptionCard from '../MakeProSubscriptionCard/MakeProSubscriptionCard'
import externalStyles from '../GeneralFeed.module.scss'
import styles from './FeedList.module.scss'

const FeedList = ({ events, isLoading }) => {
  return (
    <div className={externalStyles.scrollable}>
      {events && events.length > 0 ? (
        events.map((item, index) => {
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
