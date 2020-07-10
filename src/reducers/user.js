import { stores } from '../svelte'
import * as actions from '../actions/types'
import { updateUser } from '../stores/user'
import { updateUserSettings } from '../stores/user/settings'
import { updateUserSubscriptions } from '../stores/user/subscriptions'
import { loginUser, logoutUser } from '../stores/user/flow'

const { session } = stores()

export const initialState = {
  isLoading: true,
  error: false,
  data: {
    settings: {
      hasTelegramConnected: false,
      isTelegarmDeepLinkLoading: true,
      isTelegarmDeepLinkError: false,
      telegramDeepLink: '',
      signalNotifyEmail: false,
      signalNotifyTelegram: false,
      isTelegramConnecting: false,
      newsletterSubscription: 'OFF'
    },
    apikeys: [],
    subscriptions: []
  },
  account: null,
  token: null,
  hasMetamask: false,
  consent: null,
  insightDraft: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actions.USER_LOGIN_SUCCESS:
      loginUser()
      session.update(ses => {
        ses.currentUser = {
          ...action.user
        }
        return ses
      })
      return {
        ...initialState,
        error: false,
        isLoading: false,
        token: action.token,
        consent: action.consent,
        data: {
          ...action.user
        }
      }
    case actions.USER_LOGOUT_SUCCESS:
      logoutUser()
      return {
        ...initialState,
        error: false,
        isLoading: false,
        data: {},
        token: null,
        consent: null
      }
    case actions.USER_LOGIN_FAILED:
      return {
        ...state,
        error: true,
        isLoading: false,
        data: {},
        token: null,
        consent: null,
        errorMessage: action.payload
      }
    case actions.USER_EMAIL_CHANGE:
      updateUser({ email: action.email })
      return {
        ...state,
        data: {
          ...state.data,
          email: action.email
        }
      }
    case actions.USER_SUBSCRIPTION_CHANGE:
      const subscriptions = Array.isArray(state.data.subscriptions)
        ? [action.payload, ...state.data.subscriptions]
        : [action.payload]
      updateUserSubscriptions(subscriptions)
      return {
        ...state,
        data: {
          ...state.data,
          subscriptions
        }
      }
    case actions.USER_USERNAME_CHANGE:
      updateUser({ username: action.username })
      return {
        ...state,
        data: {
          ...state.data,
          username: action.username
        }
      }
    case actions.USER_AVATAR_CHANGE: {
      updateUser({ avatarUrl: action.avatarUrl })
      return {
        ...state,
        data: {
          ...state.data,
          avatarUrl: action.avatarUrl
        }
      }
    }
    case actions.USER_DIGEST_CHANGE:
      updateUserSettings({
        newsletterSubscription: action.payload
      })
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            newsletterSubscription: action.payload
          }
        }
      }

    case actions.USER_SETTING_GDPR:
      const { privacyPolicyAccepted, marketingAccepted } = action.payload
      updateUser({ privacyPolicyAccepted, marketingAccepted })
      return {
        ...state,
        data: {
          ...state.data,
          privacyPolicyAccepted,
          marketingAccepted
        }
      }
    case actions.USER_APIKEY_GENERATE_SUCCESS:
    case actions.USER_APIKEY_REVOKE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          apikeys: action.apikeys
        }
      }
    case actions.CHANGE_USER_DATA:
      if (!action.user) {
        return {
          ...initialState,
          hasMetamask: action.hasMetamask,
          isLoading: false
        }
      }
      session.update(ses => {
        ses.currentUser = {
          ...action.user
        }
        return ses
      })

      return {
        ...state,
        isLoading: false,
        data: {
          ...action.user,
          settings: {
            ...state.data.settings,
            ...action.user.settings
          }
        }
      }
    case actions.APP_USER_HAS_INACTIVE_TOKEN:
      return {
        ...initialState,
        isLoading: false
      }
    case actions.SETTINGS_CONNECT_TELEGRAM:
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            isTelegramConnecting: true
          }
        }
      }
    case actions.SETTINGS_CONNECT_TELEGRAM_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            hasTelegramConnected: true,
            isTelegramConnecting: false
          }
        }
      }
    case actions.SETTINGS_CONNECT_TELEGRAM_CANCEL:
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            isTelegramConnecting: false
          }
        }
      }
    case actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            ...action.payload
          }
        }
      }
    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK:
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            isTelegarmDeepLinkLoading: true,
            isTelegramConnecting: false
          }
        }
      }
    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            isTelegarmDeepLinkLoading: false,
            telegramDeepLink: action.payload.link
          }
        }
      }
    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_FAILED:
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            isTelegarmDeepLinkLoading: false,
            isTelegarmDeepLinkError: true,
            telegramDeepLink: undefined
          }
        }
      }
    case actions.SETTINGS_CONNECT_NEW_WALLET_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ethAccounts: action.payload.accounts
        }
      }
    case actions.SETTINGS_REMOVE_CONNECTED_WALLET_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ethAccounts: action.payload.accounts
        }
      }
    default:
      return state
  }
}
