import React, { useCallback, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import {
  useAllTimeData,
  useTimeseries
} from '../../ducks/Studio/timeseries/hooks'
import DashboardChartHeader, {
  DashboardIntervals
} from './DashboardChartHeader/DashboardChartHeader'
import SharedAxisToggle from '../../ducks/Studio/Chart/SharedAxisToggle'
import { DesktopOnly, MobileOnly } from '../Responsive'
import { updateTooltipSettings } from '../../ducks/dataHub/tooltipSettings'
import { useChartColors } from '../../ducks/Chart/colors'
import { INTERVAL_30_DAYS } from './utils'
import DashboardChartMetrics from './DashboardChartMetrics/DashboardChartMetrics'
import DashboardMetricChartWrapper from './DashboardMetricChartWrapper'
import DashboardMetricSelectors from './DashboardMetricSelectors/DashboardMetricSelectors'
import styles from './DashboardMetricChart.module.scss'

const useBrush = ({ data, settings, setSettings, metrics, slug }) => {
  const allTimeData = useAllTimeData(metrics, {
    slug: slug
  })

  const onBrushChangeEnd = useCallback(
    (startIndex, endIndex) => {
      const from = new Date(allTimeData[startIndex].datetime)
      const to = new Date(allTimeData[endIndex].datetime)

      setSettings({ ...settings, from, to })
    },
    [data, setSettings, settings, allTimeData]
  )

  return {
    allTimeData,
    onBrushChangeEnd
  }
}

const DashboardMetricChart = ({
  className,
  metrics,
  metricSettingsMap,
  defaultInterval = INTERVAL_30_DAYS,
  intervals,
  metricSelectors,
  setRootMetric,
  rootMetric
}) => {
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
    metricSettingsMap
  )

  const { allTimeData, onBrushChangeEnd } = useBrush({
    settings,
    setSettings,
    data,
    metrics,
    slug: metrics[0].reqMeta.slug
  })

  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(true)

  const MetricColor = useChartColors(activeMetrics)

  return (
    <div className={cx(styles.container, className)}>
      <DashboardChartHeader>
        <DashboardMetricSelectors
          metricSelectors={metricSelectors}
          rootMetric={rootMetric}
          setRootMetric={setRootMetric}
        />

        <SharedAxisToggle
          isDomainGroupingActive={isDomainGroupingActive}
          setIsDomainGroupingActive={setIsDomainGroupingActive}
          className={styles.sharedAxisToggle}
        />
        <DesktopOnly>
          <DashboardIntervals
            interval={intervalSelector}
            setInterval={onChangeInterval}
            intervals={intervals}
          />
        </DesktopOnly>
      </DashboardChartHeader>

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
