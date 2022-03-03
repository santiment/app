import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './CommentsButton.module.scss'

const CommentsButton = ({ commentsCount = 0, isActive, onClick }) => (
  <div
    className={cx(styles.wrapper, isActive && styles.active)}
    onClick={onClick}
  >
    <Icon type='comment' />
    {commentsCount}
  </div>
)

export default CommentsButton
