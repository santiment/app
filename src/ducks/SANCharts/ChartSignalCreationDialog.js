import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import SignalMasterModalForm from '../Signals/signalModal/SignalMasterModalForm'
import styles from './ChartSignalCreationDialog.module.scss'

const ChartSignalCreationDialog = ({
  slug,
  trigger = DefaultSignalCreationTrigger
}) => (
  <SignalMasterModalForm
    dialogProps={{ passOpenStateAs: 'isActive' }}
    trigger={trigger}
    canRedirect={false}
    metaFormSettings={{
      target: {
        value: {
          value: slug,
          label: slug
        }
      }
    }}
  />
)

const DefaultSignalCreationTrigger = (
  <Button variant='flat' className={styles.btn}>
    <Icon type='plus-round' className={styles.icon} /> Signals
  </Button>
)

export default ChartSignalCreationDialog
