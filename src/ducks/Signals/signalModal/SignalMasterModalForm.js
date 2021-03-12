import React, { useState, useEffect, useCallback } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import { useSignal } from '../common/getSignal'
import { ALERT_ROUTES } from '../common/constants'
import ConfirmSignalModalClose from './confirmClose/ConfirmSignalModalClose'
import SignalDialog from './SignalDialog'
import SignalMaster from '../signalFormManager/signalMaster/SignalMaster'

const SignalMasterModalForm = ({
  label = 'New alert',
  metaFormSettings,
  canRedirect = true,
  enabled = true,
  id: triggerId,
  isLoggedIn,
  match,
  trigger: dialogTrigger,
  buttonParams = {},
  dialogProps,
  shareParams = {},
  userId,
  redirect,
  previousPage = ALERT_ROUTES.ALERTS,
  defaultOpen = true,
  onClose,
  noLoginPopupContainer
}) => {
  const { id: shareId, isShared: isOldShared } = shareParams

  if (!triggerId && match) {
    triggerId = match.params.id
  } else if (isOldShared && shareId) {
    triggerId = shareId
  }

  const hasTrigger = +triggerId > 0

  const [dialogOpenState, setDialogOpenState] = useState(
    defaultOpen && hasTrigger
  )

  const [isApproving, setIsAppoving] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(
    () => {
      defaultOpen && setDialogOpenState(hasTrigger)
    },
    [triggerId]
  )

  const onCancelClose = useCallback(
    () => {
      setIsAppoving(false)
    },
    [setIsAppoving]
  )

  const goBack = useCallback(
    () => {
      if (hasTrigger) {
        canRedirect && redirect && redirect(previousPage)
      }
    },
    [canRedirect, redirect, hasTrigger]
  )

  const closeDialog = useCallback(
    () => {
      setDialogOpenState(false)

      if (onClose) {
        onClose()
      }
    },
    [setDialogOpenState, onClose]
  )

  const onApprove = useCallback(
    () => {
      setIsAppoving(false)
      closeDialog()

      goBack()
    },
    [goBack, setIsAppoving, closeDialog]
  )

  const onCloseMainModal = useCallback(
    () => {
      if (isChanged && isLoggedIn) {
        setIsAppoving(true)
      } else {
        closeDialog()
        goBack()
      }
    },
    [isChanged, setIsAppoving, closeDialog, goBack, isLoggedIn]
  )

  const formChangedCallback = useCallback(
    isChanged => {
      setIsChanged(isChanged)
    },
    [setIsChanged]
  )

  const { data = {}, loading: isLoading, error: isError } = useSignal({
    triggerId,
    skip: !dialogOpenState
  })

  const { trigger = {} } = data
  const { authorId } = trigger

  const isShared = isOldShared || (!!authorId && +userId !== authorId)

  if (isShared && trigger && trigger.trigger) {
    trigger.trigger = { ...trigger.trigger, ...shareParams }
  }

  trigger.userId = authorId

  return (
    <>
      {isApproving && (
        <ConfirmSignalModalClose
          isOpen={isApproving}
          onCancel={onCancelClose}
          onApprove={onApprove}
        />
      )}
      <SignalDialog
        dialogOpenState={dialogOpenState}
        setDialogOpenState={setDialogOpenState}
        closeDialog={closeDialog}
        onCloseMainModal={onCloseMainModal}
        dialogTrigger={dialogTrigger}
        enabled={enabled}
        label={label}
        isError={isError}
        isShared={isShared}
        isLoggedIn={isLoggedIn}
        dialogProps={dialogProps}
        isLoading={isLoading}
        trigger={trigger}
        formChangedCallback={formChangedCallback}
        canRedirect={canRedirect}
        metaFormSettings={metaFormSettings}
        buttonParams={buttonParams}
        SignalMaster={SignalMaster}
        noLoginPopupContainer={noLoginPopupContainer}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state),
    userId: +state.user.data.id
  }
}

const mapDispatchToProps = dispatch => ({
  redirect: url => {
    dispatch(push(url || ALERT_ROUTES.ALERTS))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalMasterModalForm)
