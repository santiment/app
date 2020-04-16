import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import FormDialogNewTemplate from './Dialog/NewTemplate'
import LoginDialog from '../../../components/LoginDialog'
import styles from './index.module.scss'

const TooltipWrapper = ({ selectedTemplate, children }) => {
  if (!selectedTemplate) {
    return children
  }

  return (
    <Tooltip
      trigger={children}
      position='bottom'
      align='start'
      className={styles.tooltip}
    >
      Click to save '{selectedTemplate.title}'
      <svg
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={styles.tooltipIcon}
      >
        <path d='M24.69 25.44a2 2 0 01-2.93 0L1.24 3.38A2 2 0 012.7.02h41.05a2 2 0 011.46 3.36L24.7 25.44z' />
      </svg>
    </Tooltip>
  )
}

const Trigger = ({
  hasTemplates,
  selectedTemplate,
  saveTemplate,
  openDialog
}) => {
  return (
    <TooltipWrapper selectedTemplate={selectedTemplate}>
      <div
        onClick={selectedTemplate ? saveTemplate : openDialog}
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
        title='New Template'
        open={isDialogOpened}
        onClose={closeDialog}
        onNew={onNew}
        trigger={
          <Trigger
            hasTemplates={hasTemplates}
            selectedTemplate={selectedTemplate}
            saveTemplate={saveTemplate}
            openDialog={openDialog}
          />
        }
      />
      {hasTemplates && (
        <div className={styles.dropdown} onClick={openMenu}>
          <Icon
            type='arrow-down'
            className={cx(styles.icon, isMenuOpened && styles.active)}
          />
        </div>
      )}
    </button>
  )
}
