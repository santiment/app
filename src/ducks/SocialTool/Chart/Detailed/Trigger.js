import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon/Icon'
import styles from './Trigger.module.scss'

const Trigger = ({ className, name, color }) => (
  <span className={cx(styles.text, className)}>
    <Icon type='ring' className={styles.icon} style={{ '--color': color }} />
    {name}
  </span>
)

export default Trigger
