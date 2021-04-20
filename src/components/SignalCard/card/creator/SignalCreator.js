import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import UserAvatar from '../../../../pages/Account/avatar/UserAvatar'
import { personalLocation } from '../../../../pages/feed/GeneralFeed/locations'
import styles from './SignalCreator.module.scss'

export const showUserActions = () =>
  window && window.location && window.location.pathname !== personalLocation

const SignalCreator = ({
  className,
  classes = {},
  user: { id, username, avatarUrl } = {}
}) => {
  const show = showUserActions()

  if (!show) {
    return null
  }

  return (
    <Link to={'/profile/' + id} className={cx(styles.container, className)}>
      <UserAvatar
        as='div'
        userId={id}
        isExternal
        externalAvatarUrl={avatarUrl}
        classes={{ ...styles, ...classes }}
      />
      {username && (
        <div
          className={cx(
            styles.right,
            !id && styles.withoutUser,
            classes.username
          )}
        >
          {username}
        </div>
      )}
    </Link>
  )
}

export default SignalCreator
