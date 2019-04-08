import React from 'react'
import cx from 'classnames'
import { Button, Icon } from '@santiment-network/ui'
import styles from './MobileNavbarAction.module.scss'

// TODO: How to fill with our brand color names?

const MobileNavbarAction = ({
  onClick,
  iconType,
  label,
  classes = {
    isActive: styles.isActive,
    icon: styles.icon,
    wrapper: styles.wrapper,
    label: styles.label,
    button: styles.button
  },
  isActive = false,
  className = ''
}) => {
  return (
    <Button
      className={cx(
        { [classes.isActive]: isActive },
        classes.button,
        className
      )}
      onClick={onClick}
    >
      <Icon
        type={iconType}
        className={classes.icon}
        fill={isActive ? '#14c393' : '#000'}
      />
      <div className={cx(classes.label, { [classes.isActive]: isActive })}>
        {label}
      </div>
    </Button>
  )
}

export default MobileNavbarAction
