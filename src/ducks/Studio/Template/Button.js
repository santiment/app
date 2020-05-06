import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import DarkTooltip from '../../../components/Tooltip/DarkTooltip'
import FormDialogNewTemplate from './Dialog/NewTemplate'
import LoginDialog from '../../../components/LoginDialog'
import styles from './index.module.scss'

const TooltipWrapper = ({ selectedTemplate, children }) => {
  if (!selectedTemplate) {
    return children
  }

  return (
    <DarkTooltip
      trigger={children}
      position='bottom'
      align='start'
      className={styles.tooltip}
    >
      Click to save '{selectedTemplate.title}'
    </DarkTooltip>
  )
}

const Trigger = ({
  hasTemplates,
  selectedTemplate,
  saveTemplate,
  openDialog,
  isLoggedIn
}) => {
  return (
    <TooltipWrapper selectedTemplate={selectedTemplate}>
      <div
        onClick={
          selectedTemplate && isLoggedIn
            ? saveTemplate
            : () => {
              openDialog()
            }
        }
        className={cx(
          styles.btn__left,
          !hasTemplates && styles.btn__left_large
        )}
      >
        <Icon type='cloud-small' className={styles.cloud} />
        {selectedTemplate ? selectedTemplate.title : 'Save as'}
      </div>
    </TooltipWrapper>
  )
}

export default ({
  forwardedRef,
  selectedTemplate,
  hasTemplates,
  isMenuOpened,
  isLoggedIn,
  saveTemplate,
  openMenu,
  onNewTemplate,
  ...props
}) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false)

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

  const Dialog = isLoggedIn ? FormDialogNewTemplate : LoginDialog

  return (
    <button className={styles.btn} ref={forwardedRef}>
      <Dialog
        {...props}
        title='New Chart Layout'
        open={isDialogOpened}
        onClose={closeDialog}
        onNew={onNew}
        trigger={
          <Trigger
            hasTemplates={hasTemplates}
            selectedTemplate={selectedTemplate}
            saveTemplate={saveTemplate}
            openDialog={openDialog}
            isLoggedIn={isLoggedIn}
          />
        }
      />
      <div className={styles.dropdown} onClick={openMenu}>
        <Icon
          type='arrow-down'
          className={cx(styles.icon, isMenuOpened && styles.active)}
        />
      </div>
    </button>
  )
}
