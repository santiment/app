import React, { useState, useEffect, useRef } from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Chart from '../../Chart'
import { useDomainGroups } from '../../Chart/hooks'
import FullscreenDialogBtn from '../../../components/FullscreenDialogBtn'
import { useTimeseries } from '../timeseries/hooks'
import { generateShareLink } from '../url'
import Settings from '../Header/Settings'
import styles from './ChartFullscreenBtn.module.scss'

const RESIZE_DEPENDENCIES = []

const FullscreenChart = ({
  settings: studioSettings,
  options: studioOptions,
  metrics,
  activeEvents,
  ...props
}) => {
  const [settings, setSettings] = useState(studioSettings)
  const [options, setOptions] = useState(studioOptions)
  const [isDomainGroupingActive] = useState()
  const [shareLink, setShareLink] = useState()
  const [data] = useTimeseries(metrics, settings)
  const [events] = useTimeseries(activeEvents, settings)
  const domainGroups = useDomainGroups(metrics)
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
        {...props}
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
        domainGroups={isDomainGroupingActive ? domainGroups : undefined}
        scale={options.isLogScale ? logScale : linearScale}
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
