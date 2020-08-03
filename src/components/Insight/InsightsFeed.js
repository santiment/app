import React from 'react'
import cx from 'classnames'
import WithInsightsLikesMutation from '../Like/WithInsightLikesMutation'
import InsightCard from './InsightCardWithMarketcap'
import Feed from '../Feed/Feed'
import { publishDateSorter } from './utils'
import PulseInsightWrapper from './PulseInsight'

const InsightsFeed = ({ insights, dateKey = 'createdAt', classes = {} }) => {
  return (
    <WithInsightsLikesMutation>
      {mutateInsightById => (
        <Feed
          data={insights.sort(publishDateSorter)}
          component={insight => {
            const { isPulse } = insight
            const { id, className, ...rest } = insight

            return !isPulse ? (
              <InsightCard
                id={id}
                {...rest}
                classes={{
                  card: cx(className, classes.insightCard)
                }}
                onLike={mutateInsightById(id)}
              />
            ) : (
              <PulseInsightWrapper key={id} insight={insight} />
            )
          }}
          dateKey={dateKey}
        />
      )}
    </WithInsightsLikesMutation>
  )
}

export default InsightsFeed
