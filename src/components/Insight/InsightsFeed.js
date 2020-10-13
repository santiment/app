import React from 'react'
import InsightCard from './InsightCardWithMarketcap'
import { publishDateSorter } from './utils'
import PulseInsightCard from './PulseInsight'
import Feed from '../Feed/Feed'
import styles from '../../ducks/Studio/RelatedInsights/RelatedInsights.module.scss'

const Insight = ({ className, ...insight }) => {
  const El = insight.isPulse ? PulseInsightCard : InsightCard
  return <El insight={insight} className={styles.insightCard} />
}

const InsightsFeed = ({ insights, dateKey = 'publishedAt' }) => (
  <Feed
    data={insights.sort(publishDateSorter)}
    dateKey={dateKey}
    component={Insight}
  />
)

export default InsightsFeed
