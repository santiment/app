import React from 'react'
import cx from 'classnames'
import WithLikesMutation from '../Like/WithLikesMutation'
import InsightCard from './InsightCardWithMarketcap'
import Feed from '../Feed/Feed'

const InsightsFeed = ({
  insights,
  isAllInsightsPage,
  showDate = true,
  classes = {}
}) => {
  return (
    <WithLikesMutation>
      {mutateInsightById => (
        <Feed
          showDate={showDate}
          isAllInsightsPage={isAllInsightsPage}
          data={insights}
          component={({ id, className, ...rest }) => (
            <InsightCard
              id={id}
              {...rest}
              className={cx(className, classes.insightCard)}
              onLike={mutateInsightById(id)}
            />
          )}
          dateKey='createdAt'
        />
      )}
    </WithLikesMutation>
  )
}

export default InsightsFeed
