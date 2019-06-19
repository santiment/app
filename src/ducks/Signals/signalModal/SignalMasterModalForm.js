import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Dialog } from '@santiment-network/ui'
import SignalMaster from '../signalFormManager/SignalMaster'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import { push } from 'react-router-redux'
import { SIGNAL_ROUTES } from '../common/constants'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = ({
  label = 'New signal',
  metaFormSettings,
  canRedirect = true,
  redirectEnabled = false,
  isLoggedIn,
  redirect,
  enabled = true,
  match
}) => {
  const [dialogOpenState, setDialogOpenState] = useState(redirectEnabled)
  const [dialogTitle, onSetDialogTitle] = useState('')

  const onClose = () => {
    if (redirectEnabled) {
      redirect()
    } else {
      setDialogOpenState(false)
    }
  }

  return (
    <Dialog
      open={dialogOpenState}
      onClose={onClose}
      onOpen={() => setDialogOpenState(true)}
      trigger={signalModalTrigger(isLoggedIn, label, enabled, !redirectEnabled)}
      title={dialogTitle}
    >
      <Dialog.ScrollContent className={styles.TriggerPanel}>
        <SignalMaster
          triggerId={match ? match.params.id : undefined}
          setTitle={onSetDialogTitle}
          onClose={() => setDialogOpenState(false)}
          canRedirect={canRedirect}
          metaFormSettings={metaFormSettings}
        />
      </Dialog.ScrollContent>
    </Dialog>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

const mapDispatchToProps = dispatch => ({
  redirect: () => {
    dispatch(push(SIGNAL_ROUTES.MY_SIGNALS))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalMasterModalForm)

const signalModalTrigger = (isLoggedIn, label, enabled, canShow) =>
  !canShow ? (
    <div />
  ) : (
    <Button
      variant='fill'
      accent='positive'
      disabled={!isLoggedIn || !enabled}
      className={styles.newSignal}
    >
      <Icon type='plus-round' className={styles.newSignal__icon} />
      {label}
    </Button>
  )
