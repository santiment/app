import React from 'react'
import { Panel, Selector } from '@santiment-network/ui'
import SearchProjects from '../../components/Search/SearchProjects'
import ShareModalTrigger from '../../components/Share/ShareModalTrigger'
import styles from './ChartPage.module.scss'

const ChartSettings = ({
  onTimerangeChange,
  defaultTimerange,
  onSlugSelect
}) => {
  return (
    <div className={styles.settings}>
      <SearchProjects
        onSuggestionSelect={onSlugSelect}
        className={styles.search}
      />
      <Selector
        options={['1w', '1m', '3m', '6m']}
        onSelectOption={onTimerangeChange}
        defaultSelected={defaultTimerange}
      />

      <ShareModalTrigger
      // TODO(vangaurd): Before sharing, modify from/to based on the zoom
      />
    </div>
  )
}

export default ChartSettings
