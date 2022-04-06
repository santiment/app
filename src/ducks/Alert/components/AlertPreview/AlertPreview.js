import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import NoSignalPreview from '../../../Signals/chart/preview/NoSignalPreview'
import CopySignal from '../../../../components/SignalCard/controls/CopySignal'
import EmptySection from '../../../../components/EmptySection/EmptySection'
import { SignalTypeIcon } from '../../../../components/SignalCard/controls/SignalControls'
import SignalPreviewChart from '../../../Signals/chart/preview/SignalPreviewChart'
import PageLoader from '../../../../components/Loader/PageLoader'
import { prepareAlertTitle } from '../../../Signals/link/utils'
import { isUnsupportedTrigger } from './utils'
import { useHistoricalTriggerPoints } from '../../hooks/useHistoricalTriggerPoints'
import alertMasterFormStyles from '../../AlertModalFormMaster.module.scss'
import styles from './AlertPreview.module.scss'

const filterPoints = (points, { settings: { metric } = {} }) => {
  switch (metric) {
    case 'mvrv_usd_intraday': {
      const last = points[points.length - 1]

      if (last && last.current !== 0) {
        return points
      }

      return points.slice(0, points.length - 1)
    }
    default: {
      return points
    }
  }
}

const AlertPreview = ({
  setIsPreview,
  signal,
  handleCloseDialog,
  shouldDisableActions,
}) => {
  const {
    id,
    title,
    settings: {
      target: { slug },
      target,
      selector
    },
    settings
  } = signal

  const currentSlug = settings.type === 'wallet_movement' ? selector.slug : slug
  const shouldRenderChart = currentSlug && typeof currentSlug === 'string'
  const isUnsupported = isUnsupportedTrigger(signal)
  const {
    data: { historicalTriggerPoints: points = [] } = {},
    error,
    loading
  } = useHistoricalTriggerPoints({
    ...signal,
    skip: !shouldRenderChart
  })

  let children = null
  let chart = <NoSignalPreview className={styles.noChart} />

  if (!loading && !error && shouldRenderChart) {
    chart = (
      <SignalPreviewChart
        type={settings.type}
        points={filterPoints(points, signal)}
        showExpand
        showTitle
        target={target}
        trigger={signal}
      />
    )
  }

  if (loading) {
    chart = (
      <PageLoader containerClass='row hv-center' className={styles.loader} />
    )
  }

  if (settings && settings.type) {
    const { type, metric } = settings

    children = (
      <>
        <div className='row mrg--b mrg-xl'>
          <SignalTypeIcon type={type} metric={metric} />
          <div className='btn c-black body-1 mrg--l mrg-l'>
            {prepareAlertTitle(title)}
          </div>
        </div>
        <div
          className={cx(
            styles.chartWrapper,
            'row h-center mrg--b mrg-xl',
            !shouldRenderChart && !loading && styles.noChartWrapper
          )}
        >
          {chart}
        </div>
        <div className={cx(styles.divider, 'mrg--b mrg-xl')} />
        <div className='row'>
          <CopySignal
            signal={signal}
            label='Copy to my alerts'
            onClose={handleCloseDialog}
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
            onClick={() => setIsPreview(false)}
            border
          >
            Open alert
          </Button>
        </div>
      </>
    )
  }

  if (!id) {
    children = (
      <EmptySection
        className={cx(
          alertMasterFormStyles.notSignalInfo,
          'column hv-center body-3'
        )}
      >
        Alert doesn't exist
        <br />
        or it's a private alert.
      </EmptySection>
    )
  }

  if (isUnsupported) {
    return (
      <EmptySection
        className={cx(
          alertMasterFormStyles.notSignalInfo,
          'column hv-center body-3'
        )}
      >
        This type of alerts is deprecated.
      </EmptySection>
    )
  }

  return <div className={cx(styles.wrapper, 'column')}>{children}</div>
}

export default AlertPreview
