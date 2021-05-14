import React from 'react'
import cx from 'classnames'
import styles from './NotificationItem.module.scss'
import OpenSignalLink from '../../Signals/link/OpenSignalLink'
import FeedCardDate from '../../../pages/feed/GeneralFeed/CardDate/FeedCardDate'

const getTitle = data => {
  return 'Title'
}
const getType = data => {
  return 'alert'
}

const NotificationItem = ({ data, className }) => {
  console.log(data)

  const { date, triggeredAt } = data

  const title = getTitle(data)
  const type = getType(data)

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.title} />

      <div className={styles.footer}>
        <div className={styles.left}>
          <FeedCardDate date={triggeredAt || date} />
        </div>

        {type && (
          <div className={styles.right}>
            <div className={styles.type}>{type}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationItem
