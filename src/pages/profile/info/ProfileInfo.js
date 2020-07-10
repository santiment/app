import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FollowBtn from '../follow/FollowBtn'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import UserAvatar from '../../Account/avatar/UserAvatar'
import { checkIsLoggedIn } from '../../UserSelectors'
import FollowList from '../follow/list/FollowList'
import SidecarExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import styles from './ProfileInfo.module.scss'

const ShareTrigger = props => {
  return (
    <Button className={styles.shareTrigger} {...props}>
      <Icon type='share' className={styles.shareIcon} />
      Share profile
    </Button>
  )
}

export const ShareProfile = () => {
  return (
    <ShareModalTrigger
      dialogTitle='Share profile'
      shareLink={window.location.href}
      trigger={ShareTrigger}
    />
  )
}

const InfoBlock = ({
  isLoggedIn,
  isCurrentUser,
  updateCache,
  profile: { username, followers, id }
}) => {
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
          <FollowBtn
            className={styles.followBtn}
            users={followers.users}
            userId={id}
            updateCache={updateCache}
          />
        ) : (
          <Button
            className={styles.followBtn}
            as={Link}
            to='/account'
            variant='fill'
            accent='positive'
          >
            <Icon type='edit-small' className={styles.editIcon} />
            Edit
          </Button>
        ))}
    </div>
  )
}

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
    followers,
    avatarUrl,
    following,
    followers: { count: followersCount = 0 } = {},
    following: { count: followingCount } = {}
  } = profile

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <UserAvatar
          as='div'
          userId={id}
          isExternal
          externalAvatarUrl={avatarUrl}
          classes={styles}
        />
        <MobileOnly>
          <InfoBlock
            updateCache={updateCache}
            profile={profile}
            isLoggedIn={isLoggedIn}
            isCurrentUser={isCurrentUser}
          />
        </MobileOnly>
      </div>

      <div className={styles.right}>
        <DesktopOnly>
          <InfoBlock
            updateCache={updateCache}
            profile={profile}
            isLoggedIn={isLoggedIn}
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
              <FollowList
                list={followers}
                title={<FollowTitle title='Followers' count={followersCount} />}
                trigger={
                  <div className={styles.followBlock}>
                    <Icon type='followers' className={styles.follow} />
                    <div className={styles.followCounters}>
                      <div className={styles.followCounter}>
                        {followersCount}
                      </div>
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
                    <Icon type='following' className={styles.follow} />
                    <div className={styles.followCounters}>
                      <div className={styles.followCounter}>
                        {followingCount}
                      </div>
                      <div className={styles.followDescription}>following</div>
                    </div>
                  </div>
                }
              />
            </div>
          </SidecarExplanationTooltip>
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
