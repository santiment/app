import React from 'react'
import Selector from '@santiment-network/ui/Selector/Selector'
import ChartSettingsContextMenu from './ChartSettingsContextMenu'
import CalendarBtn from '../../components/Calendar/CalendarBtn'
import { getTimeIntervalFromToday, DAY } from '../../utils/dates'
import styles from './ChartPage.module.scss'

const { to: MAX_DATE } = getTimeIntervalFromToday(0, DAY)

const ChartSettings = ({
  chartRef,
  onTimerangeChange,
  defaultTimerange,
  onCalendarChange,
  generateShareLink,
  onNightModeSelect,
  isNightModeActive,
  showNightModeToggle = true,
  onIntervalChange,
  disabledMetrics,
  interval,
  from,
  to,
  isAdvancedView,
  activeMetrics,
  title,
  scale,
  onMultiChartsChange,
  isMultiChartsActive,
  onScaleChange,
  chartData
}) => {
  const shareLink = generateShareLink(Object.keys(disabledMetrics))

  const notAdvancedView = !isAdvancedView
  return (
    <div className={styles.settings}>
      <div className={styles.settings__group}>
        <h3 className={styles.settings__title}>Metrics</h3>
      </div>
      <div className={styles.settings__group}>
        <Selector
          options={['1d', '1w', '1m', '3m', '6m', '1y', 'all']}
          onSelectOption={onTimerangeChange}
          defaultSelected={defaultTimerange}
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
          onMultiChartsChange={onMultiChartsChange}
          isMultiChartsActive={isMultiChartsActive}
          isNightModeActive={isNightModeActive}
          showNightModeToggle={showNightModeToggle}
          onNightModeSelect={onNightModeSelect}
          shareLink={shareLink}
          activeMetrics={activeMetrics}
          title={title}
          chartRef={chartRef}
          scale={scale}
          onScaleChange={onScaleChange}
          chartData={chartData}
        />
      </div>
    </div>
  )
}

export default ChartSettings
