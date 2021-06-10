import React, { useState } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { mapSizesToProps } from '../../../../utils/withSizes'
import Dialog from '@santiment-network/ui/Dialog'
import FollowBtn from '../FollowBtn'
import UserAvatar from '../../../Account/avatar/UserAvatar'
import {
  updateCurrentUserFollowQueryCache,
  useOldUserFollowersFollowing
} from '../../../../queries/ProfileGQL'
import PageLoader from '../../../../components/Loader/PageLoader'
import Search from '@santiment-network/ui/Search'
import NotificationBellBtn from '../../../../components/NotificationBellBtn/NotificationBellBtn'
import styles from './FollowList.module.scss'

const makeQueryVars = currentUserId => ({
  userId: +currentUserId
})

const FollowList = ({
  title,
  list: { users = [] },
  trigger,
  currentUserId,
  isDesktop
}) => {
  const [isOpen, setOpen] = useState(false)

  const {
    data: { following },
    loading
  } = useOldUserFollowersFollowing(makeQueryVars(currentUserId))

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      title={title}
      classes={styles}
      trigger={trigger}
    >
      <Dialog.ScrollContent>
        {loading && <PageLoader className={styles.loader} />}
        {!loading && (
          <List
            users={users}
            following={following}
            currentUserId={currentUserId}
            isDesktop={isDesktop}
            onClickItem={() => setOpen(false)}
          />
        )}
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const List = ({
  users = [],
  following,
  currentUserId,
  isDesktop,
  onClickItem
}) => {
  const [searchToken, setSearchToken] = useState()

  return (
    <div className={styles.listWrapper}>
      {users.length > 5 && (
        <Search
          className={styles.search}
          iconPosition='left'
          placeholder='Search a user'
          options={users.map(({ username, ...rest }) => {
            return {
              label: username,
              ...rest
            }
          })}
          onChange={val => setSearchToken(val)}
        />
      )}
      <div className={styles.list}>
        {users
          .filter(({ username = '' }) => {
            if (searchToken) {
              if (username) {
                return username.indexOf(searchToken) !== -1
              } else {
                return false
              }
            } else {
              return true
            }
          })
          .map(user => (
            <FollowItem
              user={user}
              following={following}
              currentUserId={currentUserId}
              key={user.id}
              isDesktop={isDesktop}
              onClickItem={onClickItem}
            />
          ))}
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
  following = { users: [] },
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
          isExternal
          externalAvatarUrl={avatarUrl}
          classes={styles}
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

const mapStateToProps = state => {
  return {
    currentUserId: state.user.data ? +state.user.data.id : null
  }
}

export default compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps)
)(FollowList)
