import * as actions from './actions'

export const initialState = {
  isTelegarmDeepLinkLoading: true,
  isTelegarmDeepLinkError: false,
  telegramDeepLink: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK:
      return initialState
    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_SUCCESS:
      return {
        ...state,
        isTelegarmDeepLinkLoading: false,
        telegramDeepLink: action.payload.link
      }
    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_FAILED:
      return {
        isTelegarmDeepLinkLoading: false,
        isTelegarmDeepLinkError: true,
        telegramDeepLink: undefined
      }
    default:
      return state
  }
}
