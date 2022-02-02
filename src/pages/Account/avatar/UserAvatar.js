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
}) => {
  const picUrl = externalAvatarUrl || avatarUrl
  const linkTo = userId
    ? '/profile/' + userId
    : externalAvatarUrl
    ? ''
    : '/account'

  return (
    <El
      to={linkTo}
      className={cx(
        styles.avatar,
        classes.avatar,
        !picUrl && classes.avatarEmpty,
      )}
      style={{ backgroundImage: `url("${picUrl}"` }}
    >
      {!picUrl && <Icon type='profile' className={classes.avatarIcon} />}
    </El>
  )
}

export default UserAvatar
