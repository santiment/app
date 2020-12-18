export const ALL_ASSETS_TEXT = 'All assets'

export const MESSAGES = {
  allAssets: 'Deselect ‘All assets’ to customize your Screener',
  empty: 'Please select at least one filter'
}

export function makeHumanReadableState (state) {
  return Array.isArray(state) ? state.join(', ') : state
}
