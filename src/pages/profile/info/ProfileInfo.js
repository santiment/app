import React, { useMemo } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import FollowBtn from '../follow/FollowBtn'
import { useUser } from '../../../stores/user'
import FollowList from '../follow/list/FollowList'
import UserAvatar from '../../Account/avatar/UserAvatar'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import SidecarExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip'
import NotificationBellBtn from '../../../components/NotificationBellBtn/NotificationBellBtn'
import styles from './ProfileInfo.module.scss'

const ShareTrigger = props => (
  <Button className={styles.shareTrigger} {...props}>
    <Icon type='share' className={styles.shareIcon} />
    Share profile
  </Button>
)

export const ShareProfile = () => (
  <ShareModalTrigger
    dialogTitle='Share profile'
    shareLink={window.location.href}
    trigger={ShareTrigger}
  />
)

const InfoBlock = ({
  isLoggedIn,
  isCurrentUser,
  updateCache,
  profile,
  followData: { followers } = {}
}) => {
  const { username, id } = profile

  return (
    <div className={styles.leftText}>
      <div className={styles.info}>
        <div className={styles.name}>{username}</div>
        <DesktopOnly>
          <ShareProfile />
        </DesktopOnly>
      </div>
      {isLoggedIn &&
        (!isCurrentUser ? (
          <>
            {followers && (
              <FollowBtn
                className={styles.followBtn}
                users={followers.users}
                userId={id}
                updateCache={updateCache}
              />
            )}
            <NotificationBellBtn targetUserId={id} className={styles.bell} />
          </>
        ) : (
          <Button
            className={styles.accountBtn}
            as={Link}
            to='/account'
            variant='fill'
            accent='positive'
          >
            Account settings
          </Button>
        ))}
    </div>
  )
}

const FollowTitle = ({ title, count }) => (
  <div>
    {title} <span className={styles.counter}>({count})</span>
  </div>
)

const ProfileInfo = ({ profile, updateCache, followData = {} }) => {
  const {
    followers,
    following,
    followers: { count: followersCount = 0 } = {},
    following: { count: followingCount } = {}
  } = followData
  const { isLoggedIn, user } = useUser()
  const { id, avatarUrl } = profile
  const currentUserId = useMemo(() => (user ? user.id : null), [user])
  const isCurrentUser = useMemo(() => +currentUserId === +id, [user, profile])

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <UserAvatar
          as='div'
          userId={id}
          externalAvatarUrl={avatarUrl}
          classes={styles}
        />
        <MobileOnly>
          <InfoBlock
            profile={profile}
            isLoggedIn={isLoggedIn}
            followData={followData}
            updateCache={updateCache}
            isCurrentUser={isCurrentUser}
          />
        </MobileOnly>
      </div>

      <div className={styles.right}>
        <DesktopOnly>
          <InfoBlock
            profile={profile}
            isLoggedIn={isLoggedIn}
            followData={followData}
            updateCache={updateCache}
            isCurrentUser={isCurrentUser}
          />
        </DesktopOnly>

        <div className={styles.socials}>
          <SidecarExplanationTooltip
            closeTimeout={500}
            localStorageSuffix='_PROFILE_FOLLOW_EXPLANATION'
            position='bottom'
            title={<div>Click to open list of users</div>}
            description=''
            withArrow
            classes={styles}
          >
            <div className={styles.followersBlocks}>
              {followers && (
                <FollowList
                  currentUserId={currentUserId}
                  isCurrentUser={isCurrentUser}
                  list={followers}
                  title={
                    <FollowTitle title='Followers' count={followersCount} />
                  }
                  trigger={
                    <div className={styles.followBlock}>
                      <Icon type='followers' className={styles.follow} />
                      <div className={styles.followCounters}>
                        <div className={styles.followCounter}>
                          {followersCount}
                        </div>
                        <div className={styles.followDescription}>
                          followers
                        </div>
                      </div>
                    </div>
                  }
                />
              )}
              {following && (
                <FollowList
                  currentUserId={currentUserId}
                  isCurrentUser={isCurrentUser}
                  list={following}
                  title={
                    <FollowTitle title='Following' count={followingCount} />
                  }
                  trigger={
                    <div
                      className={cx(
                        styles.followBlock,
                        styles.followBlockSecond
                      )}
                    >
                      <Icon type='following' className={styles.follow} />
                      <div className={styles.followCounters}>
                        <div className={styles.followCounter}>
                          {followingCount}
                        </div>
                        <div className={styles.followDescription}>
                          following
                        </div>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </SidecarExplanationTooltip>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
