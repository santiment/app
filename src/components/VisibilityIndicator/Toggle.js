import React from 'react'
import cx from 'classnames'
import UIToggle from '@santiment-network/ui/Toggle'
import Icon from '@santiment-network/ui/Icon'
import styles from './Toggle.module.scss'

const Toggle = ({ isActive, className, ...rest }) => (
  <UIToggle
    isActive={isActive}
    className={cx(styles.toggle, className)}
    IconActive={({ className }) => (
      <Icon type='checkmark' width={11} height={8} className={cx(className, styles.icon)} />
    )}
    IconNotActive={(props) => <Icon type='eye-disabled' width={15} height={13} {...props} />}
    {...rest}
  />
)

export default Toggle
