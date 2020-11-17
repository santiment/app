import React from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import styles from './index.module.scss'

const ToggleSetting = ({ title, isActive, className, ...props }) => (
  <Button
    {...props}
    fluid
    variant='ghost'
    className={cx(styles.btn, className)}
  >
    {title}
    <Toggle isActive={isActive} className={styles.toggle} />
  </Button>
)

export default ToggleSetting
