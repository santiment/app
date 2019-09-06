import React, { Fragment } from 'react'
import FeaturedInsightsHorizontal from '../FeaturedInsights/FeaturedInsightsHorizontal'
import { getDateFormats } from '../../utils/dates'
import styles from './Feed.module.scss'

const SHOW_AFTER_EL_NUMBER = 2

const Feed = ({
  component: El,
  data,
  showDate = true,
  dateKey,
  isAllInsightsPage
}) => {
  let lastDateKey
  return data.map((item, index) => {
    const id = item.id || index
    const { MMM, D } = getDateFormats(new Date(item[dateKey]))
    const date = `${MMM} ${D}`
    const isNotSameAsLastDate = date !== lastDateKey

    if (isNotSameAsLastDate) {
      lastDateKey = date
    }

    return (
      <Fragment key={id}>
        {showDate && isNotSameAsLastDate && (
          <h4 className={styles.date}>{date}</h4>
        )}
        <El className={styles.signal} {...item} />
        {isAllInsightsPage && index === SHOW_AFTER_EL_NUMBER && (
          <FeaturedInsightsHorizontal
            maxLines={3}
            multilineTextId='InsightsBetweenFeeds'
          />
        )}
      </Fragment>
    )
  })
}

export default Feed
