import React from 'react'
import withSizes from 'react-sizes'
import TrendsTablesWrapper from './TrendsTable/Tables/TrendsTablesWrapper'
import TrendsTable from '../../ducks/TrendsTable'
import { Column } from '../../ducks/TrendsTable/columns'
import { mapSizesToProps } from '../../utils/withSizes'

import GetHypedTrends from './GetHypedTrends'

const MOBILE_HIDDEN_COLUMNS = [Column.INDEX, Column.CONNECTED_WORDS]
const Trends = ({ className, isDesktop, slice, ...props }) => {
  return (
    <TrendsTable
      className={className}
      hiddenColumnIds={isDesktop ? undefined : MOBILE_HIDDEN_COLUMNS}
    />
  )

  return (
    <GetHypedTrends
      render={({ isLoading, items }) => (
        <>
          <div className={className}>
            <TrendsTablesWrapper
              trends={slice(items)}
              isLoading={isLoading}
              {...props}
            />
          </div>
        </>
      )}
    />
  )
}

Trends.defaultProps = {
  slice: _ => _
}

export default withSizes(mapSizesToProps)(Trends)
