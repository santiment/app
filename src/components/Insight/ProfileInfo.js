import React from 'react'
import { Icon } from '@santiment-network/ui'
import cx from 'classnames'
import styles from './ProfileInfo.module.scss'

const ProfileInfo = ({
  name,
  status,
  networkStatus,
  picUrl,
  className = '',
  infoClassName = ''
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.icon}>
        {picUrl ? (
          <img src={picUrl} alt='Profile Pic' />
        ) : (
          <Icon type='profile-round' />
        )}
        {networkStatus && (
          <div className={cx(styles.onlineIndicator, styles[networkStatus])} />
        )}
      </div>

      <div className={cx(styles.info, infoClassName)}>
        <div className={styles.name}>{name}</div>
        <div className={styles.status}>{status}</div>
      </div>
    </div>
  )
}

export default ProfileInfo
