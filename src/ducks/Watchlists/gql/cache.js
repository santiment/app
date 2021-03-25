import { getWatchlistsShortQuery } from './lists/helpers'

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

export function updateWatchlistOnEdit (cache, { data }) {
  const updateWatchlist =
    data.updateWatchlist || data.addWatchlistItems || data.removeWatchlistItems
  const { type } = updateWatchlist
  const query = getWatchlistsShortQuery(type)
  const store = cache.readQuery({ query: query })
  const index = store.watchlists.findIndex(
    ({ id }) => id === updateWatchlist.id
  )
  store.watchlists[index] = { ...store.watchlists[index], ...updateWatchlist }

  cache.writeQuery({ query: query, data: store })
}

export const updateWatchlistsOnCreation = visitWatchlistsCache(
  ({ watchlist }, lists) => lists.concat([watchlist])
)

export const updateWatchlistsOnDelete = visitWatchlistsCache(
  ({ watchlist }, lists) => lists.filter(({ id }) => +id !== +watchlist.id)
)
