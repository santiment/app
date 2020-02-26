import React, { useState, useEffect, useRef } from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Chart from '../../SANCharts/Chart'
import FullscreenDialogBtn from '../../../components/FullscreenDialogBtn'
import { useTimeseries } from '../timeseries/hooks'
import { generateShareLink } from '../url'
import Settings from '../Settings'
import styles from './ChartFullscreenBtn.module.scss'

const FullscreenChart = ({
  settings: studioSettings,
  options: studioOptions,
  metrics,
  activeEvents,
  ...props
}) => {
  const [settings, setSettings] = useState(studioSettings)
  const [options, setOptions] = useState(studioOptions)
  const [shareLink, setShareLink] = useState()
  const [data] = useTimeseries(metrics, settings)
  const [events] = useTimeseries(activeEvents, settings)
  const chartRef = useRef(null)

  useEffect(
    () => {
      const queryString =
        '?' + generateShareLink(settings, options, metrics, activeEvents)

      const { origin, pathname } = window.location
      setShareLink(origin + pathname + queryString)
    },
    [settings, options]
  )

  return (
    <div className={styles.content}>
      <Settings
        noTitle
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
      />
      <Chart
        {...options}
        {...settings}
        {...props}
        chartRef={chartRef}
        data={data}
        onPointHover={undefined}
        syncTooltips={undefined}
        isMultiChartsActive={false}
        metrics={metrics}
        activeEvents={activeEvents}
        scale={options.isLogScale ? logScale : linearScale}
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
