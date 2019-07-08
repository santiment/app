import React from 'react'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import CalendarBtn from '../../../components/Calendar/CalendarBtn'
import styles from './../../SANCharts/ChartPage.module.scss'

const BalanceViewChartSettings = ({
  defaultTimerange,
  onTimerangeChange,
  onCalendarChange,
  from,
  to,
  classes = {
    chartSettings: ''
  }
}) => {
  return (
    <div className={cx(styles.settings, classes.settings)}>
      <Selector
        className={classes.datesSelector}
        options={['1d', '1w', '1m', '3m', '6m', 'all']}
        nameOptions={['1D', '1W', '1M', '3M', '6M', 'All']}
        onSelectOption={onTimerangeChange}
        defaultSelected={defaultTimerange}
      />
      <CalendarBtn
        className={classes.calendarButton}
        onChange={onCalendarChange}
        value={[new Date(from), new Date(to)]}
      />
    </div>
  )
}

export default BalanceViewChartSettings
