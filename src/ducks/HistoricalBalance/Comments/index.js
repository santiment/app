import React, { useState, useEffect } from 'react'
import toReact from 'svelte-adapter/react'
import SvelteComments from 'insights-app/lib/components/comments/Comments'
import { useBlockchainAddress } from '../hooks'
import {
  buildCommentsGetter,
  buildCommentCreator,
  editComment,
  deleteComment
} from '../../../components/Insight/comments/utils.js'
import styles from './index.module.scss'

const EMPTY = []
const BLOCKCHAIN_COMMENT = 'BLOCKCHAIN_ADDRESS'

const getComments = buildCommentsGetter(BLOCKCHAIN_COMMENT)
const createComment = buildCommentCreator(BLOCKCHAIN_COMMENT)
const dataAccessor = ({ data }) => data.comments

function useComments (id) {
  const [comments, setComments] = useState(EMPTY)

  useEffect(
    () => {
      getComments(id)
        .then(dataAccessor)
        .then(setComments)
        .catch(console.warn)
    },
    [id]
  )

  return comments
}

const ReactComments = toReact(SvelteComments, {}, 'div')
const Comments = ({ settings }) => {
  const { id, commentsCount } = useBlockchainAddress(settings)
  const comments = useComments(id)

  return (
    <div className={styles.wrapper}>
      <ReactComments
        className={styles.styles}
        comments={comments}
        id={id}
        commentsCount={commentsCount}
        getComments={getComments}
        createComment={createComment}
        editComment={editComment}
        deleteComment={deleteComment}
      />
    </div>
  )
}

export default Comments
