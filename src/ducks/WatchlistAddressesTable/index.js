import React from 'react'
import { COLUMNS } from './columns'
import WatchlistTable from '../WatchlistTable'
import { getAddressWatchlist } from './gql/queries'
import { BLOCKCHAIN_ADDRESS } from '../Watchlists/detector'
import { useColumns } from '../Watchlists/Widgets/Table/hooks'

const OBJECT = {}
const normalizeLabel = ({ name }) => name
function normalizeCSVItem ({ address, balanceChange, labels, notes }) {
  const { balanceEnd, balanceChangePercent } = balanceChange || OBJECT

  return {
    address,
    balance: balanceEnd,
    percentChange7d: balanceChangePercent,
    labels: labels.map(normalizeLabel),
    note: notes
  }
}

const refetchAddressWatchlist = id => getAddressWatchlist(id, 'network-only')
const normalizeCSVData = items => items.map(normalizeCSVItem)

const WatchlistAddressesTable = props => {
  const { activeColumns, setActiveColumnsKeys } = useColumns(BLOCKCHAIN_ADDRESS)

  return (
    <WatchlistTable
      {...props}
      columns={COLUMNS}
      activeColumns={activeColumns}
      updateActiveColumnsKeys={setActiveColumnsKeys}
      itemKeyProperty='address'
      normalizeCSVData={normalizeCSVData}
      onRefreshClick={refetchAddressWatchlist}
    />
  )
}

export default WatchlistAddressesTable
