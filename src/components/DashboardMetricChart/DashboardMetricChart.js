import React, { useRef, useCallback, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { useRenderQueueItem } from '../../ducks/renderQueue/viewport'
import { Skeleton } from '../Skeleton'
import {
  useAllTimeData,
  useTimeseries
} from '../../ducks/Studio/timeseries/hooks'
import DashboardChartHeaderWrapper, {
  DashboardIntervals
} from './DashboardChartHeader/DashboardChartHeaderWrapper'
import SharedAxisToggle from '../../ducks/Studio/Chart/SharedAxisToggle'
import { DesktopOnly, MobileOnly } from '../Responsive'
import { updateTooltipSettings } from '../../ducks/dataHub/tooltipSettings'
import { useChartColors } from '../../ducks/Chart/colors'
import { DEFAULT_INTERVAL_SELECTORS, INTERVAL_30_DAYS } from './utils'
import DashboardChartMetrics from './DashboardChartMetrics/DashboardChartMetrics'
import DashboardMetricChartWrapper from './DashboardMetricChartWrapper'
import DashboardMetricSelectors from './DashboardMetricSelectors/DashboardMetricSelectors'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../ducks/SANCharts/IntervalSelector'
import { useMirroredTransformer } from '../../ducks/Studio/Widget/utils'
import { useDomainGroups } from '../../ducks/Chart/hooks'
import { extractMirrorMetricsDomainGroups } from '../../ducks/Chart/utils'
import PaywallInfo from '../../ducks/Studio/Chart/PaywallInfo'
import DexPriceMeasurement from '../../ducks/Dexs/PriceMeasurement/DexPriceMeasurement'
import DashIntervalSettings from './DashIntervalSettings/DashIntervalSettings'
import ContextMenu from '../../ducks/Studio/Chart/ContextMenu'
import { DEFAULT_OPTIONS } from '../../ducks/Studio/defaults'
import styles from './DashboardMetricChart.module.scss'

const OPTIONS = {
  ...DEFAULT_OPTIONS
}

const useBrush = ({ data, settings, setSettings, metrics, slug }) => {
  const [allTimeData, allTimeDataLoadings] = useAllTimeData(metrics, {
    slug
  })

  const onBrushChangeEnd = useCallback(
    (startIndex, endIndex) => {
      const from = new Date(allTimeData[startIndex].datetime)
      const to = new Date(allTimeData[endIndex].datetime)

      const interval = getNewInterval(from, to)

      setSettings({
        ...settings,
        from,
        to,
        interval: INTERVAL_ALIAS[interval] || interval
      })
    },
    [data, setSettings, settings, allTimeData]
  )

  return {
    allTimeData,
    allTimeDataLoadings,
    onBrushChangeEnd
  }
}

export const useChartSettings = defaultInterval => {
  const [settings, setSettings] = useState({
    ...defaultInterval.requestParams
  })

  const [intervalSelector, setIntervalSelector] = useState(defaultInterval)

  const onChangeInterval = useCallback(
    value => {
      setSettings(data => {
        return { ...data, ...value.requestParams }
      })
      setIntervalSelector(value)
    },
    [setSettings, setIntervalSelector]
  )

  return { settings, intervalSelector, setSettings, onChangeInterval }
}

const DashboardMetricChart = ({
  metrics,
  defaultInterval = INTERVAL_30_DAYS,
  intervals = DEFAULT_INTERVAL_SELECTORS,
  metricSelectors,
  setRootMetric,
  rootMetric,
  metricsColor,
  setMeasurement,
  measurement,
  sliceMetricsCount = 1,
  onLoad,
  projectSelector
}) => {
  const MetricTransformer = useMirroredTransformer(metrics)
  const [MetricSettingsMap] = useState(new Map())
  const [options, setOptions] = useState(OPTIONS)
  const chartRef = useRef(null)
  const domainGroups = useDomainGroups(metrics)
  const mirrorDomainGroups = useMemo(
    () => extractMirrorMetricsDomainGroups(domainGroups),
    [domainGroups]
  )

  useEffect(
    () => {
      updateTooltipSettings(metrics)
    },
    [metrics]
  )

  const {
    intervalSelector,
    settings,
    setSettings,
    onChangeInterval
  } = useChartSettings(defaultInterval)

  function updateSettingsMap ({ interval } = {}) {
    setSettings({
      ...settings,
      interval: interval || settings.interval
    })
  }

  const [disabledMetrics, setDisabledMetrics] = useState({})

  const activeMetrics = useMemo(
    () => metrics.filter(({ key }) => !disabledMetrics[key]),
    [metrics, disabledMetrics]
  )

  const [data, loadings] = useTimeseries(
    activeMetrics,
    settings,
    MetricSettingsMap,
    MetricTransformer
  )

  const { allTimeData, allTimeDataLoadings, onBrushChangeEnd } = useBrush({
    settings,
    setSettings,
    data,
    metrics,
    slug: metrics[0].reqMeta.slug
  })

  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(
    domainGroups && domainGroups.length > mirrorDomainGroups.length
  )

  const MetricColor = useChartColors(activeMetrics, metricsColor)

  useEffect(
    () => {
      if (onLoad && allTimeDataLoadings.length === 0 && loadings.length === 0) {
        onLoad()
      }
    },
    [loadings, allTimeDataLoadings]
  )

  return (
    <>
      <DashboardChartHeaderWrapper>
        {projectSelector}

        <DashboardMetricSelectors
          metricSelectors={metricSelectors}
          rootMetric={rootMetric}
          setRootMetric={setRootMetric}
        />

        {setMeasurement && (
          <DexPriceMeasurement
            onSelect={setMeasurement}
            defaultSelected={measurement}
            className={styles.measurements}
          />
        )}

        <div className={styles.right}>
          {domainGroups && domainGroups.length > mirrorDomainGroups.length && (
            <SharedAxisToggle
              isDomainGroupingActive={isDomainGroupingActive}
              setIsDomainGroupingActive={setIsDomainGroupingActive}
              className={styles.sharedAxisToggle}
            />
          )}

          <div className={styles.gaps}>
            <PaywallInfo metrics={activeMetrics} />
          </div>

          <DesktopOnly>
            <DashboardIntervals
              interval={intervalSelector}
              setInterval={onChangeInterval}
              intervals={intervals}
            />
          </DesktopOnly>

          <ContextMenu
            showDownload
            setOptions={setOptions}
            {...options}
            data={data}
            activeMetrics={activeMetrics}
            chartRef={chartRef}
          />
        </div>
      </DashboardChartHeaderWrapper>

      <DesktopOnly>
        <div className={styles.settings}>
          <DashboardChartMetrics
            metrics={metrics}
            loadings={loadings}
            toggleDisabled={setDisabledMetrics}
            disabledMetrics={disabledMetrics}
            colors={MetricColor}
          />
          <DashIntervalSettings
            metrics={metrics}
            settings={settings}
            updateInterval={updateSettingsMap}
          />
        </div>
      </DesktopOnly>

      <DashboardMetricChartWrapper
        metrics={activeMetrics}
        data={data}
        allTimeData={allTimeData}
        onBrushChangeEnd={onBrushChangeEnd}
        settings={settings}
        MetricColor={MetricColor}
        isDomainGroupingActive={isDomainGroupingActive}
        loadings={loadings}
        domainGroups={domainGroups}
        mirrorDomainGroups={mirrorDomainGroups}
        sliceMetricsCount={sliceMetricsCount}
        options={options}
        chartRef={chartRef}
      />

      <MobileOnly>
        <DashboardIntervals
          interval={intervalSelector}
          setInterval={onChangeInterval}
          intervals={intervals}
        />
        <DashIntervalSettings
          metrics={metrics}
          settings={settings}
          updateInterval={updateSettingsMap}
        />
        <DashboardChartMetrics
          metrics={metrics}
          loadings={loadings}
          toggleDisabled={setDisabledMetrics}
          disabledMetrics={disabledMetrics}
          colors={MetricColor}
        />
      </MobileOnly>
    </>
  )
}

export const QueuedDashboardMetricChart = ({ className, ...props }) => {
  const containerRef = useRef()
  const { isRendered, onLoad } = useRenderQueueItem(containerRef)

  return (
    <div ref={containerRef} className={cx(styles.container, className)}>
      {isRendered && <DashboardMetricChart {...props} onLoad={onLoad} />}
      <Skeleton show={!isRendered} className={styles.skeleton} />
    </div>
  )
}

export default ({ className, ...props }) => (
  <div className={cx(styles.container, className)}>
    <DashboardMetricChart {...props} />
  </div>
)
