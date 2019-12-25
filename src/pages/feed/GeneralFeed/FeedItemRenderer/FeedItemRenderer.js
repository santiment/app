import React from 'react'
import InsightCard from '../../../../components/Insight/InsightCardWithMarketcap'
import WithLikesMutation from '../../../../components/Like/WithLikesMutation'
import ActivityRenderer from '../../../SonarFeed/ActivityRenderer'
import styles from './FeedItemRenderer.module.scss'

const FeedItemRenderer = ({ item, index }) => {
  const { __typename } = item

  if (__typename === 'SignalHistoricalActivity') {
    return <ActivityRenderer activity={item} index={index} classes={styles} />
  } else if (__typename === 'TimelineEvent') {
    const { post } = item

    if (post) {
      const { id, ...rest } = post
      return (
        <WithLikesMutation>
          {mutateInsightById => (
            <InsightCard
              id={id}
              {...rest}
              className={styles.card}
              onLike={mutateInsightById}
            />
          )}
        </WithLikesMutation>
      )
    }
  }

  return null
}

export default FeedItemRenderer
