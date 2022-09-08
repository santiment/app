import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { SignalTypeIcon } from '../../../../components/SignalCard/controls/SignalControls'
import SignalPreviewChart from '../../../Signals/chart/preview/SignalPreviewChart'
import StatusLabel from '../../../../components/StatusLabel'
import AlertChannelsTooltip from '../AlertChannelsTooltip/AlertChannelsTooltip'
import Share from './Share/Share'
import { prepareAlertTitle } from '../../../Signals/link/utils'
import { useHistoricalTriggerPoints } from '../../hooks/useHistoricalTriggerPoints'
import { filterPoints } from '../AlertPreview/AlertPreview'
import { useSignal } from '../../hooks/useSignal'
import externalStyles from '../../../../ducks/Signals/link/OpenSignalLink.module.scss'
import styles from './AlertMobilePreview.module.scss'
import PageLoader from '../../../../components/Loader/PageLoader'

const Chart = ({ signalData }) => {
  const { settings: { type, target: { slug } = {}, target, selector } = {} } = signalData

  const shouldRenderChart = type === 'wallet_movement' ? selector.slug : slug

  const {
    data: { historicalTriggerPoints: points = [] } = {},
    error,
    loading,
  } = useHistoricalTriggerPoints({
    ...signalData,
    skip: !shouldRenderChart,
  })

  let chart = null

  if (!loading && !error && shouldRenderChart) {
    chart = (
      <SignalPreviewChart
        type={type}
        points={filterPoints(points, signalData)}
        showTitle
        target={target}
        trigger={signalData}
        hideTooltip
      />
    )
  }

  return chart && <div className={styles.chart}>{chart}</div>
}

const AlertMobilePreview = ({ id, signal, isRecommendedSignal, isAuthor = false }) => {
  const [signalData, setSignalData] = useState(signal)
  const { data, loading: loadingSignalData } = useSignal({
    id,
    skip: !id || signal,
  })

  useEffect(() => {
    if (data) {
      setSignalData(data.trigger.trigger)
    }
  }, [loadingSignalData])

  if (loadingSignalData || !signalData) {
    return <PageLoader />
  }

  const { isFrozen, settings: { type, metric } = {}, title, isPublic } = signalData

  return (
    <div className={styles.wrapper}>
      <div className='row'>
        <SignalTypeIcon type={type} metric={metric} isFrozen={isFrozen} />
        <div className='column mrg-m mrg--l'>
          <div className={cx(externalStyles.link, styles.link)}>
            {prepareAlertTitle(title, isFrozen)}
          </div>
          {!isRecommendedSignal && (
            <div className='row v-center mrg-m mrg--t mrg--b'>
              <StatusLabel isPublic={isPublic} isFrozen={isFrozen} isPreview />
              {signalData && signalData.settings && signalData.settings.channel && (
                <AlertChannelsTooltip signal={signalData} isPreview />
              )}
            </div>
          )}
        </div>
      </div>
      <Chart signalData={signalData} />
      <div className='mrg-m mrg--t'>
        <Share signal={signalData} isAuthor={isAuthor} />
      </div>
    </div>
  )
}

export default AlertMobilePreview
