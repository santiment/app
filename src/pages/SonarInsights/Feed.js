import React, { Fragment } from 'react'
import moment from 'moment'
import styles from './Feed.module.scss'

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
      <Fragment key={id}>
        {isNotSameAsLastDate && <h4 className={styles.date}>{date}</h4>}
        <El className={styles.signal} {...item} />
      </Fragment>
    )
  })
}

export default Feed
