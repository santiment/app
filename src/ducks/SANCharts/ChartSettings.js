import React from 'react'
import Checkboxes from '@santiment-network/ui/Checkboxes'
import Selector from '@santiment-network/ui/Selector/Selector'
import CalendarBtn from '../../components/Calendar/CalendarBtn'
import SearchProjects from '../../components/Search/SearchProjects'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
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

      <Checkboxes
        options={['Night mode']}
        defaultSelectedIndexes={hasNightMode && ['Night mode']}
        onSelect={onNightModeSelect}
      />
      <ShareModalTrigger
        shareLink={shareLink}
        extraShare={[
          {
            value: `<iframe frameborder="0" height="340" src="${shareLink}"></iframe>`,
            label: 'Copy iframe'
          }
        ]}
      />
    </div>
  )
}

export default ChartSettings
