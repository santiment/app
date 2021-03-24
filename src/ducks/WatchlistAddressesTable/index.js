import React from 'react'
import { COLUMNS } from './columns'
import { getAddressWatchlist } from './gql/queries'
import WatchlistTable from '../WatchlistTable'

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

const WatchlistAddressesTable = props => (
  <WatchlistTable
    {...props}
    columns={COLUMNS}
    itemKeyProperty='address'
    normalizeCSVData={normalizeCSVData}
    onRefreshClick={refetchAddressWatchlist}
  />
)

export default WatchlistAddressesTable
