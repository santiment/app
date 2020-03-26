import React from 'react'
import cx from 'classnames'
import WithInsightsLikesMutation from '../Like/WithInsightLikesMutation'
import InsightCard from './InsightCardWithMarketcap'
import Feed from '../Feed/Feed'
import { publishDateSorter } from './utils'

const InsightsFeed = ({
  insights,
  dateKey = 'createdAt',
  isAllInsightsPage,
  classes = {}
}) => {
  return (
    <WithInsightsLikesMutation>
      {mutateInsightById => (
        <Feed
          isAllInsightsPage={isAllInsightsPage}
          data={insights.sort(publishDateSorter)}
          component={({ id, className, ...rest }) => (
            <InsightCard
              id={id}
              {...rest}
              classes={{
                card: cx(className, classes.insightCard)
              }}
              onLike={mutateInsightById(id)}
            />
          )}
          dateKey={dateKey}
        />
      )}
    </WithInsightsLikesMutation>
  )
}

export default InsightsFeed
