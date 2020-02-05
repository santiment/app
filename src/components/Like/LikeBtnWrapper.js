import React from 'react'
import LikeBtn from './LikeBtn'
import { connect } from 'react-redux'
import styles from './LikeBtnWrapper.module.scss'

export const canLike = ({ user: { data: { id } = {} } = {} }, authorId) => {
  return id ? +id !== +authorId : false
}

const LikeBtnWrapper = ({ onLike, votes, isLiked, disabled = false }) => (
  <LikeBtn
    onClick={onLike}
    className={styles.likeBtn}
    likesNumber={votes.length}
    liked={isLiked}
    disabled={disabled}
  />
)

const mapStateToProps = (state, { votes, user: { id: authorId } = {} }) => {
  const userId = state.user.data && state.user.data.id ? +state.user.data.id : 0
  return {
    isLiked: !!userId && votes.some(({ userId: id }) => userId === id) === true,
    disabled: !canLike(state, authorId)
  }
}

export default connect(mapStateToProps)(LikeBtnWrapper)
