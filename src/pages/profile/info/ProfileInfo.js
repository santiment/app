import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FollowBtn from '../follow/FollowBtn'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import UserAvatar from '../../Account/avatar/UserAvatar'
import { checkIsLoggedIn } from '../../UserSelectors'
import userFollowersSvg from './../../../assets/follow/user_followers.svg'
import userFollowingSvg from './../../../assets/follow/user_following.svg'
import FollowList from '../follow/list/FollowList'
import SidecarExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import styles from './ProfileInfo.module.scss'

const ShareTrigger = props => {
  return (
    <Button className={styles.shareTrigger} {...props}>
      <svg
        className={styles.shareIcon}
        width='16'
        height='15'
        viewBox='0 0 16 15'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0.666669 14.223C0.912763 14.223 1.14486 14.0861 1.26042 13.8595L1.27198 13.8372C2.52442 11.3323 5.03728 9.77862 7.83286 9.77862H8.88886V12.6675C8.88886 12.9394 9.05422 13.1839 9.30666 13.2861C9.55634 13.3883 9.84703 13.3261 10.0355 13.1297L15.8134 7.12969C16.0622 6.87187 16.0622 6.46302 15.8134 6.20521L10.0355 0.205195C9.84801 0.00792942 9.55813 -0.0534313 9.30666 0.0487824C9.05422 0.150996 8.88886 0.395463 8.88886 0.667436V3.55628H8.66669C3.88787 3.55628 0 7.4443 0 12.223V13.5563C0 13.8647 0.210612 14.1323 0.511069 14.2044C0.562664 14.2168 0.615073 14.223 0.666669 14.223ZM9.55553 8.44528H7.83286C5.32342 8.44528 3.00619 9.50388 1.38933 11.3082C1.84083 7.69495 4.93247 4.88961 8.66669 4.88961H9.55553C9.92353 4.88961 10.2222 4.59095 10.2222 4.22294V2.32076L14.4079 6.66745L10.2222 11.0141V9.11195C10.2222 8.74395 9.92353 8.44528 9.55553 8.44528Z' />
      </svg>
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
            <Icon type='edit' className={styles.editIcon} />
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
          >
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
                    <img
                      className={styles.follow}
                      src={userFollowingSvg}
                      alt='user following'
                    />
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
