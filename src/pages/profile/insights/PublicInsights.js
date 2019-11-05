import React from 'react'
import InsightsFeed from '../../../components/Insight/InsightsFeed'
import styles from './../ProfilePage.module.scss'
import publicInsightStyles from './PublicInsights.module.scss'

const PublicInsights = props => {
  const { data: insights } = props

  if (!insights || insights.length === 0) {
    return null
  }

  return (
    <div className={styles.block}>
      <div className={styles.title}>Public insights ({insights.length})</div>
      <div className={publicInsightStyles.insightsFeed}>
        <InsightsFeed insights={insights} classes={publicInsightStyles} />
      </div>
    </div>
  )
}

export default PublicInsights
