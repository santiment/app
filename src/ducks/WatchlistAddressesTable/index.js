import React from 'react'
import { COLUMNS } from './columns'
import { getAddressWatchlist } from './gql/queries'
import { showNotification } from '../../actions/rootActions'
import WatchlistTable from '../WatchlistTable'
import { createAddressesWatchlist } from '../Watchlists/gql/mutations'
import { store } from '../../redux'
import WatchlistNotificationActions from '../Watchlists/Actions/notifications/WatchlistNotificationActions'

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
export const createWatchlist = (watchlist, setDialog) =>
  createAddressesWatchlist(watchlist)
    .then(watchlist => {
      store.dispatch(
        showNotification({
          title: `Created the new watchlist`,
          description: (
            <WatchlistNotificationActions
              id={watchlist.id}
              name={watchlist.name}
              toLink={'/'}
            />
          )
        })
      )
    })
    .then(() => setDialog(false))

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
