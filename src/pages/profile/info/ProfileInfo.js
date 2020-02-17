import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import FollowBtn from '../follow/FollowBtn'
import UserAvatar from '../../Account/avatar/UserAvatar'
import { checkIsLoggedIn } from '../../UserSelectors'
import userFollowersSvg from './../../../assets/follow/user_followers.svg'
import userFollowingSvg from './../../../assets/follow/user_following.svg'
import FollowList from '../follow/list/FollowList'
import styles from './ProfileInfo.module.scss'

const FollowTitle = ({ title, count }) => {
  return (
    <div className={styles.title}>
      {title} <span className={styles.counter}>({count})</span>
    </div>
  )
}

const ProfileInfo = ({
  profile = {},
  updateCache,
  isCurrentUser,
  isLoggedIn
}) => {
  const {
    id,
    username,
    followers,
    avatarUrl,
    following,
    followers: { count: followersCount = 0 } = {},
    following: { count: followingCount } = {}
  } = profile

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <UserAvatar isExternal externalAvatarUrl={avatarUrl} classes={styles} />
      </div>

      <div className={styles.right}>
        <div className={styles.leftText}>
          <div className={styles.name}>{username}</div>
          {isLoggedIn && !isCurrentUser && (
            <FollowBtn
              className={styles.followBtn}
              users={followers.users}
              userId={id}
              updateCache={updateCache}
            />
          )}
        </div>
        <div className={styles.socials}>
          <div className={styles.followersBlocks}>
            <FollowList
              list={followers}
              title={<FollowTitle title='Followers' count={followersCount} />}
              trigger={
                <div className={styles.followBlock}>
                  <img
                    className={styles.follow}
                    src={userFollowersSvg}
                    alt='user followers'
                  />
                  <div className={styles.followCounters}>
                    <div className={styles.followCounter}>{followersCount}</div>
                    <div className={styles.followDescription}>followers</div>
                  </div>
                </div>
              }
            />
            <FollowList
              list={following}
              title={<FollowTitle title='Following' count={followingCount} />}
              trigger={
                <div
                  className={cx(styles.followBlock, styles.followBlockSecond)}
                >
                  <img
                    className={styles.follow}
                    src={userFollowingSvg}
                    alt='user following'
                  />
                  <div className={styles.followCounters}>
                    <div className={styles.followCounter}>{followingCount}</div>
                    <div className={styles.followDescription}>following</div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
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
