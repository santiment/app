import * as actions from './../actions/types'
import { loadKeyState } from '../utils/localStorage'

const isNightMode = loadKeyState('isNightMode')
const isNightModeDeprecated = loadKeyState('isNightModeEnabled')
const isBetaModeEnabled = loadKeyState('isBetaModeEnabled') || false
const isNewsEnabled = loadKeyState('isNewsEnabled') || false

let isNightModeEnabled = isNightMode || false
if (isNightMode === undefined && isNightModeDeprecated !== undefined) {
  isNightModeEnabled = isNightModeDeprecated
}

if (isNightModeEnabled) {
  document.body.classList.add('night-mode')
}

export const initialState = {
  isOnline: true,
  loginPending: false,
  loginSuccess: false,
  loginError: false,
  loginErrorMessage: '',
  isNightModeEnabled: isNightModeEnabled,
  isBetaModeEnabled: isBetaModeEnabled,
  isNewsEnabled: isNewsEnabled,
  isSearchInputFocused: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.APP_CHANGE_ONLINE_STATUS:
      return {
        ...state,
        isOnline: action.payload.isOnline
      }
    case actions.USER_LOGIN_PENDING:
      return {
        ...state,
        loginPending: true
      }
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginPending: false,
        loginSuccess: true
      }
    case actions.USER_LOGIN_FAILED:
      return {
        ...state,
        loginPending: false,
        loginSuccess: false,
        loginError: true,
        loginErrorMessage: action.payload
      }
    case actions.APP_USER_HAS_INACTIVE_TOKEN:
      return { ...state }
    case actions.APP_USER_NIGHT_MODE_SAVE:
      return {
        ...state,
        isNightModeEnabled: action.payload
      }
    case actions.APP_USER_BETA_MODE_SAVE:
      return {
        ...state,
        isBetaModeEnabled: action.payload
      }
    case actions.APP_USER_NEWS_SAVE:
      return {
        ...state,
        isNewsEnabled: action.payload
      }
    case actions.APP_TOGGLE_SEARCH_FOCUS:
      return {
        ...state,
        isSearchInputFocused: !state.isSearchInputFocused
      }
    default:
      return state
  }
}
