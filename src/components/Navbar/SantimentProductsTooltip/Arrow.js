import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './Arrow.module.scss'

export const ArrowTrigger = ({ isOpen }) => (
  <div className={cx(styles.arrow, isOpen && styles.opened)}>
    <Icon type='arrow-down' />
  </div>
)
