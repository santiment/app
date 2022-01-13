import React, { useState } from 'react'
import cx from 'classnames'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import LoginPopup from '../../components/banners/feature/PopupBanner'
import AlertTriggerButton from './components/AlertTriggerButton/AlertTriggerButton'
import ConfirmClose from './components/ConfirmClose/ConfirmClose'
import AlertModalFormMaster from './AlertModalFormMaster'
import { useUser } from '../../stores/user'
import { ALERT_TYPES } from './constants'
import styles from './AlertModal.module.scss'

const AlertModal = ({
  id,
  disabled,
  triggerButtonProps,
  modalTitle,
  defaultOpen,
  trigger,
  defaultType,
  signalData
}) => {
  const match = useRouteMatch('/alerts/:id')
  const history = useHistory()
  const { isLoggedIn } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(defaultOpen)
  const [isClosing, setIsClosing] = useState(false)
  const [isEdited, setIsEdited] = useState(false)

  if (!isLoggedIn) {
    return (
      <LoginPopup>
        {trigger || (
          <AlertTriggerButton
            disabled={disabled}
            triggerButtonProps={triggerButtonProps}
          />
        )}
      </LoginPopup>
    )
  }

  function handleCloseDialog () {
    if (match && match.params.id) {
      history.push('/alerts')
    }
    setIsModalOpen(false)
    setIsClosing(false)
  }

  return (
    <>
      <Dialog
        withAnimation
        title={modalTitle}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => {
          if (isEdited) {
            setIsClosing(true)
          } else {
            handleCloseDialog()
          }
        }}
        trigger={
          trigger || (
            <AlertTriggerButton
              disabled={disabled}
              triggerButtonProps={triggerButtonProps}
            />
          )
        }
        classes={{
          dialog: cx(styles.dialog, isClosing && styles.hidden)
        }}
      >
        <AlertModalFormMaster
          id={id}
          signalData={signalData}
          defaultType={defaultType}
          handleCloseDialog={handleCloseDialog}
          setIsEdited={setIsEdited}
          isEdited={isEdited}
          isModalOpen={isModalOpen}
        />
      </Dialog>
      <ConfirmClose
        isOpen={isClosing}
        onApprove={handleCloseDialog}
        onCancel={() => {
          setIsClosing(false)
          setIsModalOpen(true)
        }}
      />
    </>
  )
}

AlertModal.defaultProps = {
  modalTitle: 'Create alert for',
  disabled: false,
  defaultOpen: false,
  defaultType: ALERT_TYPES[0]
}

export default AlertModal
