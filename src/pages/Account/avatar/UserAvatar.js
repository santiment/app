import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import styles from './UserAvatar.module.scss'

const UserAvatar = ({
  userId,
  avatarUrl,
  as: El = Link,
  classes = {},
  externalAvatarUrl,
  isCurrentUser = false
}) => {
  const picUrl = externalAvatarUrl || avatarUrl
  const linkTo = userId
    ? '/profile/' + userId
    : externalAvatarUrl
    ? ''
    : '/account'

  return (
    <El
      to={!isCurrentUser && linkTo}
      className={cx(
        styles.avatar,
        classes.avatar,
        !picUrl && classes.avatarEmpty,
        isCurrentUser && classes.editable
      )}
      style={{ backgroundImage: `url("${picUrl}"` }}
    >
      {isCurrentUser && <Icon type='edit' className={classes.editableAvatar} />}
      {!picUrl && <Icon type='profile' className={classes.avatarIcon} />}
    </El>
  )
}

export default UserAvatar
