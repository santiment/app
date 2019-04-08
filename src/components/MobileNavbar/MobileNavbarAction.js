import React from 'react'
import cx from 'classnames'
import { Button, Icon } from '@santiment-network/ui'
import styles from './MobileNavbarAction.module.scss'

const MobileNavbarAction = ({
  onClick,
  iconType,
  label,
  linkTo,
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
  const handleOnClick = () => onClick(linkTo)

  return (
    <Button
      className={cx(isActive && classes.isActive, classes.button, className)}
      isActive={isActive}
      onClick={handleOnClick}
    >
      <Icon
        type={iconType}
        className={classes.icon}
        fill={isActive ? 'var(--jungle-green)' : 'var(--mirage)'}
      />
      <div className={cx(classes.label, isActive && classes.isActive)}>
        {label}
      </div>
    </Button>
  )
}

export default MobileNavbarAction
