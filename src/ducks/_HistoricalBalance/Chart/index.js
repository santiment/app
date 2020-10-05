import React from 'react'
import Selector from '@santiment-network/ui/Selector/Selector'
import CreateAlert from './CreateAlert'
import SettingsMenu from './SettingsMenu'
import { useWalletMetrics } from '../hooks'
import SANChart from '../../Chart'
import { useChartColors } from '../../Chart/colors'
import { useClosestValueData, useAxesMetricsKey } from '../../Chart/hooks'
import { useMetricCategories } from '../../Chart/Synchronizer'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import AdvancedCalendar from '../../../components/AdvancedCalendar'
import styles from './index.module.scss'

const TIMERANGES = ['1D', '1W', '1M', '3M', '6M', 'All']
const chartPadding = {
  top: 25,
  bottom: 25,
  right: 45,
  left: 15,
}

const FROM = new Date()
const TO = new Date()

const Timeranges = () => (
  <Selector
    className={styles.timeranges}
    options={TIMERANGES}
    // onSelectOption={onTimerangeChange}
    // defaultSelected={defaultTimerange}
  />
)

const Chart = ({ isDesktop, chartAssets, settings }) => {
  const metrics = useWalletMetrics(chartAssets)
  const [rawData] = useTimeseries(metrics, settings)
  const data = useClosestValueData(rawData, metrics)
  const categories = useMetricCategories(metrics)
  const MetricColor = useChartColors(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CreateAlert></CreateAlert>
        <Timeranges></Timeranges>
        {isDesktop && (
          <AdvancedCalendar
            className={styles.calendar}
            from={FROM}
            to={TO}
            // timeRange={defaultTimerange}
            // onCalendarChange={onCalendarChange}
            // onTimerangeChange={onTimerangeChange}
          />
        )}
        <SettingsMenu></SettingsMenu>
      </div>
      <div className={styles.chart}>
        <SANChart
          {...categories}
          className={styles.canvas}
          hideBrush
          hideWatermark
          data={data}
          MetricColor={MetricColor}
          chartPadding={chartPadding}
          tooltipKey={axesMetricKeys[0]}
          axesMetricKeys={axesMetricKeys}
          isCartesianGridActive
        ></SANChart>
      </div>
    </div>
  )
}

export default Chart
