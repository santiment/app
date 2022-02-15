import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Avatar from '../../../../../../components/Illustrations/Avatar'
import FollowBtn from '../../../../../../pages/profile/follow/FollowBtn'
import ProjectCard from '../../../../Cards/ProjectCard'
import { WatchlistCards } from '../../../../Cards/Card'
import {
  updateCurrentUserFollowQueryCache,
  useOldUserFollowersFollowing
} from '../../../../../../queries/ProfileGQL'
import {
  checkIsNotScreener,
  checkIsScreener
} from '../../../../../Screener/utils'
import { PROJECT, SCREENER } from '../../../../detector'
import styles from './AuthorInfo.module.scss'

const AuthorInfo = ({
  avatarUrl,
  userName,
  fullName,
  isCurrentUser,
  isLoggedIn,
  userId,
  currentUserId,
  watchlists,
  addressesWatchlists,
  type
}) => {
  const { data: followData } = useOldUserFollowersFollowing({
    userId
  })

  const { followers } = followData

  function updateCache (cache, queryData) {
    updateCurrentUserFollowQueryCache(
      cache,
      queryData,
      {
        userId: +userId
      },
      +currentUserId,
      undefined,
      +currentUserId
    )
  }

  const screeners = watchlists ? watchlists.filter(checkIsScreener) : []
  const projectWatchlists = watchlists
    ? watchlists.filter(checkIsNotScreener)
    : []

  let entitiesData = {
    entities: [],
    path: ''
  }

  switch (type) {
    case SCREENER:
      entitiesData.entities = screeners
      entitiesData.path = '/screener/'
      break
    case PROJECT:
      entitiesData.entities = projectWatchlists
      entitiesData.path = '/watchlist/projects/'
      break
    default:
      entitiesData.entities = addressesWatchlists
      entitiesData.path = '/watchlist/addresses/'
      break
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <div className={styles.user__info}>
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
          <div className={styles.nameWrapper}>
            <div
              className={cx(styles.fullName, !fullName && styles.noFullName)}
            >
              {fullName ? fullName : 'No full name'}
            </div>
            <div className={styles.userName}>
              {userName ? `@${userName}` : 'No Username'}
            </div>
          </div>
        </div>
        {isLoggedIn &&
          (!isCurrentUser ? (
            <div>
              {followers && (
                <FollowBtn
                  users={followers.users}
                  userId={userId}
                  updateCache={updateCache}
                />
              )}
            </div>
          ) : (
            <Button as={Link} to='/account' variant='fill' accent='positive'>
              Account settings
            </Button>
          ))}
      </div>
      {entitiesData.entities.length > 0 && (
        <div className={styles.projects}>
          <WatchlistCards
            chartWidth={150}
            className={styles.card}
            classes={{ middle: styles.cardMiddle }}
            isWithVisibility={false}
            watchlists={entitiesData.entities.slice(-2)}
            path={entitiesData.path}
            Card={ProjectCard}
          />
        </div>
      )}
    </div>
  )
}

export default AuthorInfo
