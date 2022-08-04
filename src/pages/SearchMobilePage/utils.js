import { saveJson, getSavedJson } from 'webkit/utils/localStorage'

export const ASSETS_KEY = "RECENT_ASSETS_MOBILE_SEARCH"
export const TRENDS_KEY = "RECENT_TRENDS_MOBILE_SEARCH"
export const INSIGHTS_KEY = "RECENT_INSIGHTS_MOBILE_SEARCH"

export const getItems = key => getSavedJson(key, [])

export function addItem(key, item) {
    const items = getItems(key)
    items.push(item)
    saveJson(key, items)
}

export function removeItem(key, item) {
    let items = getItems(key)
    const term = JSON.stringify(item)
    items = items.filter(_item => JSON.stringify(_item) !== term)
    saveJson(key, items)
}

export const getFromTo = () => {
    const from = new Date()
    const to = new Date()
    to.setHours(to.getHours(), 0, 0, 0)
    from.setHours(from.getHours() - 1, 0, 0, 0)
    return [from, to]
}