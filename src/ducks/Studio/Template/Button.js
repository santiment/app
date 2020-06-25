import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Loader from '@santiment-network/ui/Loader/Loader'
import FormDialogNewTemplate from './Dialog/NewTemplate'
import LoginDialog from '../../../components/LoginDialog'
import TemplateInfo from './TemplateDetailsDialog/TemplateInfo'
import styles from './index.module.scss'

const NoTemplateLabel = ({ loading }) => {
  return loading ? <Loader className={styles.loader} /> : 'Save as'
}

const TemplateTitle = ({ loading, openDialog }) => (
  <div onClick={openDialog}>{<NoTemplateLabel loading={loading} />}</div>
)

const Trigger = ({ hasTemplates, selectedTemplate, openDialog, loading }) => {
  return (
    <div
      className={cx(styles.btn__left, !hasTemplates && styles.btn__left_large)}
    >
      {selectedTemplate ? (
        <Tooltip
          position='top'
          align='start'
          on='click'
          offsetY={13}
          closeTimeout={500}
          className={styles.tooltip}
          trigger={
            <div className={styles.tooltipTrigger}>
              <div className={styles.detailsIcon}>
                <Icon type='info-round' />
              </div>
              {!loading ? (
                selectedTemplate.title
              ) : (
                <TemplateTitle loading={loading} openDialog={openDialog} />
              )}
            </div>
          }
        >
          <TemplateInfo template={selectedTemplate} classes={styles} />
        </Tooltip>
      ) : (
        <TemplateTitle loading={loading} openDialog={openDialog} />
      )}
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
  loading,
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
            loading={loading}
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
