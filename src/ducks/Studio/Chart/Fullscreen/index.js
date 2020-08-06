import React, { useState, useEffect, useRef } from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Header from './Header'
import { useTimeseries } from '../../timeseries/hooks'
import { extractMirrorMetricsDomainGroups } from '../../utils'
import Chart from '../../../Chart'
import { MirroredMetric } from '../../../dataHub/metrics/mirrored'
import {
  useEdgeGaps,
  useClosestValueData,
  useDomainGroups,
  useAxesMetricsKey
} from '../../../Chart/hooks'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../../SANCharts/IntervalSelector'
import { ONE_HOUR_IN_MS } from '../../../../utils/dates'
import FullscreenDialogBtn from '../../../../components/FullscreenDialogBtn'
import styles from './index.module.scss'

const RESIZE_DEPENDENCIES = []

const FullscreenChart = ({
  settings: studioSettings,
  options: studioOptions,
  categories,
  metrics,
  activeEvents,
  brushData,
  MetricColor,
  shareLink
}) => {
  const [settings, setSettings] = useState(studioSettings)
  const [options, setOptions] = useState(studioOptions)
  const [isDomainGroupingActive] = useState()
  const [chartHeight, setChartHeight] = useState()
  const [MetricTransformer, setMetricTransformer] = useState({})
  const [rawData] = useTimeseries(
    metrics,
    settings,
    undefined,
    MetricTransformer
  )
  const [events] = useTimeseries(activeEvents, settings)
  const data = useEdgeGaps(
    useClosestValueData(rawData, metrics, options.isClosestDataActive)
  )
  const domainGroups = useDomainGroups(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics)
  const chartRef = useRef(null)
  const mirrorDomainGroups = extractMirrorMetricsDomainGroups(domainGroups)

  useEffect(
    () => {
      setChartHeight(chartRef.current.canvas.parentNode.clientHeight)
    },
    [chartRef]
  )

  useEffect(
    () => {
      const metricTransformer = Object.assign({}, MetricTransformer)

      metrics.forEach(metric => {
        const mirrorOf = MirroredMetric[metric.key]
        if (mirrorOf) {
          const { key, preTransformer } = metric

          if (metrics.includes(mirrorOf)) {
            metricTransformer[key] = preTransformer
          } else {
            metricTransformer[key] = undefined
          }
        }
      })

      setMetricTransformer(metricTransformer)
    },
    [metrics]
  )

  function changeTimePeriod (fromDate, toDate) {
    const interval = getNewInterval(fromDate, toDate)

    setSettings(state => ({
      ...state,
      interval: INTERVAL_ALIAS[interval] || interval,
      from: fromDate.toISOString(),
      to: toDate.toISOString()
    }))
  }

  function onBrushChangeEnd (startIndex, endIndex) {
    const start = brushData[startIndex]
    const end = brushData[endIndex]
    if (start && end) {
      changeTimePeriod(new Date(start.datetime), new Date(end.datetime))
    }
  }

  function onRangeSelect ({ value: leftDate }, { value: rightDate }) {
    if (leftDate === rightDate) return

    const dates =
      leftDate < rightDate ? [leftDate, rightDate] : [rightDate, leftDate]

    const from = new Date(dates[0])
    const to = new Date(dates[1])

    if (to - from >= ONE_HOUR_IN_MS) {
      changeTimePeriod(from, to)
    }
  }

  return (
    <div className={styles.content}>
      <Header
        className={styles.settings}
        chartRef={chartRef}
        settings={settings}
        options={options}
        shareLink={shareLink}
        showMulti={false}
        activeMetrics={metrics}
        activeEvents={activeEvents}
        data={data}
        events={events}
        setSettings={setSettings}
        setOptions={setOptions}
        changeTimePeriod={changeTimePeriod}
      />
      <Chart
        {...categories}
        {...options}
        {...settings}
        className={styles.chart}
        chartRef={chartRef}
        chartHeight={chartHeight}
        data={data}
        brushData={brushData}
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        onPointHover={undefined}
        syncTooltips={undefined}
        MetricColor={MetricColor}
        metrics={metrics}
        activeEvents={activeEvents}
        domainGroups={
          isDomainGroupingActive ? domainGroups : mirrorDomainGroups
        }
        scale={options.isLogScale ? logScale : linearScale}
        onBrushChangeEnd={onBrushChangeEnd}
        onRangeSelect={onRangeSelect}
        resizeDependencies={RESIZE_DEPENDENCIES}
      />
    </div>
  )
}

export default props => (
  <FullscreenDialogBtn
    title={props.settings.title}
    className={styles.btn}
    iconClassName={styles.icon}
    dialogClasses={styles}
  >
    <FullscreenChart {...props} />
  </FullscreenDialogBtn>
)
