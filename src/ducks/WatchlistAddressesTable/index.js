import React from 'react'
import { COLUMNS } from './columns'
import { createAddressWatchlist } from './gql/mutations'
import WatchlistTable from '../WatchlistTable'

const WatchlistAddressesTable = props => {
  return (
    <WatchlistTable
      {...props}
      createWatchlist={createAddressWatchlist}
      columns={COLUMNS}
      itemKeyProperty='address'
    />
  )
}

export default WatchlistAddressesTable
