import React from 'react'
import { Modal, Button, Icon } from '@santiment-network/ui'
import SignalMaster from './SignalMaster'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = ({ label = 'New signal' }) => (
  <Modal
    trigger={
      <Button className={styles.newSignal}>
        <Icon type='plus-round' className={styles.newSignal__icon} />
        {label}
      </Button>
    }
    showDefaultActions={false}
    title='Create signal'
  >
    {({ closeModal }) => <SignalMaster onCreated={closeModal} />}
  </Modal>
)

export default SignalMasterModalForm
