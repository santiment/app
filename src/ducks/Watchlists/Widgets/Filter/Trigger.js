import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import styles from './Trigger.module.scss'

const Trigger = ({ isActive, onClick }) => (
  <Button
    className={cx(styles.button, isActive && styles.active)}
    onClick={() => onClick(!isActive)}
  >
    <Icon className={styles.icon} type='filter-filled' />
    Filter
  </Button>
)

export default Trigger
