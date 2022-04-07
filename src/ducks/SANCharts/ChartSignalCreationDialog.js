import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AlertModal from '../Alert/AlertModal'
import styles from './ChartSignalCreationDialog.module.scss'

const ChartSignalCreationDialog = ({ trigger = DefaultSignalCreationTrigger }) => (
<<<<<<< HEAD
  <AlertModal trigger={trigger} prepareAlertTitle={prepareAlertTitle} />
=======
  <AlertModal trigger={trigger} />
>>>>>>> master
)

const DefaultSignalCreationTrigger = (
  <Button variant='flat' className={styles.btn}>
    <Icon type='plus-round' className={styles.icon} /> Signals
  </Button>
)

export default ChartSignalCreationDialog
