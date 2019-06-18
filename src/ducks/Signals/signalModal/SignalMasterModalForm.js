import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from '@santiment-network/ui'
import Dialog from '@santiment-network/ui/Dialog'
import SignalMaster from '../signalFormManager/SignalMaster'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = ({
  label = 'New signal',
  metaFormSettings,
  canRedirect = true,
  isLoggedIn
}) => {
  const [dialogOpenState, setDialogOpenState] = useState(false)
  const [dialogTitle, onSetDialogTitle] = useState('')

  return (
    <Dialog
      open={dialogOpenState}
      onClose={() => setDialogOpenState(false)}
      onOpen={() => setDialogOpenState(true)}
      trigger={
        <Button
          variant='fill'
          accent='positive'
          disabled={!isLoggedIn}
          className={styles.newSignal}
        >
          <Icon type='plus-round' className={styles.newSignal__icon} />
          {label}
        </Button>
      }
      title={dialogTitle}
    >
      <Dialog.ScrollContent className={styles.TriggerPanel}>
        <SignalMaster
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

export default connect(mapStateToProps)(SignalMasterModalForm)
