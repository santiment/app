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
      <Icon type='eye-small' className={cx(className, styles.icon)} />
    )}
    IconNotActive={props => <Icon type='eye-disabled-small' {...props} />}
    {...rest}
  />
)

export default Toggle
