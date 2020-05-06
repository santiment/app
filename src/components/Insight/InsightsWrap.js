import React from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import InsightCard from './InsightCard'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './InsightsWrap.module.scss'

const InsightsWrap = ({
  insights,
  isDesktop,
  withAuthorPic = false,
  classes = {}
}) => {
  return (
    <div className={cx(styles.insights, classes.insights)}>
      {insights.slice(0, 9).map(insight => (
        <InsightCard
          isDesktop={isDesktop}
          disabled
          withAuthorPic={withAuthorPic}
          {...insight}
          key={insight.id}
          showDate={true}
          className={cx(styles.insightCard, classes.insightCard)}
        />
      ))}
    </div>
  )
}

export default withSizes(mapSizesToProps)(InsightsWrap)
