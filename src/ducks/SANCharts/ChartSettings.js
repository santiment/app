import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Selector from '@santiment-network/ui/Selector/Selector'
import ChartSettingsContextMenu from './ChartSettingsContextMenu'
import CalendarBtn from '../../components/Calendar/CalendarBtn'
import { getTimeIntervalFromToday, DAY } from '../../utils/dates'
import ChartExpandBtn from './expand/ChartExpandBtn'
import styles from './ChartPage.module.scss'

const { to: MAX_DATE } = getTimeIntervalFromToday(0, DAY)

const ChartSettings = ({
  chartRef,
  title,
  timeRange,
  disabledMetrics,
  from,
  to,
  showNightModeToggle = true,
  isAdvancedView,
  isFullscreenAvailable = true,
  onTimerangeChange,
  onCalendarChange,
  noTitle,
  intervals = ['1d', '1w', '1m', '3m', '6m', '1y', 'all'],
  ...rest
}) => {
  const notAdvancedView = !isAdvancedView
  return (
    <div className={styles.settings}>
      <div className={styles.settings__group}>
        {noTitle || (
          <div className={styles.settings__slugBlock}>
            <div className={styles.settings__studio}>Studio</div>
            <div className={styles.settings__slug}>{title}</div>
          </div>
        )}
      </div>
      <div className={cx(styles.settings__group, styles.settings__main)}>
        <Selector
          options={intervals}
          onSelectOption={onTimerangeChange}
          defaultSelected={timeRange}
          className={styles.ranges}
        />
        {notAdvancedView && (
          <CalendarBtn
            onChange={onCalendarChange}
            value={[new Date(from), new Date(to)]}
            className={styles.calendar}
            maxDate={MAX_DATE}
          />
        )}
        <ChartSettingsContextMenu
          showNightModeToggle={showNightModeToggle}
          title={title}
          chartRef={chartRef}
          {...rest}
        />
        {isFullscreenAvailable && <ChartExpandBtn />}
      </div>
    </div>
  )
}

const mapStateToProps = ({ rootUi: { isWideChartEnabled } }) => ({
  isWideChart: isWideChartEnabled
})

export default connect(mapStateToProps)(ChartSettings)
