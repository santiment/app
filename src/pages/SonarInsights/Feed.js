import React, { Fragment } from 'react'
import moment from 'moment'
import LazyLoad from 'react-lazyload'
import styles from './Feed.module.scss'

// NOTE(vanguard): implement infinite-scroll, not lazy load
const Feed = ({ component: El, data, dateKey }) => {
  let lastDateKey

  return data.map((item, index) => {
    const id = item.id || index
    const date = moment(item[dateKey]).format('MMM D')
    const isNotSameAsLastDate = date !== lastDateKey

    if (isNotSameAsLastDate) {
      lastDateKey = date
    }

    return (
      <LazyLoad offset={1000} once key={id}>
        {isNotSameAsLastDate && <h4 className={styles.date}>{date}</h4>}
        <El className={styles.signal} {...item} />
      </LazyLoad>
    )
  })
}

export default Feed
