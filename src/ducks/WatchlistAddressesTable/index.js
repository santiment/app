import React from 'react'
import { COLUMNS } from './columns'
import { getAddressWatchlist } from './gql/queries'
import WatchlistTable from '../WatchlistTable'
import { getAddressesWatchlistLink } from '../Watchlists/url'
import { createAddressesWatchlist } from '../Watchlists/gql/mutations'
import WatchlistNotificationActions from '../Watchlists/Actions/notifications/WatchlistNotificationActions'
import { store } from '../../redux'
import { showNotification } from '../../actions/rootActions'

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
              toLink={getAddressesWatchlistLink(watchlist)}
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
