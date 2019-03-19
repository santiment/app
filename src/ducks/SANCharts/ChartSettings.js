import React from 'react'
import { Panel, Selector } from '@santiment-network/ui'
import SearchProjects from '../../components/Search/SearchProjects'

const ChartSettings = ({
  onTimerangeChange,
  defaultTimerange,
  onSlugSelect
}) => {
  return (
    <div>
      <SearchProjects onSuggestionSelect={onSlugSelect} />
      <Selector
        options={['1w', '1m', '3m', '6m']}
        onSelectOption={onTimerangeChange}
        defaultSelected={defaultTimerange}
      />
    </div>
  )
}

export default ChartSettings
