import React, { useState, useEffect } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import PageLoader from '../../../components/Loader/PageLoader'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'
import SignalMaster from '../signalFormManager/signalMaster/SignalMaster'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import GetSignal from '../common/getSignal'
import { SIGNAL_ROUTES } from '../common/constants'
import SignalAnon from './SignalAnon'
import ConfirmSignalModalClose from './confirmClose/ConfirmSignalModalClose'
import EmptySection from '../../../components/EmptySection/EmptySection'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = ({
  label = 'New signal',
  metaFormSettings,
  canRedirect = true,
  enabled = true,
  triggerId,
  isLoggedIn,
  match,
  trigger: dialogTrigger,
  buttonParams = {},
  dialogProps,
  shareParams = {},
  userId,
  redirect,
  previousPage = SIGNAL_ROUTES.MY_SIGNALS
}) => {
  const { id: shareId, isShared: isOldShared } = shareParams

  if (!triggerId && match) {
    triggerId = match.params.id
  } else if (isOldShared && shareId) {
    triggerId = shareId
  }

  const hasTrigger = +triggerId > 0

  const [dialogOpenState, setDialogOpenState] = useState(hasTrigger)
  const [isApproving, setIsAppoving] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(
    data => {
      setDialogOpenState(hasTrigger)
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
    setDialogOpenState(false)

    goBack()
  }

  const onCloseMainModal = () => {
    if (isChanged && isLoggedIn) {
      setIsAppoving(true)
    } else {
      setDialogOpenState(false)
      goBack()
    }
  }

  const formChangedCallback = isChanged => {
    setIsChanged(isChanged)
  }

  return (
    <GetSignal
      triggerId={triggerId}
      render={({ trigger = {}, userId: triggerUserId }) => {
        const { isLoading, isError } = trigger

        let isShared =
          isOldShared || (!!triggerUserId && +userId !== triggerUserId)

        if (isShared && trigger && trigger.trigger) {
          trigger.trigger = { ...trigger.trigger, ...shareParams }
        }

        return (
          <>
            <ConfirmSignalModalClose
              isOpen={isApproving}
              onCancel={onCancelClose}
              onApprove={onApprove}
            />
            <MainDialog
              dialogOpenState={dialogOpenState}
              setDialogOpenState={setDialogOpenState}
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
      }}
    />
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

const MainDialog = ({
  dialogOpenState,
  setDialogOpenState,
  onCloseMainModal,
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
  buttonParams
}) => {
  const [dialogTitle, onSetDialogTitle] = useState('')
  const [isAnonWarning, setAnonWarning] = useState(false)

  const { variant, border } = buttonParams

  const toggleAnon = (warn = true) => {
    setAnonWarning(warn)
  }

  useEffect(
    () => {
      toggleAnon(false)
    },
    [isLoading]
  )

  useEffect(
    () => {
      if (!isLoggedIn) {
        onSetDialogTitle('Create signal')
      }
    },
    [isLoggedIn]
  )

  const [openSharedForm, setOpenForm] = useState(isShared)
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
      openSharedForm && onSetDialogTitle('Signal details')
    },
    [openSharedForm]
  )

  return (
    <Dialog
      open={dialogOpenState}
      onOpen={() => setDialogOpenState(true)}
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

        {!isError && !isLoading && !isAnonWarning && (
          <SignalMaster
            setOpenSharedForm={setOpenForm}
            openSharedForm={openSharedForm}
            isShared={isShared}
            trigger={trigger}
            setTitle={onSetDialogTitle}
            onClose={() => setDialogOpenState(false)}
            canRedirect={canRedirect}
            metaFormSettings={metaFormSettings}
            formChangedCallback={formChangedCallback}
            toggleAnon={toggleAnon}
          />
        )}

        {isAnonWarning && <SignalAnon className={styles.anon} />}
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const TriggerModalTitle = ({
  showSharedBtn,
  isError,
  dialogTitle = 'Signal details',
  isLoggedIn
}) => {
  if (isError) {
    return null
  }

  return (
    <>
      {dialogTitle}
      {showSharedBtn && isLoggedIn && (
        <Button accent='positive' variant='fill' className={styles.shared}>
          Shared
        </Button>
      )}
    </>
  )
}

const signalModalTrigger = (
  enabled,
  label,
  variant = 'fill',
  border = false
) => (
  <Button
    variant={variant}
    border={border}
    disabled={!enabled}
    accent='positive'
    className={cx(styles.newSignal)}
  >
    <Icon type='plus-round' className={styles.newSignal__icon} />
    {label}
  </Button>
)

const NoSignal = () => (
  <EmptySection className={styles.notSignalInfo}>
    Signal doesn't exist
    <br />
    or it's a private signal.
  </EmptySection>
)
