import { useMemo } from 'react';
import { saveJson, getSavedJson } from 'webkit/utils/localStorage';
import { TABS } from '../../components/Search/tabs';
export const ASSETS_KEY = 'RECENT_ASSETS_MOBILE_SEARCH';
export const TRENDS_KEY = 'RECENT_TRENDS_MOBILE_SEARCH';
export const INSIGHTS_KEY = 'RECENT_INSIGHTS_MOBILE_SEARCH';
export const getItems = key => getSavedJson(key, []);
export function addItem(key, item) {
  const items = getItems(key);
  items.push(item);
  saveJson(key, items);
}
export function removeItem(key, index) {
  const items = getItems(key);
  items.splice(index, 1);
  saveJson(key, items);
}
export function getFromTo() {
  const from = new Date();
  const to = new Date();
  to.setHours(to.getHours(), 0, 0, 0);
  from.setHours(from.getHours() - 1, 0, 0, 0);
  return [from, to];
}
export const getItemControllers = KEY => ({
  getTabItems: () => getItems(KEY),
  addTabItem: item => addItem(KEY, item),
  removeTabItem: item => removeItem(KEY, item)
});
export function useTabOptions(selectedTab, term) {
  return useMemo(() => {
    switch (selectedTab) {
      case TABS[0].index:
        return [TABS[0], ASSETS_KEY, {
          minVolume: 0
        }];

      case TABS[1].index:
        const [from, to] = getFromTo();
        return [TABS[1], TRENDS_KEY, {
          from,
          to
        }];

      case TABS[2].index:
        return [TABS[2], INSIGHTS_KEY, {
          searchTerm: term
        }];

      default:
        throw new Error('Invalid selectedTab');
    }
  }, [selectedTab, term]);
}