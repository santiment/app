import React, { useEffect, useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'

import AlertModalSidebar from './AlertModalSidebar/AlertModalSidebar'
import AlertModalContent from './AlertModalContent/AlertModalContent'
import TriggerButton from './TriggerButton/TriggerButton'

import { ALERT_TYPES } from '../constants'

import styles from './AlertModal.module.scss'

const AlertModal = ({
  isOpen,
  defaultIsOpen,
  handleOpen,
  handleClose,
  triggerLabel,
  modalLabel,
  enabled,
  triggerButtonParams,
  handleFormValueChange,
  formValues,
  metaFormSettings,
  resetForm
}) => {
  const [currentAlertType, setCurrentAlertType] = useState(ALERT_TYPES[0])
  const [selectedStep, setSelectedStep] = useState()

  useEffect(() => {
    switch (currentAlertType.title) {
      case ALERT_TYPES[0].title:
        handleFormValueChange({
          field: 'signalType',
          value: {
            label: 'Assets',
            value: 'assets'
          }
        })
        break
      default:
        handleFormValueChange({
          field: 'signalType',
          value: {
            label: 'Assets',
            value: 'assets'
          }
        })
        break
    }
  }, [currentAlertType])

  const handleSetCurrentAlertType = type => {
    setCurrentAlertType(type)
  }

  return (
    <>
      <Dialog
        withAnimation
        defaultOpen={defaultIsOpen}
        open={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        trigger={
          <TriggerButton
            enabled={enabled}
            label={triggerLabel}
            {...triggerButtonParams}
          />
        }
        title={modalLabel}
        classes={{
          dialog: styles.dialog
        }}
      >
        <div className={styles.wrapper}>
          <AlertModalSidebar
            currentAlertType={currentAlertType}
            onChange={handleSetCurrentAlertType}
            setSelectedStep={setSelectedStep}
            selectedStep={selectedStep}
            formValues={formValues}
          />
          <AlertModalContent
            handleFormValueChange={handleFormValueChange}
            currentAlertType={currentAlertType}
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
            formValues={formValues}
            metaFormSettings={metaFormSettings}
            handleClose={handleClose}
            resetForm={resetForm}
          />
        </div>
      </Dialog>
    </>
  )
}

AlertModal.defaultProps = {
  triggerLabel: 'Create Alert',
  modalLabel: 'Create alert for',
  enabled: true,
  triggerButtonParams: {}
}

export default AlertModal
