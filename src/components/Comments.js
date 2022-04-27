import React from 'react'
import toReact from 'svelte-adapter/react'
import SvelteComments from 'webkit/ui/Comments/svelte'
import { useUser } from '../stores/user'
import cx from 'classnames'
import Modal from '@santiment-network/ui/Modal'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import sharedStyles from '@cmp/Insight/InsightCard.module.scss'
import styles from '@cmp/Insight/comments/Comments.module.scss'

const ReactComments = toReact(SvelteComments, {}, 'div')

export const Comments = (props) => {
  const { user } = useUser()
  return <ReactComments {...props} currentUser={user} />
}

export const CommentsButton = ({ count, ...rest }) => {
  return (
    <Modal
      trigger={
        <div className={cx(sharedStyles.stat, sharedStyles.stat_comments)}>
          <Icon type='comment' className={sharedStyles.commentIcon} /> {count}
        </div>
      }
      as={Panel}
      classes={{
        wrapper: styles.wrapper,
        modal: cx(styles.modal),
      }}
    >
      <Comments {...rest} />
    </Modal>
  )
}
