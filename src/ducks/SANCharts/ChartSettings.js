import React from 'react'
import { Checkboxes, Selector } from '@santiment-network/ui'
import SearchProjects from '../../components/Search/SearchProjects'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import styles from './ChartPage.module.scss'

const ChartSettings = ({
  onTimerangeChange,
  defaultTimerange,
  onSlugSelect,
  generateShareLink,
  onNightModeSelect,
  hasNightMode,
  disabledMetrics
}) => {
  return (
    <div className={styles.settings}>
      <SearchProjects
        onSuggestionSelect={onSlugSelect}
        className={styles.search}
        suggestionsProps={{ style: { zIndex: 5 } }}
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
        shareLink={`<iframe frameborder="0" height="340" src="${generateShareLink(
          disabledMetrics
        )}"></iframe>`}
      />
    </div>
  )
}

export default ChartSettings
