const RECENT_ASSETS = 'RECENT_ASSETS'
const RECENT_WATCHLISTS = 'RECENT_WATCHLISTS'
const getRecent = type => (localStorage.getItem(type) || '').split(',')

const removeRecent = (type, item) => {
  const items = new Set(getRecent(type))
  items.delete(item)
  return [...items]
}

const saveRecent = (type, items) =>
  localStorage.setItem(type, items.slice(0, 5).toString())

const addRecent = (type, item) =>
  saveRecent(type, [item, ...removeRecent(type, item)].filter(Boolean))

// Return array of slugs
export const getRecentAssets = () => getRecent(RECENT_ASSETS)
// Return array of watchlist ids
export const getRecentWatchlists = () => getRecent(RECENT_WATCHLISTS)

export const addRecentAssets = slug => addRecent(RECENT_ASSETS, slug)
export const addRecentWatchlists = id => addRecent(RECENT_WATCHLISTS, id)
export const removeRecentWatchlists = id =>
  saveRecent(RECENT_WATCHLISTS, removeRecent(RECENT_WATCHLISTS, id))
