import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { USER_QUERY } from './user'
import { USER_SETTINGS_QUERY, updateUserSettings } from './user/settings'

const NIGHTMODE = 'nightmode'
export const THEMES = ['default', NIGHTMODE]

export const updateIsNightMode = isNightMode =>
  updateUserSettings({ theme: THEMES[+isNightMode] })

export const updateIsBetaMode = isBetaMode => updateUserSettings({ isBetaMode })

export function useIsLoggedIn () {
  const query = useQuery(USER_QUERY)

  return useMemo(
    () => {
      const { data } = query
      return data && !!data.currentUser
    },
    [query]
  )
}

export function useIsNightMode () {
  const query = useQuery(USER_SETTINGS_QUERY)

  return useMemo(
    () => {
      const { data } = query
      return (
        data &&
        data.currentUser &&
        data.currentUser.settings.theme === NIGHTMODE
      )
    },
    [query]
  )
}

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
