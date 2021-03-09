import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import styles from './Trigger.module.scss'

const Trigger = ({ isMonitored }) => (
  <Button
    border
    variant='flat'
    accent='positive'
    className={cx(styles.trigger, isMonitored && styles.trigger__active)}
  >
    <Icon type='report' className={styles.icon} />
    {isMonitored && <span className={styles.active} />}
    {!isMonitored && <span className={styles.text}>Enable report</span>}
  </Button>
)

export default Trigger
