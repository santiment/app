import React from 'react'
import LikeBtn from './LikeBtn'
import { connect } from 'react-redux'
import styles from './LikeBtnWrapper.module.scss'

const LikeBtnWrapper = ({ onLike, votes, isLiked }) => (
  <LikeBtn
    onClick={onLike}
    className={styles.likeBtn}
    likesNumber={votes.length}
    liked={isLiked}
  />
)

const mapStateToProps = (state, { votes }) => {
  const userId = state.user.data && state.user.data.id ? +state.user.data.id : 0
  return {
    isLiked: userId && votes.some(({ userId: id }) => userId === id) === true
  }
}

export default connect(mapStateToProps)(LikeBtnWrapper)
