import React, { useEffect, useState } from 'react'
import toReact from 'svelte-adapter/react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import LikeButton from 'webkit/ui/LikeButton/svelte'
import CommentsComponent from 'webkit/ui/Comments/svelte'
import { track } from 'webkit/analytics'
import { Event } from 'studio/analytics'
import { clearSavedComment, lookupSavedComment } from 'webkit/ui/Comments/utils'
import { CommentsType } from 'webkit/api/comments'
import CommentsButton from './CommentsButton/CommentsButton'
import { useWatchlistVoteMutation } from '../../../gql/hooks'
import { BLOCKCHAIN_ADDRESS } from '../../../detector'
import {
  onAnonComment,
  onCommentError
} from '../../../../../pages/Studio/utils'
import styles from './CommentActions.module.scss'

export const Like = toReact(LikeButton, {}, 'div')
export const Comments = toReact(CommentsComponent, {}, 'div')

const CommentActions = ({
  entity,
  isLoggedIn,
  isCommentsOpen,
  setIsCommentsOpen,
  currentUser,
  closeFilter,
  type
}) => {
  const { id, votes, commentsCount } = entity
  const [projectVotes, setProjectVotes] = useState({
    userVotes: 0,
    totalVotes: 0
  })
  const { vote } = useWatchlistVoteMutation({ id })

  useEffect(() => {
    setProjectVotes({
      userVotes: votes.userVotes,
      totalVotes: votes.totalVotes
    })

    if (isLoggedIn) {
      const comment = lookupSavedComment()

      if (comment) {
        setIsCommentsOpen(true)
      }
    }
  }, [id])

  function onVote () {
    setProjectVotes(prev => ({
      userVotes: prev.userVotes + 1,
      totalVotes: prev.totalVotes + 1
    }))

    vote({
      skip: !id,
      variables: {
        id: +id
      }
    })
      .then(() => track.event(Event.LikeWatchlist || 'LikeWatchlist', { id }))
      .catch(() =>
        setProjectVotes(prev => ({
          userVotes: prev.userVotes - 1,
          totalVotes: prev.totalVotes - 1
        }))
      )
  }

  function handleSavedWatchlistComment () {
    const node = document.querySelector(`textarea[name="comment"]`)
    if (node) {
      const comment = lookupSavedComment()
      if (comment) {
        node.value = comment.content
        clearSavedComment()
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <CommentsButton
        commentsCount={commentsCount}
        onClick={() => {
          setIsCommentsOpen(prev => !prev)
          closeFilter()
        }}
        isActive={isCommentsOpen}
      />
      <Like
        disabled={!isLoggedIn}
        class={styles.likeBtn}
        onVote={onVote}
        userVotes={projectVotes.userVotes}
        totalVotes={projectVotes.totalVotes}
      />
      <div
        className={cx(styles.commentsWrapper, isCommentsOpen && styles.active)}
      >
        <div
          className={styles.closeWrapper}
          onClick={() => setIsCommentsOpen(false)}
        >
          <Icon type='sidebar' className={styles.closeIcon} />
        </div>
        <Comments
          type={
            type === BLOCKCHAIN_ADDRESS
              ? CommentsType.Address
              : CommentsType.Watchlist
          }
          commentsFor={entity}
          currentUser={currentUser}
          onAnonComment={onAnonComment}
          onCommentsLoaded={handleSavedWatchlistComment}
          onCommentError={onCommentError}
        />
      </div>
      {isCommentsOpen && (
        <div
          className={styles.background}
          onClick={() => setIsCommentsOpen(false)}
        />
      )}
    </div>
  )
}

export default CommentActions
