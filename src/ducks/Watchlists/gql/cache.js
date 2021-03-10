import { getWatchlistsShortQuery } from './lists/helpers'
import { BLOCKCHAIN_ADDRESS } from '../detector'
import { PROJECTS_WATCHLIST_QUERY } from '../../../queries/WatchlistGQL'
import { ADDRESS_WATCHLIST_QUERY } from '../../WatchlistAddressesTable/gql/queries'

function visitWatchlistsCache (visitor) {
  return (cache, { data }) => {
    const { type } = data.watchlist
    const query = getWatchlistsShortQuery(type)
    const { watchlists } = cache.readQuery({ query: query })

    cache.writeQuery({
      query: query,
      data: { watchlists: visitor(data, watchlists) }
    })
  }
}

function visitWatchlistCache (visitor) {
  return (cache, { data }) => {
    const { id, type } = data.updateWatchlist
    const query =
      type === BLOCKCHAIN_ADDRESS
        ? ADDRESS_WATCHLIST_QUERY
        : PROJECTS_WATCHLIST_QUERY

    const watchlist = cache.readQuery({
      query: query,
      variables: { id: +id }
    })

    cache.writeQuery({
      query: query,
      variables: { id: +id },
      data: { watchlist: visitor(data, watchlist) }
    })
  }
}

export const updateWatchlistsOnCreation = visitWatchlistsCache(
  ({ watchlist }, lists) => lists.concat([watchlist])
)

export const updateWatchlistsOnDelete = visitWatchlistsCache(
  ({ watchlist }, lists) => lists.filter(({ id }) => +id !== +watchlist.id)
)

export const updateWatchlistOnEdit = visitWatchlistCache(
  ({ updateWatchlist }, watchlist) => ({ ...watchlist, ...updateWatchlist })
)
