import React, { Fragment } from 'react'
import { getDateFormats } from '../../utils/dates'
import { makeDateLabel } from '../../pages/feed/GeneralFeed/FeedList/FeedList'
import styles from './Feed.module.scss'

const Feed = ({ component: El, data, dateKey }) => {
  let lastDateKey

  return data.map((item, index) => {
    const id = item.id || index

    let isNotSameAsLastDate, date
    if (dateKey) {
      const { MMM, D } = getDateFormats(new Date(item[dateKey]))
      date = `${MMM} ${D}`
      isNotSameAsLastDate = date !== lastDateKey

      if (isNotSameAsLastDate) {
        lastDateKey = date
      }
    }

    return (
      <Fragment key={id}>
        {isNotSameAsLastDate && (
          <h4 className={styles.date}>
            {makeDateLabel(new Date(item[dateKey]))}
          </h4>
        )}
        <El className={styles.signal} {...item} />
      </Fragment>
    )
  })
}

export default Feed
