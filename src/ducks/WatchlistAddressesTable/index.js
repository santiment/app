import React from 'react'
import { COLUMNS } from './columns'
import { createAddressWatchlist } from './gql/mutations'
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

const normalizeCSVData = items => items.map(normalizeCSVItem)

const WatchlistAddressesTable = props => {
  return (
    <WatchlistTable
      {...props}
      createWatchlist={createAddressWatchlist}
      columns={COLUMNS}
      itemKeyProperty='address'
      normalizeCSVData={normalizeCSVData}
    />
  )
}

export default WatchlistAddressesTable
