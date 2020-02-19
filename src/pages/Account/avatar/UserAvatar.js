import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import styles from './UserAvatar.module.scss'

const UserAvatar = ({
  classes = {},
  isExternal,
  externalAvatarUrl,
  avatarUrl = '',
  as: El = Link,
  userId,
  to
}) => {
  const picUrl = isExternal ? externalAvatarUrl : avatarUrl

  const linkTo = to || '/profile/' + userId

  return (
    <El
      to={linkTo}
      className={cx(
        styles.avatar,
        classes.avatar,
        !picUrl && classes.avatarEmpty
      )}
      style={{
        backgroundImage: `url("${picUrl}"`
      }}
    >
      {!picUrl && <Icon type='profile' className={classes.avatarIcon} />}
    </El>
  )
}

const mapStateToProps = ({ user: { data } }) => {
  return {
    avatarUrl: data && !!data.id ? data.avatarUrl : ''
  }
}

const enchance = connect(mapStateToProps)

export default enchance(UserAvatar)
