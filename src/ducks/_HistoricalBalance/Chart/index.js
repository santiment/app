import React from 'react'
import Selector from '@santiment-network/ui/Selector/Selector'
import CreateAlert from './CreateAlert'
import SettingsMenu from './SettingsMenu'
import { useWalletMetrics } from '../hooks'
import SANChart from '../../Chart'
import { useChartColors } from '../../Chart/colors'
import { useClosestValueData } from '../../Chart/hooks'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import AdvancedCalendar from '../../../components/AdvancedCalendar'
import styles from './index.module.scss'

const TIMERANGES = ['1D', '1W', '1M', '3M', '6M', 'All']

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
const Chart = ({ chartAssets, settings }) => {
  const metrics = useWalletMetrics(chartAssets)
  const MetricColor = useChartColors(metrics)
  const [rawData] = useTimeseries(metrics, settings)
  const data = useClosestValueData(rawData, metrics)
  console.log(data)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CreateAlert></CreateAlert>
        <Timeranges></Timeranges>
        <AdvancedCalendar
          className={styles.calendar}
          from={FROM}
          to={TO}
          // timeRange={defaultTimerange}
          // onCalendarChange={onCalendarChange}
          // onTimerangeChange={onTimerangeChange}
        />
        <SettingsMenu></SettingsMenu>
      </div>
      <div className={styles.chart}>
        <SANChart
          className={styles.canvas}
          hideBrush
          hideWatermark
          data={data}
          lines={['ethereum', 'robonomics-network']}
          joinedCategories={['ethereum', 'robonomics-network']}
          MetricColor={MetricColor}
        ></SANChart>
      </div>
    </div>
  )
}

Chart.defaultProps = {
  walletAssets: [{ slug: 'ethereum' }],
}

export default Chart
