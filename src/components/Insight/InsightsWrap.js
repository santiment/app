import React from 'react'
import InsightCard from './InsightCard'
import styles from './InsightsWrap.module.scss'

const InsightsWrap = ({ insights }) => {
  return (
    <div className={styles.insights}>
      {insights.map(insight => (
        <InsightCard
          small
          grey
          withAuthorPic={false}
          {...insight}
          key={insight.id}
          className={styles.insight}
        />
      ))}
    </div>
  )
}

export default InsightsWrap
