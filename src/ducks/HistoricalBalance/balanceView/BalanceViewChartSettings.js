import React from 'react'
import cx from 'classnames'
import Selector from '@santiment-network/ui/Selector/Selector'
import ChartSettingsContextMenu from '../../SANCharts/ChartSettingsContextMenu'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import AdvancedCalendar from '../../../components/AdvancedCalendar'
import styles from './../../SANCharts/ChartPage.module.scss'
import balanceViewStyles from './BalanceView.module.scss'

const BalanceViewChartSettings = ({
  defaultTimerange,
  onTimerangeChange,
  onCalendarChange,
  from,
  to,
  classes = {},
  queryString = '',
  toggleYAxes,
  showYAxes,
  priceMetrics = [],
  toggleAsset,
  onScaleChange,
  scale,
  showIntervals = true
}) => {
  return (
    <div className={cx(styles.settings, classes.chartSettings)}>
      {showIntervals && (
        <Selector
          className={classes.datesSelector}
          options={['1d', '1w', '1m', '3m', '6m', 'all']}
          nameOptions={['1D', '1W', '1M', '3M', '6M', 'All']}
          onSelectOption={onTimerangeChange}
          defaultSelected={defaultTimerange}
        />
      )}

      <div className={balanceViewStyles.dateAndSettings}>
        <AdvancedCalendar
          className={classes.calendarButton}
          from={new Date(from)}
          to={new Date(to)}
          timeRange={defaultTimerange}
          onCalendarChange={onCalendarChange}
          onTimerangeChange={onTimerangeChange}
        />

        <ChartSettingsContextMenu
          showNightModeToggle={false}
          shareLink={window.location.origin + '/labs/balance' + queryString}
          showDownload={false}
          showMulti={false}
          showWatermarkSettings={false}
          classes={balanceViewStyles}
          onScaleChange={onScaleChange}
          isLogScale={scale === 'log'}
        >
          <Button
            fluid
            variant='ghost'
            onClick={() => toggleYAxes(!showYAxes)}
            className={balanceViewStyles.toggleY}
          >
            <span className={balanceViewStyles.toggleLabel}>Show Y axis</span>
            <Toggle
              isActive={showYAxes}
              className={balanceViewStyles.toggler}
            />
          </Button>
          <div className={balanceViewStyles.divider} />
          <div className={balanceViewStyles.prices}>
            {priceMetrics.map((metric, index) => {
              return (
                <Button
                  key={index}
                  fluid
                  variant='ghost'
                  onClick={() => toggleAsset(metric)}
                  className={balanceViewStyles.toggleY}
                >
                  <span className={balanceViewStyles.toggleLabel}>
                    Price of {metric.asset}
                  </span>
                  <Toggle
                    isActive={metric.enabled}
                    className={balanceViewStyles.toggler}
                  />
                </Button>
              )
            })}
          </div>
        </ChartSettingsContextMenu>
      </div>
    </div>
  )
}

export default BalanceViewChartSettings
