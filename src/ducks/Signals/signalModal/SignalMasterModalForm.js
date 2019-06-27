import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Dialog } from '@santiment-network/ui'
import SignalMaster from '../signalFormManager/signalMaster/SignalMaster'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import { push } from 'react-router-redux'
import { SIGNAL_ROUTES } from '../common/constants'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = ({
  label = 'New signal',
  metaFormSettings,
  canRedirect = true,
  triggerId,
  isLoggedIn,
  redirect,
  enabled = true,
  match
}) => {
  if (!triggerId && match) {
    triggerId = match.params.id
  }

  const hasTrigger = +triggerId > 0

  const [dialogOpenState, setDialogOpenState] = useState(hasTrigger)
  const [dialogTitle, onSetDialogTitle] = useState('')

  useEffect(
    data => {
      setDialogOpenState(hasTrigger)
    },
    [triggerId]
  )

  const onClose = () => {
    setDialogOpenState(false)

    if (hasTrigger) {
      redirect()
    }
  }

  return (
    <Dialog
      open={dialogOpenState}
      onOpen={() => {
        setDialogOpenState(true)
      }}
      onClose={onClose}
      trigger={signalModalTrigger(isLoggedIn, label)}
      title={dialogTitle}
    >
      <Dialog.ScrollContent className={styles.TriggerPanel}>
        <SignalMaster
          triggerId={triggerId}
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

const signalModalTrigger = (isLoggedIn, label) => (
  <Button
    variant='fill'
    accent='positive'
    disabled={!isLoggedIn}
    className={styles.newSignal}
  >
    <Icon type='plus-round' className={styles.newSignal__icon} />
    {label}
  </Button>
)
