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
  onClick,
  classes = {},
  user: { id, username, email, avatarUrl } = {},
  children
}) => {
  const show = showUserActions()

  if (!show) {
    return null
  }

  const nameOrEmail = username || email

  return (
    <Link
      to={'/profile/' + id}
      className={cx(styles.container, className)}
      onClick={e => {
        e.stopPropagation()
        onClick && onClick()
      }}
    >
      <UserAvatar
        as='div'
        userId={id}
        isExternal
        externalAvatarUrl={avatarUrl}
        classes={{ ...styles, ...classes }}
      />
      {nameOrEmail && (
        <div
          className={cx(
            styles.right,
            !id && styles.withoutUser,
            classes.username
          )}
        >
          {nameOrEmail}
          {children}
        </div>
      )}
    </Link>
  )
}

export default SignalCreator
