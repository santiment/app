import React from 'react'
import cx from 'classnames'
import UserAvatar from '../../pages/Account/avatar/UserAvatar'
import {
  AWAITING_APPROVAL_STATE,
  AwaitingApproval
} from './InsightCardWithMarketcap'
import styles from './ProfileInfo.module.scss'
import { getDateFormats } from '../../utils/dates'

const ProfileInfo = ({
  name,
  state,
  networkStatus,
  picUrl,
  className = '',
  infoClassName = '',
  date,
  showDate = false,
  withPic
}) => {
  const { DD, MM, YYYY } = getDateFormats(new Date(date))

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
        {showDate && (
          <div className={cx(styles.info__item, styles.status)}>
            {state === AWAITING_APPROVAL_STATE ? (
              <AwaitingApproval />
            ) : (
              `${MM} ${DD}, ${YYYY}`
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
