import React, { useState, useEffect } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import GA from '../../../utils/tracking'
import PageLoader from '../../../components/Loader/PageLoader'
import AnonBanner from '../../../components/AnonBanner/AnonBanner'
import {
  NoSignal,
  signalModalTrigger,
  TriggerModalTitle
} from './SignalDialogComponents'
import styles from './SignalMasterModalForm.module.scss'

const SignalDialog = ({
  dialogOpenState,
  setDialogOpenState,
  onCloseMainModal,
  closeDialog,
  dialogTrigger,
  enabled,
  label,
  isError,
  isShared,
  isLoggedIn,
  dialogProps,
  isLoading,
  trigger,
  formChangedCallback,
  canRedirect,
  metaFormSettings,
  buttonParams,
  SignalMaster
}) => {
  const [dialogTitle, onSetDialogTitle] = useState('')
  const [isAnonWarning, setAnonWarning] = useState(false)
  const [openSharedForm, setOpenForm] = useState(isShared)

  const { variant, border } = buttonParams

  const toggleAnon = (warn = true) => {
    setAnonWarning(warn)
  }

  useEffect(() => toggleAnon(!isLoggedIn), [isLoggedIn])

  useEffect(
    () => {
      if (isLoading) {
        toggleAnon(false)
      }
    },
    [isLoading]
  )

  useEffect(
    () => {
      if (!isLoggedIn) {
        onSetDialogTitle('Create alert')
      }
    },
    [isLoggedIn]
  )

  useEffect(
    () => {
      if (openSharedForm !== isShared) {
        setOpenForm(isShared)
      }
    },
    [isShared]
  )

  useEffect(
    () => {
      openSharedForm && onSetDialogTitle('Alert details')
    },
    [openSharedForm]
  )

  const canOpen = (isLoggedIn || isShared) && !isAnonWarning

  return (
    <Dialog
      open={dialogOpenState}
      onOpen={() => {
        // Track opening New signal Dialog
        GA.event(
          {
            category: 'user',
            action: 'alerts',
            method: 'create_new_alert'
          },
          ['ga', 'intercom']
        )
        setDialogOpenState(true)
      }}
      onClose={onCloseMainModal}
      trigger={
        dialogTrigger || signalModalTrigger(enabled, label, variant, border)
      }
      title={
        <TriggerModalTitle
          showSharedBtn={isShared && !openSharedForm}
          isError={isError}
          dialogTitle={dialogTitle}
          isLoggedIn={isLoggedIn}
        />
      }
      classes={styles}
      {...dialogProps}
    >
      <Dialog.ScrollContent className={styles.TriggerPanel}>
        {isError && <NoSignal />}

        {!isError && isLoading && <PageLoader className={styles.loading} />}

        {!isError && !isLoading && (
          <>
            {canOpen && (
              <SignalMaster
                setOpenSharedForm={setOpenForm}
                openSharedForm={openSharedForm}
                isShared={isShared}
                trigger={trigger}
                setTitle={onSetDialogTitle}
                onClose={closeDialog}
                canRedirect={canRedirect}
                metaFormSettings={metaFormSettings}
                formChangedCallback={formChangedCallback}
                toggleAnon={toggleAnon}
              />
            )}

            {(isAnonWarning || !canOpen) && (
              <AnonBanner className={styles.anon} />
            )}
          </>
        )}
      </Dialog.ScrollContent>
    </Dialog>
  )
}

export default SignalDialog
