import React, { useState, useMemo } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { Link } from 'react-router-dom'
import Search from '@santiment-network/ui/Search'
import Dialog from '@santiment-network/ui/Dialog'
import { mapSizesToProps } from '../../../../utils/withSizes'
import FollowBtn from '../FollowBtn'
import UserAvatar from '../../../Account/avatar/UserAvatar'
import {
  updateCurrentUserFollowQueryCache,
  useOldUserFollowersFollowing
} from '../../../../queries/ProfileGQL'
import { useDialogState } from '../../../../hooks/dialog'
import PageLoader from '../../../../components/Loader/PageLoader'
import NotificationBellBtn from '../../../../components/NotificationBellBtn/NotificationBellBtn'
import styles from './FollowList.module.scss'

const ARR = []

const makeQueryVars = id => ({ userId: +id })

const FollowList = ({
  title,
  list: { users = ARR },
  currentUserId,
  isCurrentUser,
  trigger,
  isDesktop
}) => {
  const { isOpened, openDialog, closeDialog } = useDialogState()

  const {
    data: { following },
    loading
  } = useOldUserFollowersFollowing(makeQueryVars(currentUserId))

  return (
    <Dialog
      open={isOpened}
      onClose={closeDialog}
      onOpen={openDialog}
      title={title}
      classes={styles}
      trigger={trigger}
    >
      <Dialog.ScrollContent>
        {loading && <PageLoader className={styles.loader} />}
        {!loading && isOpened && (
          <List
            users={users}
            following={following}
            currentUserId={currentUserId}
            isCurrentUser={isCurrentUser}
            isDesktop={isDesktop}
            onClickItem={closeDialog}
          />
        )}
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const List = ({
  users = ARR,
  following,
  currentUserId,
  isCurrentUser,
  isDesktop,
  onClickItem
}) => {
  const [searchToken, setSearchToken] = useState()
  const [defaultUsers] = useState(users)

  const filteredUsers = useMemo(
    () => {
      return searchToken
        ? defaultUsers.filter(
          ({ username }) => username && username.indexOf(searchToken) !== -1
        )
        : defaultUsers
    },
    [searchToken, defaultUsers]
  )

  return (
    <div className={styles.listWrapper}>
      {defaultUsers.length > 5 && (
        <Search
          className={styles.search}
          iconPosition='left'
          placeholder='Search a user'
          options={users.map(({ username, ...rest }) => ({
            label: username,
            ...rest
          }))}
          onChange={val => setSearchToken(val)}
        />
      )}
      <div className={styles.list}>
        {filteredUsers.map(user =>
          isCurrentUser && +user.id === +currentUserId ? null : (
            <FollowItem
              user={user}
              following={following}
              currentUserId={currentUserId}
              key={user.id}
              isDesktop={isDesktop}
              onClickItem={onClickItem}
            />
          )
        )}
      </div>
    </div>
  )
}

const MAX_NAME_LENGTH = 22

const getShortName = (username, isDesktop) => {
  if (isDesktop || username.length < MAX_NAME_LENGTH) {
    return username
  }

  return username.slice(0, MAX_NAME_LENGTH) + '...'
}

const FollowItem = ({
  user: { id, username, avatarUrl },
  following = { users: ARR },
  currentUserId,
  isDesktop,
  onClickItem
}) => {
  const updateCache = (cache, queryData) => {
    const queryVariables = makeQueryVars(currentUserId)
    updateCurrentUserFollowQueryCache(
      cache,
      queryData,
      queryVariables,
      id,
      {
        id,
        avatarUrl,
        username,
        __typename: 'PublicUser'
      },
      currentUserId
    )
  }

  const newUserName = username ? getShortName(username, isDesktop) : ''

  return (
    <div className={styles.row}>
      <div className={styles.user} onClick={onClickItem}>
        <UserAvatar
          userId={id}
          classes={styles}
          externalAvatarUrl={avatarUrl}
        />

        <Link
          to={'/profile/' + id}
          className={cx(styles.name, !newUserName && styles.noName)}
        >
          {newUserName || 'No name'}
        </Link>
      </div>
      {!!currentUserId && +id !== +currentUserId && (
        <>
          <NotificationBellBtn targetUserId={id} className={styles.bell} />
          <FollowBtn
            className={styles.followBtn}
            userId={id}
            targetUserId={id}
            users={following.users}
            updateCache={updateCache}
            variant={isDesktop ? 'fill' : 'ghost'}
          />
        </>
      )}
    </div>
  )
}

export default withSizes(mapSizesToProps)(FollowList)
