import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { client } from '../../index'

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

export function updateUserSettings (newUserSettings) {
  const { currentUser } = client.readQuery({
    query: USER_SETTINGS_QUERY
  })

  if (newUserSettings) {
    Object.assign(currentUser.settings, newUserSettings)
  }

  client.writeQuery({
    query: USER_SETTINGS_QUERY,
    data: {
      currentUser: newUserSettings && Object.assign({}, currentUser)
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
        settings: data && data.currentUser.settings
      }
    },
    [query]
  )
}
