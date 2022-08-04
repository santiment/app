export const ASSETS_KEY = "RECENT_ASSETS_MOBILE_SEARCH"
export const TRENDS_KEY = "RECENT_TRENDS_MOBILE_SEARCH"
export const INSIGHTS_KEY = "RECENT_INSIGHTS_MOBILE_SEARCH"

export function getItems(key) {
    const items = window.localStorage.getItem(key)
    return items ? JSON.parse(items) : []
}

export function addItem(key, item) {
    const items = getItems(key)
    items.push(item)
    window.localStorage.setItem(key, JSON.stringify(items))
}

export function removeItem(key, item) {
    let items = getItems(key)
    items = items.filter(_item => JSON.stringify(_item) !== JSON.stringify(item))
    window.localStorage.setItem(key, JSON.stringify(items))
}
