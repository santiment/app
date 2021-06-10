import React, { useMemo } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { useDialogState } from '../../hooks/dialog'
import { useFollowers, useNotificationToggle } from './hooks'
import styles from './NotificationActions.module.scss'
import { isInFollowers } from '../../pages/profile/follow/FollowBtn'
import { useUser } from '../../stores/user'

const NotificationActions = ({ data, className }) => {
  const { user } = data

  const { data: followData = {} } = useFollowers()
  const { isOpened, openDialog, closeDialog } = useDialogState()
  const { user: currenUser = {} } = useUser()

  const usersList = useMemo(
    () => {
      const { following2 } = followData
      if (!following2 || !following2.users) {
        return []
      } else {
        return following2.users.map(({ userId }) => ({ id: userId }))
      }
    },
    [followData]
  )

  const isInFollowersList = useMemo(
    () => {
      if (!currenUser) {
        return false
      }

      return isInFollowers(usersList, user.id, currenUser.id)
    },
    [usersList, user, currenUser]
  )

  if (!isInFollowersList) {
    return null
  }

  return (
    <ContextMenu
      onOpen={openDialog}
      onClose={closeDialog}
      open={isOpened}
      trigger={
        <Button
          className={cx(styles.expand, className)}
          variant='ghost'
          onClick={e => {
            e.stopPropagation()
            openDialog()
          }}
        >
          <Icon type='dots' className={styles.expand__icon} />
        </Button>
      }
      passOpenStateAs='data-isactive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.modal}>
        <ToggleNotifications user={user} />
      </Panel>
    </ContextMenu>
  )
}

const ToggleNotifications = ({ user }) => {
  const { username = 'this user', id } = user
  const { isNotificationDisabled, toggle, disabledBtn } = useNotificationToggle(
    id
  )

  const onClick = e => {
    e.stopPropagation()
    toggle(id, !isNotificationDisabled)
  }

  return (
    <Button
      disabled={disabledBtn}
      variant='ghost'
      onClick={onClick}
      icon='settings'
      className={styles.toggle}
    >
      Turn {isNotificationDisabled ? 'on' : 'off'} all from {username}
    </Button>
  )
}

export default NotificationActions
