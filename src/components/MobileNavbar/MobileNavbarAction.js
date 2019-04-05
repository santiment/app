import React from 'react'
import cx from 'classnames'
import { Button, Icon } from '@santiment-network/ui'
import styles from './MobileNavbarAction.module.scss'

const MobileNavbarAction = ({
  onClick,
  iconType,
  label,
  classes = {
    selected: styles.selected,
    icon: styles.icon,
    wrapper: styles.wrapper,
    label: styles.label,
    button: styles.button
  },
  selected = false,
  className
}) => {
  return (
    <Button
      className={cx(
        { [classes.selected]: selected },
        classes.button,
        className
      )}
      onClick={onClick}
    >
      <div className={classes.wrapper}>
        <Icon type={iconType} className={classes.icon} />
        <div className={cx(classes.label, { [classes.selected]: selected })}>
          {label}
        </div>
      </div>
    </Button>
  )
}

export default MobileNavbarAction
