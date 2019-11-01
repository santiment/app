import React from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { FOLLOW_MUTATION, UNFOLLOW_MUTATION } from '../../../queries/ProfileGQL'
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
            accent='positive'
            variant='fill'
            className={className}
            disabled={loading}
            onClick={() => {
              followAction({
                variables: {
                  id: +userId
                }
              })
            }}
          >
            {!loading && (
              <Icon type='add-watchlist' className={styles.followIcon} />
            )}
            {loading && <Icon type='awaiting' className={styles.followIcon} />}
            {isInFollowers ? 'Unfollow' : 'Follow'}
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
