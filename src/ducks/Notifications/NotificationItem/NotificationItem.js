import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import FeedCardDate from '../../../pages/feed/GeneralFeed/CardDate/FeedCardDate'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import { useUser } from '../../../stores/user'
import { NewLabelTemplate } from '../../../components/NewLabel/NewLabel'
import { MoreInfoAlert } from '../../../pages/feed/GeneralFeed/FeedItemRenderer/feedSignalCardWithMarkdown/FeedSignalCardWithMarkdown'
import { getLink, getTitle, getTypes, TRIGGER_FIRED } from './utils'
import { getUserTriggerData } from '../../../pages/SonarFeed/ActivityRenderer/ActivityWithBacktesting'
import NotificationActions from '../../../components/NotificationBellBtn/NotificationActions'
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

const NotificationItem = ({
  data,
  isOpened,
  className,
  timeoutIndex,
  closeDropdown,
  isNew: isNewInput,
}) => {
  const { insertedAt, user } = data
  const { user: currentUser } = useUser()

  const [isNew, setIsNew] = useState(isNewInput)
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    setIsNew(isNewInput)
  }, [isNewInput])

  useEffect(() => {
    if (isOpened) {
      const timeoutId = setTimeout(() => {
        setIsNew(false)
      }, (timeoutIndex + 2) * 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [isOpened])

  const title = useMemo(() => getTitle(data), [data])
  const linkTo = useMemo(() => getLink(data), [data])
  const types = useMemo(() => getTypes(data, currentUser && currentUser.id === user.id), [
    data,
    currentUser,
    user,
  ])
  const isAlertAuthor =
    data.eventType === TRIGGER_FIRED && currentUser && currentUser.id === user.id

  function onClick () {
    if (linkTo) {
      window.open(linkTo, '_blank')
      closeDropdown && closeDropdown()
    }
  }

  function mouseEnter () {
    if (isNew) {
      setIsNew(false)
    }

    setIsHover(true)
  }

  function mouseLeave () {
    setIsHover(false)
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className={cx(styles.container, className, isNew && styles.container__unread)}
    >
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.actions}>
          {isNewInput && <NewLabelTemplate className={styles.new} />}
          {isHover && <NotificationActions data={data} className={styles.action} />}
        </div>
      </div>

      <div className={styles.footer}>
        <div>
          {isAlertAuthor ? (
            <AlertPlaceholder data={data} />
          ) : (
            <SignalCreator user={user} classes={styles} onClick={closeDropdown}>
              <FeedCardDate date={insertedAt} className={styles.date} />
            </SignalCreator>
          )}
        </div>

        {types && <div className={styles.right}>{types}</div>}
      </div>
    </div>
  )
}

export default NotificationItem
