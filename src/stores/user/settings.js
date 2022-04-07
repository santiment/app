import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { buildRefetcher, update } from './utils'
import { client } from '../../apollo'

export const DEFAULT_SETTINGS = {
  isBetaMode: false,
  isPromoter: false,
  hasTelegramConnected: false,
  hidePrivacyData: true,
  alertNotifyEmail: false,
  alertNotifyTelegram: false,
  pageSize: 20,
  theme: 'default',
  newsletterSubscription: 'OFF',
  alertsPerDayLimit: {},
}

export const USER_SETTINGS_FRAGMENT = gql`
  fragment userSettigsFragment on UserSettings {
    hidePrivacyData
    isBetaMode
    newsletterSubscription
    pageSize
    alertNotifyEmail
    alertNotifyTelegram
    hasTelegramConnected
    alertsPerDayLimit
    theme
  }
`

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
`

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
`
const UPDATE_USER_SETTINGS_MUTATION = gql`
  mutation updateUserSettings($settings: UserSettingsInputObject!) {
    updateUserSettings(settings: $settings) {
      ...userSettigsFragment
    }
  }

  ${USER_SETTINGS_FRAGMENT}
`

export const refetchUserSettings = buildRefetcher(USER_SETTINGS_QUERY)

const getCurrentUser = () => {
  const { currentUser } = client.readQuery({
    query: USER_SETTINGS_QUERY,
  })

  return currentUser
}

export function updateUserSettingsCache (newUserSettings) {
  const currentUser = getCurrentUser()

  client.writeQuery({
    query: USER_SETTINGS_QUERY,
    data: {
      currentUser:
        newUserSettings &&
        Object.assign({}, currentUser, {
          settings: Object.assign(
            {},
            currentUser.settings,
            update(currentUser.settings, newUserSettings),
          ),
        }),
    },
  })
}

export function useUserSettings () {
  const query = useQuery(USER_SETTINGS_QUERY)

  return useMemo(() => {
    const { loading, data } = query

    return {
      loading,
      settings:
        data && data.currentUser
          ? {
              ...data.currentUser.settings,
              isTelegramAllowAlerts:
                data.currentUser.settings.alertNotifyTelegram &&
                data.currentUser.settings.hasTelegramConnected,
              isEmailConnected: !!data.currentUser.email,

              isEmailAllowAlerts:
                data.currentUser.settings.alertNotifyEmail && data.currentUser.email,
            }
          : DEFAULT_SETTINGS,
    }
  }, [query])
}

export function useUpdateUserSettings () {
  const [mutate, data] = useMutation(UPDATE_USER_SETTINGS_MUTATION, {
    update: (proxy, { data: { updateUserSettings } }) => {
      updateUserSettingsCache(updateUserSettings)
    },
  })

  function update (newSettings) {
    const currentUser = getCurrentUser()

    const merged = { ...currentUser.settings, ...newSettings }

    if (typeof merged.alertsPerDayLimit === 'object') {
      merged.alertsPerDayLimit = JSON.stringify(merged.alertsPerDayLimit)
    }

    delete merged.isPromoter
    delete merged.__typename

    return mutate({
      variables: {
        settings: merged,
      },
    })
  }

  return [update, data]
}

export function useUpdateUserNotifications () {
  const [mutate, data] = useMutation(TOGGLE_CHANNEL_MUTATION, {
    update: (proxy, { data: { settingsToggleChannel } }) => {
      updateUserSettingsCache(settingsToggleChannel)
    },
  })

  function update (variables) {
    return mutate({
      variables,
    })
  }

  return [update, data]
}
