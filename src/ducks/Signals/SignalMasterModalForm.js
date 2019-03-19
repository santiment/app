import React, { Component } from 'react'
import { Modal, Button, Icon } from '@santiment-network/ui'
import SignalMaster from './SignalMaster'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = () => (
  <Modal
    trigger={
      <Button className={styles.newSignal}>
        <Icon type='plus-round' className={styles.newSignal__icon} />
        New signal
      </Button>
    }
    showDefaultActions={false}
    title='Create signal'
  >
    {({ closeModal }) => <SignalMaster onCreated={closeModal} />}
  </Modal>
)

export default SignalMasterModalForm
