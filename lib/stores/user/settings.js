const _excluded = ["newsletterSubscription"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { buildRefetcher, update } from './utils';
import { client } from '../../apollo';
export const DEFAULT_SETTINGS = {
  isBetaMode: false,
  isPromoter: false,
  hasTelegramConnected: false,
  hidePrivacyData: true,
  alertNotifyEmail: false,
  alertNotifyTelegram: false,
  pageSize: 20,
  theme: 'default',
  alertsPerDayLimit: {}
};
export const USER_SETTINGS_FRAGMENT = gql`
  fragment userSettigsFragment on UserSettings {
    hidePrivacyData
    isBetaMode
    pageSize
    alertNotifyEmail
    alertNotifyTelegram
    hasTelegramConnected
    alertsPerDayLimit
    theme
    isSubscribedBiweeklyReport
    isSubscribedCommentsEmails
    isSubscribedEduEmails
    isSubscribedLikesEmails
    isSubscribedMarketingEmails
    isSubscribedMonthlyNewsletter
  }
`;
const TOGGLE_CHANNEL_MUTATION = gql`
  mutation settingsToggleChannel($alertNotifyEmail: Boolean, $alertNotifyTelegram: Boolean) {
    settingsToggleChannel(
      alertNotifyEmail: $alertNotifyEmail
      alertNotifyTelegram: $alertNotifyTelegram
    ) {
      alertNotifyEmail
      alertNotifyTelegram
    }
  }
`;
export const USER_SETTINGS_QUERY = gql`
  {
    currentUser {
      id
      email
      settings {
        isPromoter
        ...userSettigsFragment
      }
    }
  }

  ${USER_SETTINGS_FRAGMENT}
`;
const UPDATE_USER_SETTINGS_MUTATION = gql`
  mutation updateUserSettings($settings: UserSettingsInputObject!) {
    updateUserSettings(settings: $settings) {
      ...userSettigsFragment
    }
  }

  ${USER_SETTINGS_FRAGMENT}
`;
export const refetchUserSettings = buildRefetcher(USER_SETTINGS_QUERY);

const getCurrentUser = () => {
  const {
    currentUser
  } = client.readQuery({
    query: USER_SETTINGS_QUERY
  });
  return currentUser;
};

export function updateUserSettingsCache(newUserSettings) {
  const currentUser = getCurrentUser();
  client.writeQuery({
    query: USER_SETTINGS_QUERY,
    data: {
      currentUser: newUserSettings && _extends({}, currentUser, {
        settings: _extends({}, currentUser.settings, update(currentUser.settings, newUserSettings))
      })
    }
  });
}
export function useUserSettings() {
  const query = useQuery(USER_SETTINGS_QUERY);
  return useMemo(() => {
    const {
      loading,
      data
    } = query;
    return {
      loading,
      settings: data && data.currentUser ? _objectSpread(_objectSpread({}, data.currentUser.settings), {}, {
        isTelegramAllowAlerts: data.currentUser.settings.alertNotifyTelegram && data.currentUser.settings.hasTelegramConnected,
        isEmailConnected: !!data.currentUser.email,
        isEmailAllowAlerts: data.currentUser.settings.alertNotifyEmail && data.currentUser.email
      }) : DEFAULT_SETTINGS
    };
  }, [query]);
}
export function useUpdateUserSettings() {
  const [mutate, data] = useMutation(UPDATE_USER_SETTINGS_MUTATION, {
    update: (proxy, {
      data: {
        updateUserSettings
      }
    }) => {
      updateUserSettingsCache(updateUserSettings);
    }
  });

  function update(newSettings) {
    const currentUser = getCurrentUser();

    const _currentUser$settings = currentUser.settings,
          {
      newsletterSubscription
    } = _currentUser$settings,
          otherSettings = _objectWithoutProperties(_currentUser$settings, _excluded);

    const merged = _objectSpread(_objectSpread({}, otherSettings), newSettings);

    if (typeof merged.alertsPerDayLimit === 'object') {
      merged.alertsPerDayLimit = JSON.stringify(merged.alertsPerDayLimit);
    }

    delete merged.isPromoter;
    delete merged.__typename;
    return mutate({
      variables: {
        settings: merged
      }
    });
  }

  return [update, data];
}
export function useUpdateUserNotifications() {
  const [mutate, data] = useMutation(TOGGLE_CHANNEL_MUTATION, {
    update: (proxy, {
      data: {
        settingsToggleChannel
      }
    }) => {
      updateUserSettingsCache(settingsToggleChannel);
    }
  });

  function update(variables) {
    return mutate({
      variables
    });
  }

  return [update, data];
}