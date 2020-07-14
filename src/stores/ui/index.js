import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { USER_SETTINGS_QUERY, updateUserSettings } from '../user/settings'

export const updateIsBetaMode = isBetaMode => updateUserSettings({ isBetaMode })

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
