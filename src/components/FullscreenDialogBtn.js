import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'

const FullscreenDialogBtn = ({
  children,
  iconClassName,
  title,
  dialogClasses,
  ...rest
}) => (
  <Dialog
    title={title}
    classes={dialogClasses}
    trigger={
      <Button {...rest}>
        <Icon type='fullscreen' className={iconClassName} />
      </Button>
    }
  >
    {children}
  </Dialog>
)

export default FullscreenDialogBtn
