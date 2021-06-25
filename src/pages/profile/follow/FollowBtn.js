import React from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { FOLLOW_MUTATION, UNFOLLOW_MUTATION } from '../../../queries/ProfileGQL'
import styles from './FollowBtn.module.scss'

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
            {isInFollowers ? 'Following' : 'Follow'}
          </Button>
        )
      }}
    </Mutation>
  )
}

export const isInFollowers = (users, targetUserId, currentUserId) => {
  if (currentUserId && users) {
    if (targetUserId) {
      return users.some(({ id }) => +id === +targetUserId)
    } else {
      return users.some(({ id }) => +id === +currentUserId)
    }
  }

  return false
}

const mapStateToProps = ({ user: { data } }, { targetUserId, users = [] }) => {
  return {
    isInFollowers: isInFollowers(users, targetUserId, data.id)
  }
}

export default connect(mapStateToProps)(FollowBtn)
