import React from 'react'
import withSizes from 'react-sizes'
import InsightCard from './InsightCard'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './InsightsWrap.module.scss'

const InsightsWrap = ({ insights, isDesktop }) => {
  return (
    <div className={styles.insights}>
      {insights.slice(0, 9).map(insight => (
        <InsightCard
          isDesktop={isDesktop}
          disabled
          withAuthorPic={false}
          {...insight}
          key={insight.id}
        />
      ))}
    </div>
  )
}

export default withSizes(mapSizesToProps)(InsightsWrap)
