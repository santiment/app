import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import FollowBtn from '../follow/FollowBtn'
import { checkIsLoggedIn } from '../../UserSelectors'
import styles from './ProfileInfo.module.scss'

const ProfileInfo = ({
  profile = {},
  updateCache,
  isCurrentUser,
  isLoggedIn
}) => {
  const {
    id,
    username,
    email,
    followers,
    followers: { count: followersCount = 0 } = {},
    following: { count: followingCount } = {}
  } = profile

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.name}>{username}</div>
        <div className={styles.email}>{email}</div>
        {isLoggedIn && !isCurrentUser && (
          <FollowBtn
            className={styles.followBtn}
            followers={followers}
            userId={id}
            updateCache={updateCache}
          />
        )}
      </div>

      <div className={styles.middle}>
        <div className={styles.followBlock}>
          <div className={styles.follow} />
          <div className={styles.followCounters}>
            <div className={styles.followCounter}>{followersCount}</div>
            <div className={styles.followDescription}>followers</div>
          </div>
        </div>
        <div className={cx(styles.followBlock, styles.followBlockSecond)}>
          <div className={styles.follow} />
          <div className={styles.followCounters}>
            <div className={styles.followCounter}>{followingCount}</div>
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

const mapStateToProps = (state, { profile }) => {
  const {
    user: { data }
  } = state
  const isCurrentUser = data && data.id === profile.id
  return {
    isCurrentUser,
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default connect(mapStateToProps)(ProfileInfo)
