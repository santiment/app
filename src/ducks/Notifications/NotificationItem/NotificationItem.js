import React, { useMemo } from 'react'
import cx from 'classnames'
import FeedCardDate from '../../../pages/feed/GeneralFeed/CardDate/FeedCardDate'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import { useUser } from '../../../stores/user'
import styles from './NotificationItem.module.scss'

const getTitle = data => {
  const {
    payload,
    eventType,
    trigger,
    post,
    user: { username, email }
  } = data

  switch (eventType) {
    case 'trigger_fired': {
      return payload[Object.keys(payload)[0]] || trigger.title
    }
    case 'publish_insight': {
      return `${username || email} has created insight '${post.title}'`
    }
    default: {
      return null
    }
  }
}
const getType = (data, isAuthor) => {
  const { eventType } = data

  switch (eventType) {
    case 'trigger_fired': {
      return isAuthor ? 'my alert' : 'alert'
    }
    case 'publish_insight': {
      return 'insights'
    }
    default: {
      return 'alert'
    }
  }
}

const NotificationItem = ({ data, className, isNew }) => {
  const { insertedAt, user } = data

  const { user: currentUser } = useUser()

  const title = useMemo(() => getTitle(data), [data])
  const type = useMemo(() => getType(data, currentUser.id === user.id), [
    data,
    currentUser,
    user
  ])

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.title}>{title}</div>

      <div className={styles.footer}>
        <div className={styles.left}>
          <SignalCreator user={user} classes={styles}>
            <FeedCardDate date={insertedAt} className={styles.date} />
          </SignalCreator>
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
