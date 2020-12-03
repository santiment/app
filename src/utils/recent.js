const RECENT_ASSETS = 'RECENT_ASSETS'
const RECENT_WATCHLISTS = 'RECENT_WATCHLISTS'
const RECENT_SCREENERS = 'RECENT_SCREENERS'
const RECENT_TRENDS = 'RECENT_TRENDS_SEARCH'
const RECENT_TEMPLATES = 'RECENT_TEMPLATES'

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

// slugs array
export const getRecentAssets = () => getRecent(RECENT_ASSETS)
// IDs array
export const getRecentWatchlists = () => getRecent(RECENT_WATCHLISTS)
// IDs array
export const getRecentScreeners = () => getRecent(RECENT_SCREENERS)
// words array
export const getRecentTrends = () => getRecent(RECENT_TRENDS)
// IDs array
export const getRecentTemplates = () => getRecent(RECENT_TEMPLATES)

export const addRecentAssets = slug => addRecent(RECENT_ASSETS, slug)
export const addRecentTrends = word => addRecent(RECENT_TRENDS, word)
export const addRecentWatchlists = id => addRecent(RECENT_WATCHLISTS, id)
export const addRecentScreeners = id => addRecent(RECENT_SCREENERS, id)
export const addRecentTemplate = id =>
  addRecent(RECENT_TEMPLATES, id.toString())

export const removeRecentWatchlists = id =>
  saveRecent(RECENT_WATCHLISTS, removeRecent(RECENT_WATCHLISTS, id))
export const removeRecentScreeners = id =>
  saveRecent(RECENT_SCREENERS, removeRecent(RECENT_SCREENERS, id))
export const removeRecentTrends = word =>
  saveRecent(RECENT_TRENDS, removeRecent(RECENT_TRENDS, word))
export const removeRecentAssets = asset =>
  saveRecent(RECENT_ASSETS, removeRecent(RECENT_ASSETS, asset))
export const removeRecentTemplate = id =>
  saveRecent(RECENT_TEMPLATES, removeRecent(RECENT_TEMPLATES, id.toString()))

export const clearRecentTrends = () => saveRecent(RECENT_TRENDS, [])
export const clearRecentAssets = () => saveRecent(RECENT_ASSETS, [])
