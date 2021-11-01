import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import { useFormik } from 'formik'

import AlertModalSidebar from './AlertModalSidebar/AlertModalSidebar'
import AlertModalContent from './AlertModalContent/AlertModalContent'
import TriggerButton from './TriggerButton/TriggerButton'

import { ALERT_TYPES } from '../constants'

import styles from './styles.module.scss'

const AlertModal = ({
  isOpen,
  defaultIsOpen,
  handleOpen,
  handleClose,
  triggerLabel,
  modalLabel,
  enabled,
  triggerButtonParams
}) => {
  const [currentAlertType, setCurrentAlertType] = useState(ALERT_TYPES[0])
  const [selectedStep, setSelectedStep] = useState()

  const formik = useFormik({
    initialValues: {
      settings: {
        target: {
          slug: ''
        }
      }
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })

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
          />
          <AlertModalContent
            currentAlertType={currentAlertType}
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
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
