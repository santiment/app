import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './SwipeableCard.module.scss'

const SwipeableCard = ({ children }) => (
  <div className={styles.container}>
    <button className={cx(styles.button, styles.info)}>
      <Icon type='info-round' />
    </button>
    <button className={cx(styles.button, styles.add)}>
      <Icon type='plus-round' />
    </button>
    <div className={styles.content}>{children}</div>
  </div>
)

export default SwipeableCard
