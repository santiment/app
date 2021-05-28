import React, { useMemo } from 'react'
import cx from 'classnames'
import FeedCardDate from '../../../pages/feed/GeneralFeed/CardDate/FeedCardDate'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import { useUser } from '../../../stores/user'
import { NewLabelTemplate } from '../../../components/NewLabel/NewLabel'
import { MoreInfoAlert } from '../../../pages/feed/GeneralFeed/FeedItemRenderer/feedSignalCardWithMarkdown/FeedSignalCardWithMarkdown'
import { getTitle, getType, getUserTriggerData, TRIGGER_FIRED } from './utils'
import styles from './NotificationItem.module.scss'

const AlertPlaceholder = ({ data }) => {
  const { user_trigger_data: { default: { type } = {} } = {} } = data.data

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
        link={data.trigger && `/alert/${data.trigger.id}`}
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
