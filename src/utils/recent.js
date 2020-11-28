const RECENT_ASSETS = 'RECENT_ASSETS'
const RECENT_WATCHLISTS = 'RECENT_WATCHLISTS'
const RECENT_SCREENERS = 'RECENT_SCREENERS'
const RECENT_TRENDS = 'RECENT_TRENDS_SEARCH'

const getRecent = type => {
  const res = localStorage.getItem(type)
  return res ? res.split(',') : []
}

const removeRecent = (type, item) => {
  const items = new Set(getRecent(type))
  items.delete(item)
  return [...items]
}

const saveRecent = (type, items) => {
  const recents = items.slice(0, 5)
  localStorage.setItem(type, recents.toString())
  return recents
}

const addRecent = (type, item) =>
  saveRecent(type, [item, ...removeRecent(type, item)].filter(Boolean))

// Return array of slugs
export const getRecentAssets = () => getRecent(RECENT_ASSETS)
// Return array of watchlist ids
export const getRecentWatchlists = () => getRecent(RECENT_WATCHLISTS)
// Return array of screeners ids
export const getRecentScreeners = () => getRecent(RECENT_SCREENERS)
// Return array of trend words
export const getRecentTrends = () => getRecent(RECENT_TRENDS)

export const addRecentAssets = slug => addRecent(RECENT_ASSETS, slug)
export const addRecentTrends = word => addRecent(RECENT_TRENDS, word)
export const addRecentWatchlists = id => addRecent(RECENT_WATCHLISTS, id)
export const addRecentScreeners = id => addRecent(RECENT_SCREENERS, id)

export const removeRecentWatchlists = id =>
  saveRecent(RECENT_WATCHLISTS, removeRecent(RECENT_WATCHLISTS, id))
export const removeRecentScreeners = id =>
  saveRecent(RECENT_SCREENERS, removeRecent(RECENT_SCREENERS, id))
export const removeRecentTrends = word =>
  saveRecent(RECENT_TRENDS, removeRecent(RECENT_TRENDS, word))
export const removeRecentAssets = asset =>
  saveRecent(RECENT_ASSETS, removeRecent(RECENT_ASSETS, asset))
export const clearRecentTrends = () => saveRecent(RECENT_TRENDS, [])
export const clearRecentAssets = () => saveRecent(RECENT_ASSETS, [])
