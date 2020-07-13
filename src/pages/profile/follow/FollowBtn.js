import React from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import {
  FOLLOW_MUTATION,
  PUBLIC_USER_DATA_QUERY,
  UNFOLLOW_MUTATION
} from '../../../queries/ProfileGQL'
import styles from './FollowBtn.module.scss'

export const updateFollowersList = (followers, follow, unfollow, userId) => {
  const isInList = followers.users.some(({ id }) => +id === +userId)
  const { users } = followers

  if (isInList) {
    const { id: followerId } = follow || unfollow
    followers.users = users.filter(({ id }) => +id !== +followerId)
  } else {
    users.push(follow)
    followers.users = [...users]
  }
  followers.count = followers.users.length

  return followers
}

export const updateFollowingList = (followers, userData) => {
  const isInList = followers.users.some(({ id }) => +id === +userData.id)
  const { users } = followers

  if (isInList) {
    const { id: followerId } = userData
    followers.users = users.filter(({ id }) => +id !== +followerId)
  } else {
    users.push(userData)
    followers.users = [...users]
  }
  followers.count = followers.users.length

  return followers
}

export const updateCurrentUserQueryCache = (
  cache,
  { data: { follow, unfollow } },
  queryVariables,
  userId,
  followingUser
) => {
  const getUserData = cloneDeep(
    cache.readQuery({
      query: PUBLIC_USER_DATA_QUERY,
      variables: queryVariables
    })
  )

  const {
    getUser: { followers, following }
  } = getUserData

  if (!followingUser) {
    updateFollowersList(followers, follow, unfollow, userId)
  } else {
    updateFollowingList(following, followingUser)
  }

  cache.writeQuery({
    query: PUBLIC_USER_DATA_QUERY,
    variables: queryVariables,
    data: {
      ...getUserData
    }
  })
}

const FollowBtn = ({
  userId,
  isInFollowers,
  updateCache,
  className,
  variant = 'fill'
}) => {
  return (
    <Mutation
      mutation={isInFollowers ? UNFOLLOW_MUTATION : FOLLOW_MUTATION}
      update={updateCache}
    >
      {(followAction, { loading }) => {
        return (
          <Button
            accent={isInFollowers ? 'grey' : 'positive'}
            variant={variant}
            className={className}
            onClick={() => {
              !loading &&
                followAction({
                  variables: {
                    id: +userId
                  }
                })
            }}
          >
            {!loading ? (
              isInFollowers ? (
                <Icon type='followers' className={styles.followImg} />
              ) : (
                <Icon type='follow' className={styles.followImg} />
              )
            ) : (
              <Icon type='following' className={styles.followImg} />
            )}
            {isInFollowers ? 'Followed' : 'Follow'}
          </Button>
        )
      }}
    </Mutation>
  )
}

const mapStateToProps = ({ user: { data } }, { targetUserId, users = [] }) => {
  let isInFollowers = false
  if (data && users) {
    if (targetUserId) {
      isInFollowers = users.some(({ id }) => +id === +targetUserId)
    } else {
      isInFollowers = users.some(({ id }) => +id === +data.id)
    }
  }

  return {
    isInFollowers
  }
}

export default connect(mapStateToProps)(FollowBtn)
