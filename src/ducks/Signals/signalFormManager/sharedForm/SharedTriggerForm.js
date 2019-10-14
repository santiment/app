import React from 'react'
import Button from '@santiment-network/ui/Button'
import { couldShowChart } from '../../utils/utils'
import { mapFormSettings } from '../signalCrudForm/signal/TriggerForm'
import SignalPreview from '../../chart/SignalPreview'
import { SignalTypeIcon } from '../../../../components/SignalCard/controls/SignalControls'
import styles from './ShareTriggerForm.module.scss'

const SharedTriggerForm = ({
  trigger,
  onOpen,
  onCreate,
  settings: oldSettings,
  metaFormSettings: oldMetaFormSettings
}) => {
  const [settings, metaFormSettings] = mapFormSettings(
    oldSettings,
    oldMetaFormSettings
  )

  const { target, metric, title } = settings
  const showChart = target && couldShowChart(settings)

  const {
    settings: { type }
  } = trigger

  return (
    <div className={styles.container}>
      <div>
        <SignalTypeIcon type={type} />
        {title}
      </div>

      {showChart && (
        <div className={styles.preview}>
          <SignalPreview target={target.value} type={metric.value} />
        </div>
      )}

      <div className={styles.actions}>
        <Button onClick={onOpen}>Edit signal</Button>
        <Button onClick={onCreate}>Add signal immediately</Button>
      </div>
    </div>
  )
}

export default SharedTriggerForm
