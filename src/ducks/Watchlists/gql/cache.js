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

export const updateWatchlistsOnCreation = visitWatchlistsCache(
  ({ watchlist }, lists) => lists.concat([watchlist])
)

export const updateWatchlistsOnDelete = visitWatchlistsCache(
  ({ watchlist }, lists) => lists.filter(({ id }) => +id !== +watchlist.id)
)
