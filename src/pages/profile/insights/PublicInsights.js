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
      <InsightsFeed
        insights={insights}
        classes={publicInsightStyles}
        dateKey={null}
      />
    </div>
  )
}

export default PublicInsights
