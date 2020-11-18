import React, { useState, useEffect, useRef } from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Header from './Header'
import ChartCanvas from '../Canvas'
import { useTimeseries } from '../../timeseries/hooks'
import { extractMirrorMetricsDomainGroups } from '../../../Chart/utils'
import { MirroredMetric } from '../../../dataHub/metrics/mirrored'
import {
  useEdgeGaps,
  useClosestValueData,
  useDomainGroups
} from '../../../Chart/hooks'
import {
  getNewInterval,
  INTERVAL_ALIAS
} from '../../../SANCharts/IntervalSelector'
import { ONE_HOUR_IN_MS } from '../../../../utils/dates'
import FullscreenDialogBtn from '../../../../components/FullscreenDialogBtn'
import styles from './index.module.scss'

const EMPTY_ARRAY = []

const FullscreenChart = ({
  widget,
  settings: studioSettings,
  options: studioOptions,
  categories,
  metrics,
  brushData,
  MetricColor,
  shareLink,
  setIsICOPriceDisabled
}) => {
  const [settings, setSettings] = useState(studioSettings)
  const [options, setOptions] = useState(studioOptions)
  const [isDomainGroupingActive] = useState()
  const [MetricTransformer, setMetricTransformer] = useState({})
  const [rawData] = useTimeseries(
    metrics,
    settings,
    widget.MetricSettingMap,
    MetricTransformer
  )
  const data = useEdgeGaps(
    useClosestValueData(rawData, metrics, options.isClosestDataActive)
  )
  const domainGroups = useDomainGroups(metrics)
  const chartRef = useRef(null)
  const mirrorDomainGroups = extractMirrorMetricsDomainGroups(domainGroups)

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
        activeEvents={EMPTY_ARRAY}
        data={data}
        setSettings={setSettings}
        setOptions={setOptions}
        changeTimePeriod={changeTimePeriod}
      />
      <ChartCanvas
        className={styles.chart}
        options={options}
        settings={settings}
        categories={categories}
        chartRef={chartRef}
        scale={options.isLogScale ? logScale : linearScale}
        colors={MetricColor}
        metrics={metrics}
        data={data}
        brushData={brushData}
        domainGroups={
          isDomainGroupingActive ? domainGroups : mirrorDomainGroups
        }
        onPointHover={undefined}
        onBrushChangeEnd={onBrushChangeEnd}
        onRangeSelect={onRangeSelect}
        setIsICOPriceDisabled={setIsICOPriceDisabled}
        syncTooltips={undefined}
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
