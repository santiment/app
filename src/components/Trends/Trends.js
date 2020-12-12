import React from 'react'
import TrendsTablesWrapper from './TrendsTable/Tables/TrendsTablesWrapper'
import GetHypedTrends from './GetHypedTrends'

const Trends = ({ className, slice, ...props }) => {
  return (
    <GetHypedTrends
      render={({ isLoading, items }) => (
        <div className={className}>
          <TrendsTablesWrapper
            trends={slice(items)}
            isLoading={isLoading}
            {...props}
          />
        </div>
      )}
    />
  )
}

Trends.defaultProps = {
  slice: _ => _
}

export default Trends
