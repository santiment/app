import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import UserAvatar from '../../../../pages/Account/avatar/UserAvatar'
import styles from './SignalCreator.module.scss'
import { personalLocation } from '../../../../pages/feed/GeneralFeed/GeneralFeed'

export const showUserActions = () =>
  window && window.location && window.location.pathname !== personalLocation

const SignalCreator = ({ user: { id, username, avatarUrl } = {} }) => {
  const show = showUserActions()

  if (!show) {
    return null
  }

  return (
    <div className={styles.container}>
      {id && (
        <UserAvatar isExternal externalAvatarUrl={avatarUrl} classes={styles} />
      )}
      <div className={cx(styles.right, !id && styles.withoutUser)}>
        {username && (
          <Link to={`/profile/${id}`} className={styles.name}>
            {username}
          </Link>
        )}
      </div>
    </div>
  )
}

export default SignalCreator
