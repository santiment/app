import React from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import { FOLLOW_MUTATION, UNFOLLOW_MUTATION } from '../../../queries/ProfileGQL'
import followImg from './../../../assets/follow/follow.svg'
import followedImg from './../../../assets/follow/followed.svg'
import followingImg from './../../../assets/follow/following.svg'
import styles from './FollowBtn.module.scss'

const FollowBtn = ({ userId, isInFollowers, updateCache, className }) => {
  return (
    <Mutation
      mutation={isInFollowers ? UNFOLLOW_MUTATION : FOLLOW_MUTATION}
      update={updateCache}
    >
      {(followAction, { loading }) => {
        return (
          <Button
            accent={isInFollowers ? 'grey' : 'positive'}
            variant='fill'
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
                <img
                  className={styles.followImg}
                  src={followedImg}
                  alt='followed'
                />
              ) : (
                <img
                  className={styles.followImg}
                  src={followImg}
                  alt='follow'
                />
              )
            ) : (
              <img
                className={styles.followImg}
                src={followingImg}
                alt='following'
              />
            )}
            {isInFollowers ? 'Followed' : 'Follow'}
          </Button>
        )
      }}
    </Mutation>
  )
}

const mapStateToProps = ({ user: { data } }, { followers: { users } = {} }) => {
  return {
    isInFollowers:
      data && users ? users.some(({ id }) => +id === +data.id) : false
  }
}

export default connect(mapStateToProps)(FollowBtn)
