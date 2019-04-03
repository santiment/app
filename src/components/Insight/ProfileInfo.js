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
  infoClassName = '',
  noPic
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {!noPic && (
        <div className={styles.icon}>
          {picUrl ? (
            <img src={picUrl} alt='Profile Pic' />
          ) : (
            <Icon type='profile-round' />
          )}
          {networkStatus && (
            <div
              className={cx(styles.onlineIndicator, styles[networkStatus])}
            />
          )}
        </div>
      )}

      <div className={cx(styles.info, infoClassName)}>
        <div className={cx(styles.info__item, styles.name)}>{name}</div>
        {status && (
          <div className={cx(styles.info__item, styles.status)}>{status}</div>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
