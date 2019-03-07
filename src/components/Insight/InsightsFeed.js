import React from 'react'
import WithLikesMutation from './WithLikesMutation'
import InsightCard from './InsightCardWithMarketcap'
import Feed from '../Feed/Feed'

const InsightsFeed = ({ insights }) => {
  return (
    <WithLikesMutation isFor='insights'>
      {(likeInsight, unlikeInsight) => (
        <Feed
          data={insights}
          component={({ id, ...rest }) => (
            <InsightCard
              id={id}
              {...rest}
              onLike={liked =>
                (liked ? unlikeInsight : likeInsight)({
                  variables: { id: +id }
                })
              }
            />
          )}
          dateKey='createdAt'
        />
      )}
    </WithLikesMutation>
  )
}

export default InsightsFeed
