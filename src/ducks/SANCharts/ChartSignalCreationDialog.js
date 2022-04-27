import React from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AlertModal from '../Alert/AlertModal'
import { ALERT_TYPES } from '../Alert/constants'
import styles from './ChartSignalCreationDialog.module.scss'

const DEFAULT_SIGNAL = {
  cooldown: '1d',
  description: '',
  iconUrl: '',
  isActive: true,
  isPublic: false,
  isRepeating: true,
  tags: [],
  title: '',
  settings: {
    type: 'metric_signal',
    metric: '',
    target: { slug: '' },
    channel: [],
    time_window: '',
    operation: {},
  },
}

const ChartSignalCreationDialog = ({ trigger = DefaultSignalCreationTrigger, slug }) => (
  <AlertModal
    defaultType={ALERT_TYPES[0]}
    signalData={{
      ...DEFAULT_SIGNAL,
      settings: {
        ...DEFAULT_SIGNAL.settings,
        target: {
          slug,
        },
      },
    }}
    trigger={trigger}
  />
)

const DefaultSignalCreationTrigger = (
  <Button variant='flat' className={styles.btn}>
    <Icon type='plus-round' className={styles.icon} /> Signals
  </Button>
)

export default ChartSignalCreationDialog
