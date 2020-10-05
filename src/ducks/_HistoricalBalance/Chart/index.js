import React from 'react'
import Selector from '@santiment-network/ui/Selector/Selector'
import CreateAlert from './CreateAlert'
import SettingsMenu from './SettingsMenu'
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
const Chart = ({ ...props }) => {
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
      <div className={styles.chart}>123</div>
    </div>
  )
}

export default Chart
