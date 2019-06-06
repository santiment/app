import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon } from '@santiment-network/ui'
import SignalMaster from './SignalMaster'
import { checkIsLoggedIn } from './../../pages/UserSelectors'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = ({
  label = 'New signal',
  metaFormSettings,
  asset,
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
  >
    {closeModal => (
      <SignalMaster
        onCreated={closeModal}
        canRedirect={canRedirect}
        asset={asset}
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
