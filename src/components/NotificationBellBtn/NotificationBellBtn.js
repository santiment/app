import React, { useMemo } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { useEnableNotifications, useFollowers } from './hooks'
import styles from './NotificationBellBtn.module.scss'

const NotificationBellBtn = ({ targetUserId, className }) => {
  const { data, loading } = useFollowers()

  const followingInfo = useMemo(
    () => {
      return (
        data &&
        data.following2.users.find(
          ({ userId, isNotificationDisabled }) => +userId === +targetUserId
        )
      )
    },
    [data]
  )

  const { toggle, loading: toggleRequestSending } = useEnableNotifications()

  const { isNotificationDisabled } = followingInfo || {}
  console.log('isFollowing', isNotificationDisabled, data)

  const disabled = loading || toggleRequestSending
  return (
    <Icon
      type='bell'
      onClick={() => !disabled && toggle(targetUserId, !isNotificationDisabled)}
      className={cx(
        styles.icon,
        className,
        !isNotificationDisabled && !disabled && styles.icon__active
      )}
    />
  )
}

export default NotificationBellBtn
