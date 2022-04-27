import React, { useMemo, useEffect, useState } from 'react'
import { combineColumns } from './columns'
import WatchlistTable from '../WatchlistTable'
import { getAddressWatchlist } from './gql/queries'
import { BLOCKCHAIN_ADDRESS } from '../Watchlists/detector'
import { useColumns } from '../Watchlists/Widgets/Table/hooks'
import { SUFFIX } from '../Watchlists/Widgets/Table/Columns/builder'
import { useAddressWatchlistItems } from '../../pages/WatchlistAddresses/hooks'
import { CHECKBOX_COLUMN } from '../../ducks/_Table/columns'

const ARRAY = []
const normalizeLabel = ({ name }) => name
const normalizeBalance = (value) => value && value.balanceEnd
const normalizeBalanceChange = (value) => value && value.balanceChangePercent

function normalizeCSVItem({ address, labels, notes, __typename, ...columns }) {
  const filteredColumnObj = {}
  const columnKeys = typeof columns === 'object' ? Object.keys(columns) : ARRAY
  const filteredColumnKeys = columnKeys.filter(
    (key) => key.startsWith('_') && !key.includes(SUFFIX.BALANCE_CHART),
  )
  filteredColumnKeys.forEach((key) => {
    let item = columns[key]

    if (key.includes(SUFFIX.CURR_BALANCE)) {
      item = normalizeBalance(columns[key])
    }

    if (key.includes(SUFFIX.BALANCE_PERCENT)) {
      item = normalizeBalanceChange(columns[key])
    }

    filteredColumnObj[key] = item
  })

  if (labels) {
    filteredColumnObj.labels = labels && labels.map(normalizeLabel)
  }

  if (notes) {
    filteredColumnObj.notes = notes
  }

  return { address, ...filteredColumnObj }
}

const refetchAddressWatchlist = (id, dynamicColumns) =>
  getAddressWatchlist(id, dynamicColumns, 'network-only')
const normalizeCSVData = (items) => items.map(normalizeCSVItem)

const WatchlistAddressesTable = (props) => {
  const [list, setList] = useState(props.watchlist)
  const { activeColumns, setActiveColumnsKeys } = useColumns(BLOCKCHAIN_ADDRESS)
  const columns = useMemo(() => {
    const columns = combineColumns(activeColumns)
    if (props.isDesktop) return columns
    return columns.filter(({ id }) => id !== CHECKBOX_COLUMN.id)
  }, [activeColumns, props.isDesktop])
  const items = useAddressWatchlistItems(list)

  useEffect(() => {
    refetchAddressWatchlist(props.watchlist.id, activeColumns).then((list) => setList(list))
  }, [activeColumns, props.watchlist.id])

  return (
    <WatchlistTable
      {...props}
      items={items}
      columns={columns}
      activeColumns={activeColumns}
      updateActiveColumnsKeys={setActiveColumnsKeys}
      itemKeyProperty='address'
      normalizeCSVData={normalizeCSVData}
      onRefreshClick={(id, onRefreshDone) =>
        refetchAddressWatchlist(id, activeColumns)
          .then((list) => setList(list))
          .then(() => typeof onRefreshDone === 'function' && onRefreshDone())
      }
    />
  )
}

export default WatchlistAddressesTable
