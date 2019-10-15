import React from 'react'
import Button from '@santiment-network/ui/Button'
import { couldShowChart } from '../../utils/utils'
import SignalPreview from '../../chart/SignalPreview'
import SignalCard from '../../../../components/SignalCard/SignalCard'
import NoSignalPreview from '../../chart/NoSignalPreview'
import styles from './ShareTriggerForm.module.scss'

const SharedTriggerForm = ({ id, trigger, onOpen, onCreate, settings }) => {
  const { target, metric } = settings
  const showChart = target && couldShowChart(settings)

  return (
    <div className={styles.container}>
      <SignalCard
        id={id}
        signal={trigger}
        showMoreActions={false}
        className={styles.cardPanel}
        showStatus={false}
      />

      <div className={styles.preview}>
        {showChart ? (
          <SignalPreview target={target.value} type={metric.value} />
        ) : (
          <NoSignalPreview />
        )}
      </div>

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
