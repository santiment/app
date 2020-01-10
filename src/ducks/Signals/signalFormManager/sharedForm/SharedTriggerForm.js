import React from 'react'
import Button from '@santiment-network/ui/Button'
import { couldShowChart } from '../../utils/utils'
import SignalPreview from '../../chart/SignalPreview'
import SignalCard from '../../../../components/SignalCard/card/SignalCard'
import NoSignalPreview from '../../chart/NoSignalPreview'
import { DesktopOnly, MobileOnly } from '../../../../components/Responsive'
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
        isSharedTriggerForm={true}
      />

      <div className={styles.backTesting}>
        {showChart ? (
          <>
            <div className={styles.chartDivider} />
            <div className={styles.preview}>
              <SignalPreview target={target.value} type={metric.value} />
            </div>
          </>
        ) : (
          <NoSignalPreview />
        )}
      </div>

      <div className={styles.actions}>
        <DesktopOnly>
          <Button
            onClick={onCreate}
            variant='fill'
            accent='positive'
            className={styles.btnAdd}
          >
            Add signal
          </Button>
          <Button
            className={styles.btnEdit}
            onClick={() => onOpen(false)}
            border
          >
            Edit signal
          </Button>
        </DesktopOnly>

        <MobileOnly>
          <Button
            fluid
            onClick={onCreate}
            accent='positive'
            className={styles.btnAdd}
          >
            Add signal
          </Button>
          <Button
            fluid
            className={styles.btnEdit}
            onClick={() => onOpen(false)}
          >
            Edit signal
          </Button>
        </MobileOnly>
      </div>
    </div>
  )
}

export default SharedTriggerForm
