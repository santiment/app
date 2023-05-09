import React from 'react'
import { InsightCard, PulseInsight } from '../InsightCard'
import { publishDateSorter } from './utils'
import Feed from '../Feed/Feed'

const Insight = ({ className, ...insight }) => {
  const El = insight.isPulse ? PulseInsight : InsightCard
  return <El insight={insight} class='mrg-l mrg--b' />
}

const InsightsFeed = ({ insights, dateKey = 'publishedAt' }) => (
  <Feed data={insights.sort(publishDateSorter)} dateKey={dateKey} component={Insight} />
)

export default InsightsFeed
