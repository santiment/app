import React, { useMemo } from 'react'
import cx from 'classnames'
import FeedCardDate from '../../../pages/feed/GeneralFeed/CardDate/FeedCardDate'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import { useUser } from '../../../stores/user'
import { NewLabelTemplate } from '../../../components/NewLabel/NewLabel'
import { MoreInfoAlert } from '../../../pages/feed/GeneralFeed/FeedItemRenderer/feedSignalCardWithMarkdown/FeedSignalCardWithMarkdown'
import { getUserTriggerData } from '../../../pages/SonarFeed/ActivityRenderer/ActivityWithBacktesting'
import OpenSignalLink from '../../Signals/link/OpenSignalLink'
import styles from './NotificationItem.module.scss'

const TRIGGER_FIRED = 'trigger_fired'

const getTitle = data => {
  const {
    payload,
    eventType,
    trigger,
    post,
    user: { username, email }
  } = data

  switch (eventType) {
    case TRIGGER_FIRED: {
      return (
        payload[Object.keys(payload)[0]] || <OpenSignalLink signal={trigger} />
      )
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
      return isAuthor ? 'my alerts' : 'alert'
    }
    case 'publish_insight': {
      return 'insights'
    }
    default: {
      return 'alert'
    }
  }
}

const AlertPlaceholder = ({ data }) => {
  const { user_trigger_data: { default: { type } = {} } = {} } = data.data

  console.log(data.data, type)

  if (type) {
    return <MoreInfoAlert type={type} />
  }

  const triggerData = getUserTriggerData(data.data)

  if (triggerData && triggerData.project_slug) {
    return (
      <MoreInfoAlert
        className={styles.more}
        slug={triggerData.project_slug}
        type={triggerData.type}
      />
    )
  }

  return null
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

  const isAlertAuthor =
    data.eventType === TRIGGER_FIRED && currentUser.id === user.id

  return (
    <div
      className={cx(
        styles.container,
        className,
        isNew && styles.container__unread
      )}
    >
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>

        {isNew && <NewLabelTemplate className={styles.new} />}
      </div>

      <div className={styles.footer}>
        <div className={styles.left}>
          {!isAlertAuthor ? (
            <SignalCreator user={user} classes={styles}>
              <FeedCardDate date={insertedAt} className={styles.date} />
            </SignalCreator>
          ) : (
            <AlertPlaceholder data={data} />
          )}
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
