import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon } from '@santiment-network/ui'
import SignalMaster from '../signalFormManager/SignalMaster'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = ({
  label = 'New signal',
  metaFormSettings,
  canRedirect = true,
  isLoggedIn
}) => (
  <Modal
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
    showDefaultActions={false}
    title='Create signal'
    classes={{ modal: styles.modalCentered }}
  >
    {closeModal => (
      <SignalMaster
        onClose={closeModal}
        canRedirect={canRedirect}
        metaFormSettings={metaFormSettings}
      />
    )}
  </Modal>
)

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default connect(mapStateToProps)(SignalMasterModalForm)
