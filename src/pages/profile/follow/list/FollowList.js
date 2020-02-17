import React, { useState } from 'react'
import cx from 'classnames'
import { Query } from 'react-apollo'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { mapSizesToProps } from '../../../../utils/withSizes'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import FollowBtn, { updateCurrentUserQueryCache } from '../FollowBtn'
import UserAvatar from '../../../Account/avatar/UserAvatar'
import { PUBLIC_USER_DATA_QUERY } from '../../../../queries/ProfileGQL'
import PageLoader from '../../../../components/Loader/PageLoader'
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
        <Query
          query={PUBLIC_USER_DATA_QUERY}
          variables={makeQueryVars(currentUserId)}
          skip={!currentUserId}
        >
          {({ data: { getUser = {}, loading } = {} }) => {
            if (loading) {
              return <PageLoader className={styles.loader} />
            }

            const { following = {} } = getUser

            return (
              <List
                users={users}
                following={following}
                currentUserId={currentUserId}
                isDesktop={isDesktop}
              />
            )
          }}
        </Query>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const List = ({ users, following, currentUserId, isDesktop }) => {
  return (
    <div className={styles.list}>
      {users &&
        users.map(user => (
          <FollowItem
            user={user}
            following={following}
            currentUserId={currentUserId}
            key={user.id}
            isDesktop={isDesktop}
          />
        ))}
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
  isDesktop
}) => {
  const updateCache = (cache, queryData) => {
    const queryVariables = makeQueryVars(currentUserId)
    updateCurrentUserQueryCache(cache, queryData, queryVariables, id, {
      id,
      avatarUrl,
      username,
      __typename: 'PublicUser'
    })
  }

  const newUserName = username ? getShortName(username, isDesktop) : ''

  return (
    <div className={styles.row}>
      <Link to={'/profile/' + id} className={styles.user}>
        <UserAvatar isExternal externalAvatarUrl={avatarUrl} classes={styles} />

        <div className={cx(styles.name, !newUserName && styles.noName)}>
          {newUserName || 'No name'}
        </div>
      </Link>
      {!!currentUserId && +id !== +currentUserId && (
        <FollowBtn
          className={styles.followBtn}
          userId={id}
          targetUserId={id}
          users={following.users}
          updateCache={updateCache}
          variant={isDesktop ? 'fill' : 'ghost'}
        />
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
