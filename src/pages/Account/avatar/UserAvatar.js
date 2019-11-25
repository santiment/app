import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import styles from './UserAvatar.module.scss'

const UserAvatar = ({
  className,
  isExternal,
  externalAvatarUrl,
  avatarUrl = ''
}) => {
  const link = isExternal ? externalAvatarUrl : avatarUrl

  return (
    <div
      className={cx(styles.avatar, className)}
      style={{
        backgroundImage: `url("${link}"`
      }}
    />
  )
}

const mapStateToProps = ({ user: { data } }) => {
  return {
    avatarUrl: data && !!data.id ? data.avatarUrl : ''
  }
}

const enchance = connect(mapStateToProps)

export default enchance(UserAvatar)
