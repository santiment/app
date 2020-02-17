import React, { useState } from 'react'
import cx from 'classnames'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import { connect } from 'react-redux'
import FollowBtn, { updateCurrentUserQueryCache } from '../FollowBtn'
import UserAvatar from '../../../Account/avatar/UserAvatar'
import styles from './FollowList.module.scss'
import { PUBLIC_USER_DATA_QUERY } from '../../../../queries/ProfileGQL'
import PageLoader from '../../../../components/Loader/PageLoader'

const makeQueryVars = currentUserId => ({
  userId: +currentUserId
})

const FollowList = ({
  title,
  list: { users = [] },
  trigger,
  currentUserId
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
          {({ data: { getUser, loading } = {} }) => {
            if (loading || !getUser) {
              return <PageLoader />
            }

            const { following } = getUser

            return (
              <List
                users={users}
                following={following}
                currentUserId={currentUserId}
              />
            )
          }}
        </Query>
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const List = ({ users, following, currentUserId }) => {
  return (
    <div className={styles.list}>
      {users &&
        users.map(user => (
          <FollowItem
            user={user}
            following={following}
            currentUserId={currentUserId}
            key={user.id}
          />
        ))}
    </div>
  )
}

const FollowItem = ({
  user: { id, username, avatarUrl },
  following,
  currentUserId
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

  return (
    <div className={styles.row}>
      <Link to={'/profile/' + id} className={styles.user}>
        <UserAvatar isExternal externalAvatarUrl={avatarUrl} classes={styles} />

        <div className={cx(styles.name, !username && styles.noName)}>
          {username || 'No name'}
        </div>
      </Link>
      {+id !== +currentUserId && (
        <FollowBtn
          className={styles.followBtn}
          userId={id}
          targetUserId={id}
          users={following.users}
          updateCache={updateCache}
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

export default connect(mapStateToProps)(FollowList)
