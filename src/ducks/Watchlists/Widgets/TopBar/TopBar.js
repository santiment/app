import React, { useState } from 'react'
import cx from 'classnames'
import Author from './Author/Author'
import Title from './Title/Title'
import BaseActions from '../TopPanel/BaseActions'
import Widgets from '../TopPanel/Widgets'
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog'
import Share from '../../Actions/Share'
import WeeklyReport from '../../Actions/WeeklyReport'
import Filter from '../Filter'
import { usePublicUserData } from '../../../../pages/profile/ProfilePage'
import { useUser } from '../../../../stores/user'
import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../../detector'
import { useIsAuthor } from '../../gql/list/hooks'
import styles from './TopBar.module.scss'

function getCurrentEntity ({ entity, type }) {
  if (Object.keys(entity).length === 0) {
    switch (type) {
      case SCREENER: {
        return {
          user: {
            id: ''
          },
          name: 'My Screener',
          description: ''
        }
      }
      default:
        return entity
    }
  }

  return entity
}

const TopBar = ({
  entity,
  type,
  refetchAssets,
  widgets,
  setWidgets,
  isDefaultScreener,
  projectsCount,
  updateWatchlistFunction,
  ...props
}) => {
  const currentEntity = getCurrentEntity({ entity, type })
  const { user: currentUser, isLoggedIn } = useUser()
  const { user, name: title, description } = currentEntity
  const { data } = usePublicUserData({ userId: user.id })
  const { isAuthor, isAuthorLoading } = useIsAuthor(entity)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const {
    avatarUrl,
    username: userName,
    name: fullName,
    watchlists,
    addressesWatchlists
  } = data || {}

  function closeFilter () {
    if (isFilterOpen) {
      setIsFilterOpen(false)
    }
  }

  return (
    <div className={cx(styles.wrapper, isFilterOpen && styles.open)}>
      <div className={styles.info}>
        <Author
          avatarUrl={avatarUrl}
          userName={userName}
          fullName={fullName}
          isLoggedIn={isLoggedIn}
          isCurrentUser={isAuthor}
          userId={user.id}
          currentUserId={currentUser && currentUser.id}
          watchlists={watchlists}
          addressesWatchlists={addressesWatchlists}
          type={type}
        />
        <div className={styles.leftDivider} />
        <Title
          title={title}
          description={description}
          type={type}
          refetchAssets={refetchAssets}
          entity={entity}
          isLoggedIn={isLoggedIn}
          isCurrentUser={isAuthor}
        />
      </div>
      <div className={styles.actions}>
        <BaseActions
          type={type}
          watchlist={entity}
          onClick={closeFilter}
          isAuthor={isAuthor}
          isAuthorLoading={isAuthorLoading}
          refetchAssets={refetchAssets}
        />
        {widgets && type !== BLOCKCHAIN_ADDRESS && (
          <Widgets widgets={widgets} setWidgets={setWidgets} />
        )}
        <div
          className={cx(
            styles.rightDivider,
            isDefaultScreener && styles.defaultDivider
          )}
        />
        <Share watchlist={entity} isAuthor={isAuthor} />
        {(isAuthor || isDefaultScreener) && (
          <ScreenerSignalDialog watchlistId={entity.id} type={type} />
        )}
        {isAuthor && type === PROJECT && <WeeklyReport watchlist={entity} />}
        {type === SCREENER && (
          <Filter
            watchlist={entity}
            projectsCount={projectsCount}
            isAuthor={isAuthor}
            isAuthorLoading={isAuthorLoading}
            isLoggedIn={isLoggedIn}
            isDefaultScreener={isDefaultScreener}
            setIsOpen={setIsFilterOpen}
            isOpen={isFilterOpen}
            updateWatchlistFunction={updateWatchlistFunction}
            {...props}
          />
        )}
      </div>
    </div>
  )
}

export default TopBar
