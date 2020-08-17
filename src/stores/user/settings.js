import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { buildRefetcher, update } from './utils'
import { client } from '../../apollo'

export const DEFAULT_SETTINGS = {
  isBetaMode: false,
  isPromoter: false,
  hasTelegramConnected: false,
  hidePrivacyData: true,
  signalNotifyEmail: false,
  signalNotifyTelegram: false,
  pageSize: 20,
  tableColumns: {},
  theme: 'default',
  newsletterSubscription: 'OFF'
}

export const USER_SETTINGS_QUERY = gql`
  {
    currentUser {
      id
      settings {
        hasTelegramConnected
        hidePrivacyData
        isBetaMode
        isPromoter
        newsletterSubscription
        pageSize
        signalNotifyEmail
        signalNotifyTelegram
        tableColumns
        theme
      }
    }
  }
`

export const refetchUserSettings = buildRefetcher(USER_SETTINGS_QUERY)

export function updateUserSettings (newUserSettings) {
  const { currentUser } = client.readQuery({
    query: USER_SETTINGS_QUERY
  })

  client.writeQuery({
    query: USER_SETTINGS_QUERY,
    data: {
      currentUser:
        newUserSettings &&
        Object.assign({}, currentUser, {
          settings: Object.assign(
            {},
            currentUser.settings,
            update(currentUser.settings, newUserSettings)
          )
        })
    }
  })
}

export function useUserSettings () {
  const query = useQuery(USER_SETTINGS_QUERY)

  return useMemo(
    () => {
      const { loading, data } = query
      return {
        loading,
        settings: data && data.currentUser && data.currentUser.settings
      }
    },
    [query]
  )
}
