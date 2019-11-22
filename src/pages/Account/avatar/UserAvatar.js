import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import styles from './UserAvatar.module.scss'

const UserAvatar = ({ className, avatarUrl = '' }) => {
  return (
    <div
      className={cx(styles.avatar, className)}
      style={{
        '--avatarUrl': `url("${avatarUrl}")`
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
