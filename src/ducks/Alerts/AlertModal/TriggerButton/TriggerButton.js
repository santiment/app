import React from 'react'
import Button from '@santiment-network/ui/Button'
import cx from 'classnames'
import styles from './TriggerButton.module.scss'

const TriggerButton = ({
  variant,
  border,
  enabled,
  classes,
  label,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      border={border}
      disabled={!enabled}
      accent='positive'
      className={cx(styles.triggerButton, classes)}
      {...rest}
    >
      {label}
    </Button>
  )
}

TriggerButton.defaultProps = {
  variant: 'fill',
  border: false
}

export default TriggerButton
