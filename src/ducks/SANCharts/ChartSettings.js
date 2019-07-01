import React from 'react'
import Selector from '@santiment-network/ui/Selector/Selector'
import ChartSettingsContextMenu from './ChartSettingsContextMenu'
import CalendarBtn from '../../components/Calendar/CalendarBtn'
import SearchProjects from '../../components/Search/SearchProjects'
import styles from './ChartPage.module.scss'

const ChartSettings = ({
  onTimerangeChange,
  defaultTimerange,
  onSlugSelect,
  onCalendarChange,
  generateShareLink,
  onNightModeSelect,
  hasNightMode,
  disabledMetrics,
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
      />
      <CalendarBtn
        onChange={onCalendarChange}
        value={[new Date(from), new Date(to)]}
      />
      <Selector
        options={['1w', '1m', '3m', '6m']}
        onSelectOption={onTimerangeChange}
        defaultSelected={defaultTimerange}
      />
      <ChartSettingsContextMenu
        hasNightMode={hasNightMode}
        onNightModeSelect={onNightModeSelect}
        shareLink={shareLink}
      />
    </div>
  )
}

export default ChartSettings
