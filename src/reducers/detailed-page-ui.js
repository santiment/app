export const initialState = {
  isToggledMinimap: false,
  isToggledBurnRate: false,
  timeFilter: {
    timeframe: 'all',
    from: undefined,
    to: undefined,
    interval: '7d'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MINIMAP':
      return {
        ...state,
        isToggledMinimap: !state.isToggledMinimap
      }
    case 'TOGGLE_BURNRATE':
      return {
        ...state,
        isToggledBurnRate: !state.isToggledBurnRate
      }
    case 'CHANGE_TIME_FILTER':
      const { timeframe, from, to, interval } = action
      return {
        ...state,
        timeFilter: {
          timeframe,
          from,
          to,
          interval
        }
      }
    default:
      return state
  }
}
