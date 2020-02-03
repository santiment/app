import React from 'react'
import cx from 'classnames'
import UserAvatar from '../../pages/Account/avatar/UserAvatar'
import styles from './ProfileInfo.module.scss'

const ProfileInfo = ({
  name,
  networkStatus,
  picUrl,
  className = '',
  infoClassName = '',
  withPic
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {withPic && (
        <div className={styles.icon}>
          <UserAvatar isExternal externalAvatarUrl={picUrl} />
          {networkStatus && (
            <div
              className={cx(styles.onlineIndicator, styles[networkStatus])}
            />
          )}
        </div>
      )}

      <div className={cx(styles.info, infoClassName)}>
        <div className={cx(styles.info__item, styles.name)}>{name}</div>
      </div>
    </div>
  )
}

export default ProfileInfo
