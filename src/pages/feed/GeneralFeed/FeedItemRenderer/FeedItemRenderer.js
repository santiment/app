import React from 'react'
import SignalCard from '../../../../components/SignalCard/SignalCard'
import WatchlistCard from '../../../../components/Watchlists/WatchlistCard'
import { getSharedWatchlistLink } from '../../../../components/Watchlists/FeaturedWatchlist'
import InsightCard from '../../../../components/Insight/InsightCardWithMarketcap'
import WithLikesMutation from '../../../../components/Like/WithLikesMutation'
import styles from './FeedItemRenderer.module.scss'

const FeedItemRenderer = ({
  item: { eventType, trigger, post, userList: watchlist }
}) => {
  if (trigger) {
    return (
      <SignalCard
        deleteEnabled={false}
        isUserTheAuthor={false}
        id={trigger.id}
        goToSignalSettings={() => {
          // goToSignalSettings(id)
        }}
        className={styles.card}
        signal={trigger}
      />
    )
  }

  if (watchlist) {
    const { name, ...rest } = watchlist
    return (
      <WatchlistCard
        name={name}
        to={getSharedWatchlistLink(watchlist)}
        className={styles.card}
        {...rest}
      />
    )
  }

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

  return null
}

export default FeedItemRenderer
