import React from 'react'
import TrendsTablesWrapper from './TrendsTable/Tables/TrendsTablesWrapper'
import GetHypedTrends from './GetHypedTrends'

const Trends = ({ className }) => {
  return (
    <GetHypedTrends
      render={({ isLoading, items }) => (
        <div className={className}>
          <TrendsTablesWrapper trends={items} isLoading={isLoading} />
        </div>
      )}
    />
  )
}

export default Trends
