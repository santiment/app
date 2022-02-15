import React from 'react'
import Author from './Author/Author'
import Title from './Title/Title'
import { usePublicUserData } from '../../../../pages/profile/ProfilePage'
import { useUser } from '../../../../stores/user'
import { SCREENER } from '../../detector'
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

const TopBar = ({ entity, type, refetchAssets }) => {
  const currentEntity = getCurrentEntity({ entity, type })
  const { user: currentUser, isLoggedIn } = useUser()
  const { user, name: title, description } = currentEntity
  const { data } = usePublicUserData({ userId: user.id })

  const avatarUrl = data && data.avatarUrl
  const userName = data && data.username
  const fullName = data && data.name
  const watchlists = (data && data.watchlists) || []
  const addressesWatchlists = (data && data.addressesWatchlists) || []
  const isCurrentUser = !!(currentUser && user && +currentUser.id === +user.id)

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Author
          avatarUrl={avatarUrl}
          userName={userName}
          fullName={fullName}
          isLoggedIn={isLoggedIn}
          isCurrentUser={isCurrentUser}
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
          isCurrentUser={isCurrentUser}
        />
      </div>
      <div className={styles.actions}></div>
    </div>
  )
}

export default TopBar
