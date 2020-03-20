import React from 'react'
import TrendsTablesWrapper from './TrendsTable/Tables/TrendsTablesWrapper'
import GetHypedTrends from './GetHypedTrends'

const Trends = ({ className, ...props }) => {
  return (
    <GetHypedTrends
      render={({ isLoading, items }) => (
        <div className={className}>
          <TrendsTablesWrapper
            trends={items}
            isLoading={isLoading}
            {...props}
          />
        </div>
      )}
    />
  )
}

export default Trends
