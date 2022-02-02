import React, { useMemo } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Input from '@santiment-network/ui/Input'
import DarkTooltip from '../../../components/Tooltip/DarkTooltip'
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

const EditProfile = ({ profile }) => {
  return (
    <div className={styles.modalContent}>
      <label className={styles.label}>
        <DarkTooltip
          trigger={
            <div>
              Full name <Icon type='info-round' />
            </div>
          }
          position='top'
          align='start'
        >
          Official assignation for visitors to your user profile
        </DarkTooltip>
      </label>
      <Input />
      <label className={styles.label}>
        <DarkTooltip
          trigger={
            <div>
              Username <Icon type='info-round' />
            </div>
          }
          position='top'
          align='start'
        >
          Service assignation for any interactions on Sanbase
        </DarkTooltip>
      </label>
      <Input />
      <Dialog.Actions className={styles.actions}>
        <Dialog.Approve>Save</Dialog.Approve>
        <Dialog.Cancel>Cancel</Dialog.Cancel>
      </Dialog.Actions>
    </div>
  )
}

const DisplayProfileValue = ({ label, value, isCurrentUser, profile }) => {
  if (!isCurrentUser) {
    return <>{value || `No ${label}`}</>
  }

  const Trigger = () => (
    <>
      {value || `Add ${label}`} <Icon className={styles.ml16} type='edit' />
    </>
  )

  return (
    <Dialog
      title='Edit'
      trigger={
        <div>
          <Trigger />
        </div>
      }
      classes={{ dialog: styles.editWrapper, title: styles.modalTitle }}
    >
      <EditProfile profile={profile} />
    </Dialog>
  )
}

const InfoBlock = ({
  isLoggedIn,
  isCurrentUser,
  updateCache,
  profile,
  followData: { followers } = {}
}) => {
  const { username, id, name } = profile

  return (
    <div className={styles.leftText}>
      <div className={styles.info}>
        <div>
          <div
            className={cx(
              styles.name,
              !name && styles.empty,
              isCurrentUser && styles.editable
            )}
          >
            <DisplayProfileValue
              label='full name'
              value={name}
              isCurrentUser={isCurrentUser}
              profile={profile}
            />
          </div>
          <div
            className={cx(styles.username, isCurrentUser && styles.editable)}
          >
            <DisplayProfileValue
              label='username'
              value={`@${username}`}
              isCurrentUser={isCurrentUser}
              profile={profile}
            />
          </div>
          {isLoggedIn &&
            (!isCurrentUser ? (
              <div className={styles.followContainer}>
                {followers && (
                  <FollowBtn
                    className={styles.followBtn}
                    users={followers.users}
                    userId={id}
                    updateCache={updateCache}
                  />
                )}
                <NotificationBellBtn
                  targetUserId={id}
                  className={styles.bell}
                />
              </div>
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
        <DesktopOnly>
          <ShareProfile />
        </DesktopOnly>
      </div>
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
          isCurrentUser={isCurrentUser}
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
