import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { USER_SETTINGS_QUERY, updateUserSettingsCache } from '../user/settings'

export const updateIsBetaMode = isBetaMode =>
  updateUserSettingsCache({ isBetaMode })

export function useIsBetaMode () {
  const query = useQuery(USER_SETTINGS_QUERY)

  return useMemo(
    () => {
      const { data } = query
      return data && data.currentUser && data.currentUser.settings.isBetaMode
    },
    [query]
  )
}
