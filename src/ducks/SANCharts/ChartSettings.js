import React from 'react'
import Selector from '@santiment-network/ui/Selector/Selector'
import IntervalSelector from './IntervalSelector'
import ChartSettingsContextMenu from './ChartSettingsContextMenu'
import CalendarBtn from '../../components/Calendar/CalendarBtn'
import SearchProjects from '../../components/Search/SearchProjects'
import { getTimeIntervalFromToday, DAY } from '../../utils/dates'
import styles from './ChartPage.module.scss'

const { to: MAX_DATE } = getTimeIntervalFromToday(0, DAY)

const ChartSettings = ({
  onTimerangeChange,
  defaultTimerange,
  onSlugSelect,
  onCalendarChange,
  generateShareLink,
  onNightModeSelect,
  hasNightMode,
  onIntervalChange,
  disabledMetrics,
  interval,
  from,
  to
}) => {
  const shareLink = generateShareLink(disabledMetrics)
  return (
    <div className={styles.settings}>
      <SearchProjects
        onSuggestionSelect={onSlugSelect}
        className={styles.search}
        suggestionsProps={{ style: { zIndex: 5 } }}
        iconPosition='left'
      />
      <div className={styles.settings__right}>
        <Selector
          options={['1d', '1w', '1m', '3m', '6m', '1y', 'all']}
          onSelectOption={onTimerangeChange}
          defaultSelected={defaultTimerange}
          className={styles.ranges}
        />
        <IntervalSelector
          from={from}
          to={to}
          interval={interval}
          onIntervalChange={onIntervalChange}
        />
        <CalendarBtn
          onChange={onCalendarChange}
          value={[new Date(from), new Date(to)]}
          className={styles.calendar}
          maxDate={MAX_DATE}
        />
        <ChartSettingsContextMenu
          hasNightMode={hasNightMode}
          onNightModeSelect={onNightModeSelect}
          shareLink={shareLink}
        />
      </div>
    </div>
  )
}

export default ChartSettings
