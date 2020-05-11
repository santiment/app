import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import DarkTooltip from '../../../components/Tooltip/DarkTooltip'
import FormDialogNewTemplate from './Dialog/NewTemplate'
import LoginDialog from '../../../components/LoginDialog'
import Tooltip from '@santiment-network/ui/Tooltip'
import TemplateInfo from './TemplateDetailsDialog/TemplateInfo'
import TemplateTitle from './TemplateDetailsDialog/TemplateTitle'
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
      Click to save '<TemplateTitle title={selectedTemplate.title} />'
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
    <div
      onClick={
        selectedTemplate && isLoggedIn
          ? saveTemplate
          : () => {
            openDialog()
          }
      }
      className={cx(styles.btn__left, !hasTemplates && styles.btn__left_large)}
    >
      {selectedTemplate && (
        <Tooltip
          position='top'
          align='start'
          offsetY={13}
          closeTimeout={500}
          trigger={
            <div className={styles.detailsIcon}>
              <Icon type='info-round' />
            </div>
          }
          className={styles.tooltip}
        >
          <TemplateInfo template={selectedTemplate} classes={styles} />
        </Tooltip>
      )}

      <TooltipWrapper selectedTemplate={selectedTemplate}>
        <div>
          {selectedTemplate ? (
            <TemplateTitle title={selectedTemplate.title} />
          ) : (
            'Save as'
          )}
        </div>
      </TooltipWrapper>
    </div>
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
