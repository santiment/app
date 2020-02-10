import React from 'react'
import withSizes from 'react-sizes'
import InsightCard from './InsightCard'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './InsightsWrap.module.scss'

const InsightsWrap = ({ insights, isDesktop, withAuthorPic = false }) => {
  return (
    <div className={styles.insights}>
      {insights.slice(0, 9).map(insight => (
        <InsightCard
          isDesktop={isDesktop}
          disabled
          withAuthorPic={withAuthorPic}
          {...insight}
          key={insight.id}
          showDate={true}
        />
      ))}
    </div>
  )
}

export default withSizes(mapSizesToProps)(InsightsWrap)
