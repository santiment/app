import { useMemo } from 'react'
import { saveJson, getSavedJson } from 'webkit/utils/localStorage'
import { TABS } from '../../components/Search/tabs'

export const ASSETS_KEY = 'RECENT_ASSETS_MOBILE_SEARCH'
export const TRENDS_KEY = 'RECENT_TRENDS_MOBILE_SEARCH'
export const INSIGHTS_KEY = 'RECENT_INSIGHTS_MOBILE_SEARCH'

export const getItems = (key) => getSavedJson(key, [])

export function addItem(key, item) {
  const items = getItems(key)
  items.push(item)
  saveJson(key, items)
}

export function removeItem(key, index) {
  const items = getItems(key)
  items.splice(index, 1)
  saveJson(key, items)
}

export const getFromTo = () => {
  const from = new Date()
  const to = new Date()
  to.setHours(to.getHours(), 0, 0, 0)
  from.setHours(from.getHours() - 1, 0, 0, 0)
  return [from, to]
}

export const useTabOptions = (selectedTab, term) => {
  const tabOptions = useMemo(() => {
    switch (selectedTab) {
      case TABS[0].index:
        return [
          TABS[0],
          () => getItems(ASSETS_KEY),
          (item) => addItem(ASSETS_KEY, item),
          (item) => removeItem(ASSETS_KEY, item),
          { minVolume: 0 },
        ]
      case TABS[1].index:
        const [from, to] = getFromTo()
        return [
          TABS[1],
          () => getItems(TRENDS_KEY),
          (item) => addItem(TRENDS_KEY, item),
          (item) => removeItem(TRENDS_KEY, item),
          { from, to },
        ]
      case TABS[2].index:
        return [
          TABS[2],
          () => getItems(INSIGHTS_KEY),
          (item) => addItem(INSIGHTS_KEY, item),
          (item) => removeItem(INSIGHTS_KEY, item),
          { searchTerm: term },
        ]
    }
  }, [selectedTab])

  return tabOptions
}
