import React from 'react'
import cx from 'classnames'
import InsightCard from '../../../../components/Insight/InsightCardWithMarketcap'
import WithFeedEventLikesMutation from '../../../../components/Like/WithFeedEventLikesMutation'
import WithInsightLikesMutation from '../../../../components/Like/WithInsightLikesMutation'
import ActivityRenderer from '../../../SonarFeed/ActivityRenderer/ActivityRenderer'
import TrendingWordsSignalCard, {
  isTrendingWordsSignal
} from '../../../../components/SignalCard/card/TrendingWordsSignalCard'
import PulseInsight from '../../../../components/Insight/PulseInsight'
import styles from './FeedItemRenderer.module.scss'

const FeedItemRenderer = ({ item, index, showProfileExplanation }) => {
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
              showProfileExplanation={showProfileExplanation}
            />
          )
        }
      </WithFeedEventLikesMutation>
    )
  } else if (__typename === 'TimelineEvent') {
    const { post } = item

    if (post) {
      return post.isPulse ? (
        <PulseInsight
          insight={post}
          className={cx(styles.card, styles.pulseInsight)}
        />
      ) : (
        <InsightCard insight={post} classes={styles} />
      )
    }
  }

  return null
}

export default FeedItemRenderer
