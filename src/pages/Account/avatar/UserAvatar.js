import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import styles from './UserAvatar.module.scss'

const UserAvatar = ({
  classes = {},
  isExternal,
  externalAvatarUrl,
  avatarUrl = ''
}) => {
  const link = isExternal ? externalAvatarUrl : avatarUrl

  return (
    <div
      className={cx(
        styles.avatar,
        classes.avatar,
        !link && classes.avatarEmpty
      )}
      style={{
        backgroundImage: `url("${link}"`
      }}
    >
      {!link && <Icon type='profile' className={classes.avatarIcon} />}
    </div>
  )
}

const mapStateToProps = ({ user: { data } }) => {
  return {
    avatarUrl: data && !!data.id ? data.avatarUrl : ''
  }
}

const enchance = connect(mapStateToProps)

export default enchance(UserAvatar)
