import React from 'react'
import InsightCard from '../../../../components/Insight/InsightCardWithMarketcap'
import WithLikesMutation from '../../../../components/Like/WithLikesMutation'
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
  const { __typename, user = {}, payload, trigger, insertedAt } = item
  const { id } = user

  if (payload && trigger) {
    let isTrendingWords = isTrendingWordsSignal(trigger)

    return (
      <>
        {isTrendingWords ? (
          <TrendingWordsSignalCard
            signal={trigger}
            date={insertedAt}
            className={styles.card}
            activityPayload={payload.default}
            creatorId={id}
            user={user}
          />
        ) : (
          <ActivityRenderer
            date={insertedAt}
            activity={item}
            index={index}
            user={user}
            classes={styles}
          />
        )}
      </>
    )
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
              onLike={mutateInsightById(id)}
            />
          )}
        </WithLikesMutation>
      )
    }
  }

  return null
}

export default FeedItemRenderer
