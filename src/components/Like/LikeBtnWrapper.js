import React from 'react'
import LikeBtn from './LikeBtn'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from '../../pages/UserSelectors'

const LikeBtnWrapper = ({ className, onLike, votes, liked, isLoggedIn }) => (
  <LikeBtn
    onClick={onLike}
    className={className}
    disabled={!isLoggedIn}
    likesNumber={votes.length}
    liked={liked}
  />
)

const mapStateToProps = (state, { votes }) => {
  return {
    isLoggedIn: checkIsLoggedIn(state),
    liked:
      state.user.data &&
      +state.user.data.id &&
      votes.some(id => state.user.data.id === id)
  }
}

export default connect(mapStateToProps)(LikeBtnWrapper)
