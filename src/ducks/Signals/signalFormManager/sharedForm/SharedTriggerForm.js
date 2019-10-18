import React, { useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import { couldShowChart, mapFormPropsToTrigger } from '../../utils/utils'
import SignalPreview from '../../chart/SignalPreview'
import SignalCard from '../../../../components/SignalCard/SignalCard'
import NoSignalPreview from '../../chart/NoSignalPreview'
import styles from './ShareTriggerForm.module.scss'
import { fetchHistorySignalPoints } from '../../common/actions'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { DesktopOnly, MobileOnly } from '../../../../components/Responsive'

const SharedTriggerForm = ({
  id,
  trigger,
  onOpen,
  onCreate,
  settings,
  getSignalBacktestingPoints
}) => {
  const { target, metric } = settings
  const showChart = target && couldShowChart(settings)

  useEffect(
    () => {
      couldShowChart(settings) && getSignalBacktestingPoints(settings)
    },
    [settings]
  )

  return (
    <div className={styles.container}>
      <SignalCard
        id={id}
        signal={trigger}
        showMoreActions={false}
        className={styles.cardPanel}
        showStatus={false}
        isMobileVersion={true}
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
            Copy signal
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
            Copy signal
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

const mapDispatchToProps = dispatch => ({
  getSignalBacktestingPoints: payload => {
    dispatch(fetchHistorySignalPoints(mapFormPropsToTrigger(payload)))
  }
})

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  )
)

export default enhance(SharedTriggerForm)
