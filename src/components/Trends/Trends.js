import React from 'react'
import withSizes from 'react-sizes'
import TrendsTable from '../../ducks/TrendsTable'
import { Column } from '../../ducks/TrendsTable/columns'
import { mapSizesToProps } from '../../utils/withSizes'

const MOBILE_HIDDEN_COLUMNS = [Column.INDEX, Column.CONNECTED_WORDS]
const Trends = ({ hiddenColumnIds, isDesktop, ...props }) => (
  <TrendsTable
    {...props}
    hiddenColumnIds={isDesktop ? hiddenColumnIds : MOBILE_HIDDEN_COLUMNS}
  />
)

export default withSizes(mapSizesToProps)(Trends)
