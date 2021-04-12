import React, { useMemo, useEffect, useState } from 'react'
import { combineColumns } from './columns'
import WatchlistTable from '../WatchlistTable'
import { getAddressWatchlist } from './gql/queries'
import { BLOCKCHAIN_ADDRESS } from '../Watchlists/detector'
import { useColumns } from '../Watchlists/Widgets/Table/hooks'
import { useAddressWatchlistItems } from '../../pages/WatchlistAddresses/hooks'

const OBJECT = {}
const normalizeLabel = ({ name }) => name
function normalizeCSVItem ({ address, balanceChange, labels, notes }) {
  const { balanceEnd, balanceChangePercent } = balanceChange || OBJECT

  return {
    address,
    balance: balanceEnd,
    percentChange7d: balanceChangePercent,
    labels: labels && labels.map(normalizeLabel),
    note: notes
  }
}

const refetchAddressWatchlist = (id, dynamicColumns) =>
  getAddressWatchlist(id, dynamicColumns, 'network-only')
const normalizeCSVData = items => items.map(normalizeCSVItem)

const WatchlistAddressesTable = props => {
  const [list, setList] = useState(props.watchlist)
  const { activeColumns, setActiveColumnsKeys } = useColumns(BLOCKCHAIN_ADDRESS)
  const columns = useMemo(() => combineColumns(activeColumns), [activeColumns])
  const items = useAddressWatchlistItems(list)

  useEffect(
    () => {
      refetchAddressWatchlist(props.watchlist.id, activeColumns).then(list =>
        setList(list)
      )
    },
    [activeColumns]
  )

  return (
    <WatchlistTable
      {...props}
      items={items}
      columns={columns}
      activeColumns={activeColumns}
      updateActiveColumnsKeys={setActiveColumnsKeys}
      itemKeyProperty='address'
      normalizeCSVData={normalizeCSVData}
      onRefreshClick={id => refetchAddressWatchlist(id, activeColumns)}
    />
  )
}

export default WatchlistAddressesTable
