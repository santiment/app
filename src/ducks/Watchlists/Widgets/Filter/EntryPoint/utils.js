export const ALL_ASSETS_TEXT = 'All assets'

export const MESSAGES = {
  allAssets: 'Deselect ‘All assets’ to customize your Screener',
  empty: 'Please select at least one filter'
}

export const MAX_VISIBLE_SYMBOLS = 48

export function makeHumanReadableState (state) {
  if (!Array.isArray(state)) {
    return state
  } else {
    const stateNames = state.map(item => item['watchlistId'])
    return stateNames.join(', ')
  }
}
