import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './Trigger.module.scss'

export const ProductsTrigger = ({ isOpen, className }) => (
  <div className={cx(styles.trigger, isOpen && styles.opened, className)}>
    <Icon type='products-trigger' />
  </div>
)
