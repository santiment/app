import React from 'react'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import CalendarBtn from '../../../components/Calendar/CalendarBtn'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'
import { CheckboxWrapper } from '../../../components/formik-santiment-ui/FormikCheckbox'
import styles from './../../SANCharts/ChartPage.module.scss'
import balanceViewStyles from './BalanceView.module.scss'

const BalanceViewChartSettings = ({
  defaultTimerange,
  onTimerangeChange,
  onCalendarChange,
  from,
  to,
  classes = {
    chartSettings: ''
  },
  queryString = '',
  toggleYAxes,
  showYAxes
}) => {
  return (
    <div className={cx(styles.settings, classes.chartSettings)}>
      <CheckboxWrapper
        className={balanceViewStyles.toggleY}
        label='Show Y axes'
        onClick={() => {
          toggleYAxes(!showYAxes)
        }}
        isActive={showYAxes}
      />

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

      <ShareModalTrigger
        className={balanceViewStyles.shareBtn}
        shareLink={window.location.origin + '/labs/balance' + queryString}
      />
    </div>
  )
}

export default BalanceViewChartSettings
