import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import ShowIf from '../ShowIf/ShowIf'
import styles from './MobileNavbarAction.module.scss'

const MobileNavbarAction = ({
  onClick,
  Icon,
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
  showIf = { condition: true },
  className = '',
  ...props
}) => {
  const handleOnClick = () => onClick(linkTo)

  return (
    <ShowIf {...showIf}>
      <Button
        className={cx(isActive && classes.isActive, classes.button, className)}
        isActive={isActive}
        onClick={handleOnClick}
        {...props}
      >
        <Icon className={classes.icon} />
        {label}
      </Button>
    </ShowIf>
  )
}

export default MobileNavbarAction
