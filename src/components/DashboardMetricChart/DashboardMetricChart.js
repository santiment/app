import React, { useCallback, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
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
import { INTERVAL_30_DAYS } from './utils'
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
import styles from './DashboardMetricChart.module.scss'

const useBrush = ({ data, settings, setSettings, metrics, slug }) => {
  const allTimeData = useAllTimeData(metrics, {
    slug: slug
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
    onBrushChangeEnd
  }
}

/*
const useChartTimeseries = (settings, metrics, rootMetric) => {
  const [data, loadings] = useTimeseries(
    metrics,
    // HACK: Since the metric's hash doesn't change (done on purpose), forcing useTimseries to refetch data with new queryKey
    // This allows us to compute chart colors and tooltip info only at the app start. [@vanguard | Sep 8, 2020]
    useMemo(() => ({ ...settings }), [settings, rootMetric])
  )

  return {
    data,
    loadings,
    rootMetric
  }
}
*/

const DashboardMetricChart = ({
  className,
  metrics,
  metricSettingsMap,
  defaultInterval = INTERVAL_30_DAYS,
  intervals,
  metricSelectors,
  setRootMetric,
  rootMetric,
  metricsColor,
  setMeasurement,
  measurement
}) => {
  const MetricTransformer = useMirroredTransformer(metrics)

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

  const [settings, setSettings] = useState({
    ...defaultInterval.requestParams
  })
  const [intervalSelector, setIntervalSelector] = useState(defaultInterval)
  const [disabledMetrics, setDisabledMetrics] = useState({})

  const onChangeInterval = useCallback(
    value => {
      setSettings(data => {
        return { ...data, ...value.requestParams }
      })
      setIntervalSelector(value)
    },
    [setSettings, setIntervalSelector]
  )

  const activeMetrics = useMemo(
    () => metrics.filter(({ key }) => !disabledMetrics[key]),
    [metrics, disabledMetrics]
  )

  const [data, loadings] = useTimeseries(
    activeMetrics,
    settings,
    metricSettingsMap,
    MetricTransformer
  )

  const { allTimeData, onBrushChangeEnd } = useBrush({
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

  return (
    <div className={cx(styles.container, className)}>
      <DashboardChartHeaderWrapper>
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
        </div>
      </DashboardChartHeaderWrapper>

      <DesktopOnly>
        <DashboardChartMetrics
          metrics={metrics}
          loadings={loadings}
          toggleDisabled={setDisabledMetrics}
          disabledMetrics={disabledMetrics}
          colors={MetricColor}
        />
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
        isCartesianGridActive={true}
      />

      <MobileOnly>
        <DashboardIntervals
          interval={intervalSelector}
          setInterval={onChangeInterval}
          intervals={intervals}
        />
        <DashboardChartMetrics
          metrics={metrics}
          loadings={loadings}
          toggleDisabled={setDisabledMetrics}
          disabledMetrics={disabledMetrics}
          colors={MetricColor}
        />
      </MobileOnly>
    </div>
  )
}

export default DashboardMetricChart
