import React, { useState, useEffect } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import { useSignal } from '../common/getSignal'
import { SIGNAL_ROUTES } from '../common/constants'
import ConfirmSignalModalClose from './confirmClose/ConfirmSignalModalClose'
import SignalDialog from './SignalDialog'

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
  previousPage = SIGNAL_ROUTES.MY_SIGNALS,
  defaultOpen = true,
  onClose
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
    data => {
      defaultOpen && setDialogOpenState(hasTrigger)
    },
    [triggerId]
  )

  const onCancelClose = () => {
    setIsAppoving(false)
  }

  const goBack = () => {
    if (hasTrigger) {
      canRedirect && redirect && redirect(previousPage)
    }
  }

  const onApprove = () => {
    setIsAppoving(false)
    closeDialog()

    goBack()
  }

  const onCloseMainModal = () => {
    if (isChanged && isLoggedIn) {
      setIsAppoving(true)
    } else {
      closeDialog()
      goBack()
    }
  }

  const formChangedCallback = isChanged => {
    setIsChanged(isChanged)
  }

  function closeDialog () {
    setDialogOpenState(false)

    if (onClose) {
      onClose()
    }
  }

  const { data = {}, loading: isLoading, error: isError } = useSignal({
    triggerId,
    skip: !dialogOpenState
  })
  const { trigger = {}, userId: triggerUserId } = data

  let isShared = isOldShared || (!!triggerUserId && +userId !== triggerUserId)

  if (isShared && trigger && trigger.trigger) {
    trigger.trigger = { ...trigger.trigger, ...shareParams }
  }

  trigger.userId = triggerUserId

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
    dispatch(push(url || SIGNAL_ROUTES.MY_SIGNALS))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalMasterModalForm)
