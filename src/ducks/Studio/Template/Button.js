import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import FormDialogNewTemplate from './Dialog/NewTemplate'
import LoginDialog from '../../../components/LoginDialog'
import styles from './index.module.scss'
import btnStyles from './Button.module.scss'

const SaveAction = ({
  template,
  isLoggedIn,
  saveTemplate,
  onNewTemplate,
  ...props
}) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false)

  const onActionClick = template && isLoggedIn ? saveTemplate : openDialog
  const actionComponent = (
    <span className={btnStyles.action} onClick={onActionClick}>
      Save{template ? '' : ' as'}
    </span>
  )

  function openDialog () {
    setIsDialogOpened(true)
  }

  function closeDialog () {
    setIsDialogOpened(false)
  }

  function onNew (template) {
    onNewTemplate(template)
    closeDialog()
  }

  if (template && isLoggedIn) {
    return actionComponent
  }

  const Dialog = isLoggedIn ? FormDialogNewTemplate : LoginDialog

  return (
    <Dialog
      {...props}
      title='New Chart Layout'
      open={isDialogOpened}
      onClose={closeDialog}
      onNew={onNew}
      trigger={actionComponent}
    />
  )
}

export default ({
  forwardedRef,
  selectedTemplate,
  isMenuOpened,
  openMenu,
  onNewTemplate,
  ...props
}) => (
  <div className={btnStyles.btn} ref={forwardedRef}>
    <SaveAction
      {...props}
      template={selectedTemplate}
      onNewTemplate={onNewTemplate}
    />

    <span className={btnStyles.action} onClick={openMenu}>
      <Icon
        type='arrow-down'
        className={cx(btnStyles.arrow, isMenuOpened && styles.active)}
      />
    </span>
  </div>
)
