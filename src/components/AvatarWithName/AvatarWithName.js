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
    <div className={cx(styles.avatarBlock, classes.avatarBlock)}>
      <Link to={'/profile/' + id}>
        <UserAvatar
          as='div'
          userId={id}
          isExternal
          externalAvatarUrl={avatarUrl}
          classes={styles}
        />
      </Link>
      {username && (
        <Link to={'/profile/' + id}>
          <div className={cx(styles.username, classes.username)}>
            {username}
          </div>
        </Link>
      )}
    </div>
  )
}

export default AvatarWithName
