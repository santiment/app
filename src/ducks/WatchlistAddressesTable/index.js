import React from 'react'
import { COLUMNS } from './columns'
import { getAddressWatchlist } from './gql/queries'
import { createAddressesWatchlist } from '../Watchlists/gql/mutations'
import WatchlistTable from '../WatchlistTable'

const OBJECT = {}
const normalizeLabel = ({ name }) => name
function normalizeCSVItem ({ address, balanceChange, labels }) {
  const { balanceEnd, balanceChangePercent } = balanceChange || OBJECT

  return {
    address,
    balance: balanceEnd,
    percentChange7d: balanceChangePercent,
    labels: labels.map(normalizeLabel)
  }
}

const refetchAddressWatchlist = id => getAddressWatchlist(id, 'network-only')
const normalizeCSVData = items => items.map(normalizeCSVItem)
const createWatchlist = (watchlist, setDialog) =>
  createAddressesWatchlist(watchlist).then(() => setDialog(false))

const WatchlistAddressesTable = props => (
  <WatchlistTable
    {...props}
    createWatchlist={createWatchlist}
    columns={COLUMNS}
    itemKeyProperty='address'
    normalizeCSVData={normalizeCSVData}
    onRefreshClick={refetchAddressWatchlist}
  />
)

export default WatchlistAddressesTable
