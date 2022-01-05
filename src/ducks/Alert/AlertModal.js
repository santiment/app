import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import LoginPopup from '../../components/banners/feature/PopupBanner'
import AlertTriggerButton from './components/AlertTriggerButton/AlertTriggerButton'
import ConfirmClose from './components/ConfirmClose/ConfirmClose'
import AlertModalFormMaster from './AlertModalFormMaster'
import { useUser } from '../../stores/user'
import { useSignal } from './hooks/useSignal'
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
  const { isLoggedIn } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const { data = {}, loading } = useSignal({
    id,
    skip: !id || !isModalOpen
  })

  if (!isLoggedIn) {
    return (
      <LoginPopup>
        <AlertTriggerButton
          disabled={disabled}
          triggerButtonProps={triggerButtonProps}
        />
      </LoginPopup>
    )
  }

  const signal = signalData || (data.trigger ? data.trigger.trigger : {})

  const signalType = signal.settings
    ? ALERT_TYPES.find(type => {
        if (signal.settings.type === 'metric_signal') {
          if (signal.settings.target.slug) {
            return ALERT_TYPES[0]
          }
          if (signal.settings.target.watchlist_id) {
            return ALERT_TYPES[1]
          }
        }
        return type.settings.type === signal.settings.type
      })
    : defaultType

  return (
    <>
      <Dialog
        withAnimation
        title={modalTitle}
        defaultOpen={defaultOpen}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsClosing(true)}
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
        {isModalOpen && (
          <AlertModalFormMaster
            isSignalLoading={loading}
            signal={signal}
            defaultType={signalType}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        )}
      </Dialog>
      <ConfirmClose
        isOpen={isClosing}
        onApprove={() => {
          setIsModalOpen(false)
          setIsClosing(false)
        }}
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
  defaultOpen: false
}

export default AlertModal
