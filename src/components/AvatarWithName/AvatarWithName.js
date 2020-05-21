import React from 'react'
import cx from 'classnames'
import styles from './AvatarWithName.module.scss'
import UserAvatar from '../../pages/Account/avatar/UserAvatar'
import { Link } from 'react-router-dom'

const AvatarWithName = ({ user, classes = {} }) => {
  if (!user || !user.id) {
    return null
  }

  const { id, username, avatarUrl } = user

  return (
    <Link
      to={'/profile/' + id}
      className={cx(styles.avatarBlock, classes.avatarBlock)}
    >
      <UserAvatar
        as='div'
        userId={id}
        isExternal
        externalAvatarUrl={avatarUrl}
        classes={styles}
      />
      {username && (
        <div className={cx(styles.username, classes.username)}>{username}</div>
      )}
    </Link>
  )
}

export default AvatarWithName
