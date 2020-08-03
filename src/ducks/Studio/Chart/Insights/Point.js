import React, { useState } from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Insight from './Insight'
import Avatar from './Avatar'
import styles from './Point.module.scss'
import insightStyles from './Insight.module.scss'

const Point = ({ left, top, user, ...insight }) => {
  const [isOpened, setIsOpened] = useState()

  function openInsight () {
    setIsOpened(true)
  }

  function closeInsight () {
    setIsOpened(false)
  }

  return (
    <Tooltip
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
        {isOpened && <Insight {...insight} user={user} />}
      </div>
    </Tooltip>
  )
}

export default Point
