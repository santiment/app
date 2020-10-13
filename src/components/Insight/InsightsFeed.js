import React from 'react'
import cx from 'classnames'
import InsightCard from './InsightCardWithMarketcap'
import Feed from '../Feed/Feed'
import { publishDateSorter } from './utils'
import PulseInsightCard from './PulseInsight'

const InsightsFeed = ({ insights, dateKey = 'createdAt', classes = {} }) => {
  return (
    <Feed
      data={insights.sort(publishDateSorter)}
      component={insight => {
        const { isPulse } = insight
        const { id, className, ...rest } = insight

        return isPulse ? (
          <PulseInsightCard
            key={id}
            insight={insight}
            className={classes.insightCard}
          />
        ) : (
          <InsightCard
            id={id}
            insight={insight}
            // classes={{
            // card: cx(className, classes.insightCard),
            // }}
          />
        )
      }}
      dateKey={dateKey}
    />
  )
}

export default InsightsFeed
