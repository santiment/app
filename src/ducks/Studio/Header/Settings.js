import React from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import AdvancedCalendar from '../../../components/AdvancedCalendar'
import ContextMenu from './ContextMenu'
import { getIntervalByTimeRange } from '../../../utils/dates'
import MetricsExplanation from '../Chart/Sidepane/MetricsExplanation'
import styles from './Settings.module.scss'

export default ({
  settings,
  options,
  setOptions,
  setSettings,
  className,
  showMulti = true,
  isMetricExplanationOpened,
  toggleMultiCharts,
  changeTimePeriod,
  onExplainMetricsClick,

  ...rest
}) => {
  const { timeRange, from, to, title } = settings

  function onTimerangeChange(timeRange) {
    const { from, to } = getIntervalByTimeRange(timeRange)
    changeTimePeriod(from, to, timeRange)
  }

  function onCalendarChange([from, to]) {
    changeTimePeriod(from, to)
  }

  /* const hasExplanaibles = filterExplainableMetrics(metrics).length > 0 */
  const hasExplanaibles = true

  return (
    <div className={cx(styles.wrapper, className)}>
      {hasExplanaibles && (
        <MetricsExplanation.Button
          onClick={onExplainMetricsClick}
          className={cx(isMetricExplanationOpened && styles.explain_active)}
        />
      )}
      <AdvancedCalendar
        className={styles.calendar}
        from={new Date(from)}
        to={new Date(to)}
        timeRange={timeRange}
        onCalendarChange={onCalendarChange}
        onTimerangeChange={onTimerangeChange}
      />
      {showMulti && (
        <div className={styles.multi} onClick={toggleMultiCharts}>
          Multi charts
          <Toggle
            isActive={options.isMultiChartsActive}
            className={styles.multi__toggle}
          />
        </div>
      )}
      <ContextMenu
        title={title}
        showNightModeToggle={false}
        showDownload
        showMulti={false}
        setOptions={setOptions}
        {...options}
        {...rest}
      />
    </div>
  )
}
