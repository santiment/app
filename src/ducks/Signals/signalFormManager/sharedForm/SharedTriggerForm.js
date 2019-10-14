import React from 'react'
import Button from '@santiment-network/ui/Button'
import { couldShowChart } from '../../utils/utils'
import SignalPreview from '../../chart/SignalPreview'
import SignalCard from '../../../../components/SignalCard/SignalCard'
import styles from './ShareTriggerForm.module.scss'

const SharedTriggerForm = ({ id, trigger, onOpen, onCreate, settings }) => {
  const { target, metric } = settings
  const showChart = target && couldShowChart(settings)

  return (
    <div className={styles.container}>
      <div>
        <SignalCard
          id={id}
          signal={trigger}
          showMoreActions={false}
          className={styles.cardPanel}
        />
      </div>

      {showChart && (
        <div className={styles.preview}>
          <SignalPreview target={target.value} type={metric.value} />
        </div>
      )}

      <div className={styles.actions}>
        <Button onClick={() => onOpen(false)} border>
          Edit signal
        </Button>
        <Button
          onClick={onCreate}
          variant='fill'
          accent='positive'
          className={styles.btnAdd}
        >
          Add signal immediately
        </Button>
      </div>
    </div>
  )
}

export default SharedTriggerForm
