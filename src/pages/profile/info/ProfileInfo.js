import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './ProfileInfo.module.scss'

const ProfileInfo = ({ profile }) => {
  const { username, email, followers, following } = profile

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.name}>{username}</div>
        <div className={styles.email}>{email}</div>
        <Button accent='positive' variant='fill' className={styles.followBtn}>
          <Icon type='add-watchlist' className={styles.followIcon} /> Follow
        </Button>
      </div>

      <div className={styles.middle}>
        <div className={styles.followBlock}>
          <div className={styles.follow} />
          <div className={styles.followCounters}>
            <div className={styles.followCounter}>{followers.count}</div>
            <div className={styles.followDescription}>followers</div>
          </div>
        </div>
        <div className={cx(styles.followBlock, styles.followBlockSecond)}>
          <div className={styles.follow} />
          <div className={styles.followCounters}>
            <div className={styles.followCounter}>{following.count}</div>
            <div className={styles.followDescription}>following</div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <Icon className={styles.socialIcon} type='twitter' />
        <Icon className={styles.socialIcon} type='facebook' />
        <Icon className={styles.socialIcon} type='reddit' />
      </div>
    </div>
  )
}

export default ProfileInfo
