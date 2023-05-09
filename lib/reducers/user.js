function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { updateAmplitude } from 'webkit/analytics/amplitude';
import { stores } from '../svelte';
import * as actions from '../actions/types';
import { updateUser } from '../stores/user';
import { updateUserSubscriptions } from '../stores/user/subscriptions';
import { loginUser, logoutUser } from '../stores/user/flow';
const {
  session
} = stores();
export const initialState = {
  isLoading: true,
  error: false,
  data: {
    settings: {
      isTelegarmDeepLinkLoading: true,
      isTelegarmDeepLinkError: false,
      telegramDeepLink: '',
      isTelegramConnecting: false
    },
    apikeys: [],
    subscriptions: []
  },
  account: null,
  token: null,
  hasMetamask: false,
  consent: null
};
export default ((state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_SUCCESS:
      loginUser();
      session.update(ses => {
        ses.currentUser = _objectSpread({}, action.user);
        return ses;
      });
      return _objectSpread(_objectSpread({}, initialState), {}, {
        error: false,
        isLoading: false,
        token: action.token,
        consent: action.consent,
        data: _objectSpread({}, action.user)
      });

    case actions.USER_LOGOUT_SUCCESS:
      logoutUser();
      return _objectSpread(_objectSpread({}, initialState), {}, {
        error: false,
        isLoading: false,
        data: {},
        token: null,
        consent: null
      });

    case actions.USER_LOGIN_FAILED:
      return _objectSpread(_objectSpread({}, state), {}, {
        error: true,
        isLoading: false,
        data: {},
        token: null,
        consent: null,
        errorMessage: action.payload
      });

    case actions.USER_EMAIL_CHANGE:
      updateUser({
        email: action.email
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          email: action.email
        })
      });

    case actions.USER_SUBSCRIPTION_CHANGE:
      const subscriptions = Array.isArray(state.data.subscriptions) ? [action.payload, ...state.data.subscriptions] : [action.payload];
      updateUserSubscriptions(subscriptions);
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          subscriptions
        })
      });

    case actions.USER_USERNAME_CHANGE:
      updateUser({
        username: action.username
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          username: action.username
        })
      });

    case actions.USER_NAME_CHANGE:
      updateUser({
        name: action.name
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          name: action.name
        })
      });

    case actions.USER_AVATAR_CHANGE:
      {
        updateUser({
          avatarUrl: action.avatarUrl
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            avatarUrl: action.avatarUrl
          })
        });
      }

    case actions.USER_SETTING_GDPR:
      const {
        privacyPolicyAccepted,
        marketingAccepted
      } = action.payload;
      updateUser({
        privacyPolicyAccepted,
        marketingAccepted
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          privacyPolicyAccepted,
          marketingAccepted
        })
      });

    case actions.USER_APIKEY_GENERATE_SUCCESS:
    case actions.USER_APIKEY_REVOKE_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          apikeys: action.apikeys
        })
      });

    case actions.CHANGE_USER_DATA:
      const {
        user
      } = action;

      if (!user) {
        return _objectSpread(_objectSpread({}, initialState), {}, {
          hasMetamask: action.hasMetamask,
          isLoading: false
        });
      }

      session.update(ses => {
        ses.currentUser = _objectSpread({}, user);
        return ses;
      });
      updateAmplitude(user.id, user.username, user.email);
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoading: false,
        data: _objectSpread(_objectSpread({}, action.user), {}, {
          settings: _objectSpread(_objectSpread({}, state.data.settings), action.user.settings)
        })
      });

    case actions.APP_USER_HAS_INACTIVE_TOKEN:
      return _objectSpread(_objectSpread({}, initialState), {}, {
        isLoading: false
      });

    case actions.SETTINGS_CONNECT_TELEGRAM:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          settings: _objectSpread(_objectSpread({}, state.data.settings), {}, {
            isTelegramConnecting: true
          })
        })
      });

    case actions.SETTINGS_CONNECT_TELEGRAM_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          settings: _objectSpread(_objectSpread({}, state.data.settings), {}, {
            hasTelegramConnected: true,
            isTelegramConnecting: false
          })
        })
      });

    case actions.SETTINGS_CONNECT_TELEGRAM_CANCEL:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          settings: _objectSpread(_objectSpread({}, state.data.settings), {}, {
            isTelegramConnecting: false
          })
        })
      });

    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          settings: _objectSpread(_objectSpread({}, state.data.settings), {}, {
            isTelegarmDeepLinkLoading: true,
            isTelegramConnecting: false
          })
        })
      });

    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          settings: _objectSpread(_objectSpread({}, state.data.settings), {}, {
            isTelegarmDeepLinkLoading: false,
            telegramDeepLink: action.payload.link
          })
        })
      });

    case actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK_FAILED:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          settings: _objectSpread(_objectSpread({}, state.data.settings), {}, {
            isTelegarmDeepLinkLoading: false,
            isTelegarmDeepLinkError: true,
            telegramDeepLink: undefined
          })
        })
      });

    case actions.SETTINGS_CONNECT_NEW_WALLET_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          ethAccounts: action.payload.accounts
        })
      });

    case actions.SETTINGS_REMOVE_CONNECTED_WALLET_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: _objectSpread(_objectSpread({}, state.data), {}, {
          ethAccounts: action.payload.accounts
        })
      });

    default:
      return state;
  }
});