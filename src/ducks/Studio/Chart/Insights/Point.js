import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Insight from './Insight'
import Avatar from './Avatar'
import styles from './Point.module.scss'
import insightStyles from './Insight.module.scss'

const Point = ({
  index,
  left,
  top,
  user,
  isOpened,
  setOpenedIndex,
  ...props
}) => {
  function openInsight () {
    setOpenedIndex(index)
  }

  function closeInsight () {
    setOpenedIndex()
  }

  return (
    <ContextMenu
      open={isOpened}
      position='top'
      on='click'
      offsetY={16}
      onOpen={openInsight}
      onClose={closeInsight}
      trigger={
        <Avatar
          className={cx(styles.avatar, isOpened && styles.avatar_active)}
          src={user.avatarUrl}
          left={left}
          top={top}
        />
      }
      className={styles.tooltip}
    >
      <div className={insightStyles.wrapper}>
        {isOpened && <Insight {...props} user={user} />}
      </div>
    </ContextMenu>
  )
}

export default Point
