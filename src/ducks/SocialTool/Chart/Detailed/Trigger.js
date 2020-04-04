import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button/Button'
import Icon from '@santiment-network/ui/Icon/Icon'
import styles from './Trigger.module.scss'

const Trigger = ({ isActive, toggleActive, className, label, color }) => (
  <Button
    variant='flat'
    border
    className={cx(styles.button, className)}
    onClick={toggleActive}
  >
    <Icon type='ring' className={styles.icon} style={{ '--color': color }} />
    {label}
    {isActive && <Icon type='close-small' className={styles.close} />}
  </Button>
)

export default Trigger
