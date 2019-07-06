import React from 'react'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../App'
import InsightCard from './InsightCard'
import styles from './InsightsWrap.module.scss'

const InsightsWrap = ({ insights, isDesktop }) => {
  return (
    <div className={styles.insights}>
      {insights.slice(0, 9).map(insight => (
        <InsightCard
          isDesktop={isDesktop}
          infoOnly
          withAuthorPic={false}
          {...insight}
          key={insight.id}
        />
      ))}
    </div>
  )
}

export default withSizes(mapSizesToProps)(InsightsWrap)
