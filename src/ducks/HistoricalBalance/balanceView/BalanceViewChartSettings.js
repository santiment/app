import React from 'react'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import CalendarBtn from '../../../components/Calendar/CalendarBtn'
import ChartSettingsContextMenu from '../../SANCharts/ChartSettingsContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
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

      <ChartSettingsContextMenu
        showNightModeToggle={false}
        shareLink={window.location.origin + '/labs/balance' + queryString}
        showDownload={false}
      >
        <Button
          fluid
          variant='ghost'
          onClick={() => toggleYAxes(!showYAxes)}
          className={balanceViewStyles.toggleY}
        >
          Show Y axes
          <Toggle isActive={showYAxes} className={balanceViewStyles.toggler} />
        </Button>
      </ChartSettingsContextMenu>
    </div>
  )
}

export default BalanceViewChartSettings
