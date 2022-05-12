import * as actions from './../actions/types'
import { loadKeyState } from '../utils/localStorage'
import { updateIsBetaMode } from '../stores/ui'
import { isShowHalloween } from '../utils/halloween'

const isNightMode = loadKeyState('isNightMode')
const isNightModeDeprecated = loadKeyState('isNightModeEnabled')
const isBetaMode = loadKeyState('isBetaMode')
const isBetaModeDeprecated = loadKeyState('isBetaModeEnabled')

const isNightModeEnabled =
  isShowHalloween() || (isNightMode !== undefined ? isNightMode : isNightModeDeprecated) || false
const isBetaModeEnabled = isBetaMode !== undefined ? isBetaMode : isBetaModeDeprecated || false

export const initialState = {
  isOnline: true,
  loginSuccess: false,
  loginError: false,
  isNightModeEnabled: isNightModeEnabled,
  isBetaModeEnabled: isBetaModeEnabled,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.APP_CHANGE_ONLINE_STATUS:
      return {
        ...state,
        isOnline: action.payload.isOnline,
      }
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
      }
    case actions.USER_LOGIN_FAILED:
      return {
        ...state,
        loginSuccess: false,
        loginError: true,
      }
    case actions.APP_USER_HAS_INACTIVE_TOKEN:
      return { ...state }
    case actions.APP_USER_NIGHT_MODE_SAVE:
      return {
        ...state,
        isNightModeEnabled: action.payload,
      }
    case actions.APP_USER_BETA_MODE_SAVE:
      updateIsBetaMode(action.payload)
      return {
        ...state,
        isBetaModeEnabled: action.payload,
      }
    default:
      return state
  }
}
