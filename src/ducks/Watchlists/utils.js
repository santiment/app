export const getWatchlistLink = ({ name, id }) => {
  return `/assets/list?name=${encodeURIComponent(name)}@${id}`
}

export function isStaticWatchlist (watchlist) {
  const { name } = watchlist.function || {}
  return name === 'empty'
}

export function isDynamicWatchlist (watchlist) {
  const { name } = watchlist.function || {}
  return name !== 'empty'
}
