import React from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Avatar from '../../../../../components/Illustrations/Avatar'
import AuthorInfo from './AuthorInfo/AuthorInfo'
import styles from './Author.module.scss'

const Author = ({
  avatarUrl,
  userName,
  fullName,
  isLoggedIn,
  isCurrentUser,
  userId,
  currentUserId,
  watchlists,
  addressesWatchlists,
  type
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={cx(
          styles.avatarWrapper,
          !avatarUrl && styles.avatarPlaceholderWrapper
        )}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt='' className={styles.avatar} />
        ) : (
          <Avatar className={styles.avatarPlaceholder} />
        )}
      </div>
      <Tooltip
        align='start'
        position='bottom'
        trigger={
          <div className={styles.userName}>
            {userName ? `@${userName}` : 'No Username'}
          </div>
        }
        className={styles.tooltip}
      >
        <div className={styles.tooltip__content}>
          <AuthorInfo
            avatarUrl={avatarUrl}
            fullName={fullName}
            userName={userName}
            isLoggedIn={isLoggedIn}
            isCurrentUser={isCurrentUser}
            userId={userId}
            currentUserId={currentUserId}
            watchlists={watchlists}
            addressesWatchlists={addressesWatchlists}
            type={type}
          />
        </div>
      </Tooltip>
    </div>
  )
}

export default Author
