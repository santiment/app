import React from 'react'
import InsightCard from '../../../../components/Insight/InsightCardWithMarketcap'
import WithFeedEventLikesMutation from '../../../../components/Like/WithFeedEventLikesMutation'
import WithInsightLikesMutation from '../../../../components/Like/WithInsightLikesMutation'
import ActivityRenderer from '../../../SonarFeed/ActivityRenderer/ActivityRenderer'
import TrendingWordsSignalCard from '../../../../components/SignalCard/card/TrendingWordsSignalCard'
import styles from './FeedItemRenderer.module.scss'

const isTrendingWordsSignal = trigger => {
  if (!trigger.settings) {
    return false
  }

  if (trigger.settings.type === 'trending_words') {
    return true
  }

  return trigger.settings.operation && trigger.settings.operation.trending_word
}

const FeedItemRenderer = ({ item, index }) => {
  const { id: eventId, __typename, payload, trigger, insertedAt } = item

  if (payload && trigger) {
    let isTrendingWords = isTrendingWordsSignal(trigger)

    return (
      <WithFeedEventLikesMutation>
        {like =>
          isTrendingWords ? (
            <TrendingWordsSignalCard
              activity={item}
              className={styles.card}
              activityPayload={payload.default}
              onLike={like(eventId)}
            />
          ) : (
            <ActivityRenderer
              date={insertedAt}
              activity={item}
              index={index}
              classes={styles}
              onLike={like(eventId)}
            />
          )
        }
      </WithFeedEventLikesMutation>
    )
  } else if (__typename === 'TimelineEvent') {
    const { post } = item

    if (post) {
      const { id: insightId, ...rest } = post
      return (
        <WithInsightLikesMutation>
          {like => (
            <InsightCard
              id={insightId}
              {...rest}
              className={styles.card}
              onLike={like(insightId)}
              showIcon={true}
            />
          )}
        </WithInsightLikesMutation>
      )
    }
  }

  return null
}

export default FeedItemRenderer
