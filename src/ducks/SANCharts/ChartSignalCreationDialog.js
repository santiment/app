import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import SignalMasterModalForm from '../Signals/signalModal/SignalMasterModalForm'
import styles from './ChartSignalCreationDialog.module.scss'

const ChartSignalCreationDialog = ({ slug, trigger }) => (
  <SignalMasterModalForm
    dialogProps={{ passOpenStateAs: 'isActive' }}
    trigger={
      trigger || (
        <Button variant='flat' className={styles.btn}>
          <Icon type='plus-round' className={styles.icon} /> Signals
        </Button>
      )
    }
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

export default ChartSignalCreationDialog
