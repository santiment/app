import React from 'react'
import Button from '@santiment-network/ui/Button'

const AlertTriggerButton = ({ triggerButtonProps, disabled, ...rest }) => {
  const {
    variant,
    border,
    classes,
    label,
    ...restTriggerButtonProps
  } = triggerButtonProps

  return (
    <Button
      variant={variant}
      border={border}
      disabled={disabled}
      accent='positive'
      className={classes}
      {...restTriggerButtonProps}
      {...rest}
    >
      {label}
    </Button>
  )
}

AlertTriggerButton.defaultProps = {
  triggerButtonProps: {
    label: 'Create alert',
    variant: 'fill',
    border: false
  }
}

export default AlertTriggerButton
