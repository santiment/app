import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import { couldShowChart } from '../../utils/utils'
import SignalPreview from '../../chart/preview/SignalPreview'
import NoSignalPreview from '../../chart/preview/NoSignalPreview'
import { SignalTypeIcon } from '../../../../components/SignalCard/controls/SignalControls'
import { DesktopOnly, MobileOnly } from '../../../../components/Responsive'
import CopySignal from '../../../../components/SignalCard/controls/CopySignal'
import { isStrictTrendingWords } from '../../../../components/SignalCard/card/utils'
import styles from './ShareTriggerForm.module.scss'

const SharedTriggerForm = ({
  trigger,
  onClose,
  settings,
  originalTrigger,
  prepareAlertTitle,
  setIsPreview,
  shouldDisableActions
}) => {
  const { metric, type } = settings

  if (!originalTrigger.id) {
    return null
  }

  const {
    settings: originalSettings,
    settings: { target }
  } = originalTrigger
  const showChart = target && couldShowChart(originalSettings)

  const isUnsupportedTrigger = isStrictTrendingWords(originalSettings)

  if (isUnsupportedTrigger) {
    return (
      <div className={styles.container}>
        <div className={styles.unsupported}>
          This type of alerts is deprecated
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <SignalTypeIcon type={type} metric={metric} />
        <div className={styles.link}>{prepareAlertTitle(trigger.title)}</div>
      </div>
      <div className={styles.backTesting}>
        {showChart ? (
          <>
            <div className={styles.preview}>
              <SignalPreview trigger={trigger} type={metric.value} />
            </div>
            <div className={styles.chartDivider} />
          </>
        ) : (
          <NoSignalPreview />
        )}
      </div>
      <div className={styles.actions}>
        <DesktopOnly>
          <CopySignal
            signal={trigger}
            label='Copy to my alerts'
            onClose={onClose}
            classes={{
              copyBtn: cx(styles.copyBtn, shouldDisableActions && 'c-waterloo')
            }}
            as='div'
            btnParams={{
              variant: 'fill',
              accent: 'positive',
              disabled: shouldDisableActions
            }}
          />
          <Button
            disabled={shouldDisableActions}
            className={styles.btnEdit}
            onClick={() => setIsPreview(false)}
            border
          >
            Open alert
          </Button>
        </DesktopOnly>

        <MobileOnly>
          <CopySignal
            signal={trigger}
            label='Add alert'
            onClose={onClose}
            classes={{
              copyBtn: cx(styles.copyBtn, shouldDisableActions && 'c-waterloo')
            }}
            as='div'
            btnParams={{
              fluid: true,
              accent: 'positive',
              disabled: shouldDisableActions
            }}
          />
          <Button
            disabled={shouldDisableActions}
            fluid
            className={styles.btnEdit}
            onClick={() => setIsPreview(false)}
          >
            Open alert
          </Button>
        </MobileOnly>
      </div>
    </div>
  )
}

export default SharedTriggerForm
