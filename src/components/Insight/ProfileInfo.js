import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { DesktopOnly } from '../Responsive'
import { getDateFormats } from '../../utils/dates'
import UserAvatar from '../../pages/Account/avatar/UserAvatar'
import styles from './ProfileInfo.module.scss'

const ProfileInfo = ({
  authorName,
  state,
  networkStatus,
  picUrl,
  className = '',
  infoClassName = '',
  date,
  showDate = false,
  withPic,
  authorId,
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {withPic && (
        <div className={styles.icon}>
          <UserAvatar userId={authorId} externalAvatarUrl={picUrl} />
          {networkStatus && <div className={cx(styles.onlineIndicator, styles[networkStatus])} />}
        </div>
      )}

      <div className={cx(styles.info, infoClassName)}>
        <div className={cx(styles.info__item, styles.name)}>
          <Link className={styles.name} to={`/profile/${authorId}`}>
            {authorName}
          </Link>
        </div>
        {showDate && (
          <DesktopOnly>
            <InsightDate date={date} state={state} />
          </DesktopOnly>
        )}
      </div>
    </div>
  )
}

export const InsightDate = ({ date, state, className }) => {
  const { DD, MMM, YYYY } = getDateFormats(new Date(date))
  return (
    <div className={cx(styles.info__item, styles.status, className)}>
      {MMM} {DD}, {YYYY}
    </div>
  )
}

export default ProfileInfo
