import React, { useState, useEffect } from 'react'
import { USER_SETTINGS_QUERY } from '../user/settings'
import { loadKeyState } from '../../utils/localStorage'
import { client } from '../../apollo'

const NIGHTMODE = 'nightmode'
export const THEMES = ['default', NIGHTMODE]
const DEFAULT_STATE = { isNightMode: loadKeyState('isNightMode') || false }
const WATCH_QUERY = { query: USER_SETTINGS_QUERY }

const ThemeContext = React.createContext()
const ThemeUpdaterContext = React.createContext()
let themeUpdater // TODO: Remove it after completle migrating from theme epic [@vanguard | Jul 11, 2020]

function ThemeProvider ({ children }) {
  const [state, setState] = useState(DEFAULT_STATE)

  function updateTheme (isNightMode) {
    setState({
      isNightMode
    })
  }

  // NOTE: Watching for saved account theme [@vanguard | Jul 11, 2020]
  useEffect(() => {
    const subscription = client
      .watchQuery(WATCH_QUERY)
      .subscribe(({ data }) => {
        if (!(data && data.currentUser)) return

        const isAccountNightMode = data.currentUser.settings.theme === NIGHTMODE

        setState(state => {
          const { isNightMode } = state
          return isNightMode === isAccountNightMode
            ? state
            : {
              isNightMode: isNightMode || isAccountNightMode
            }
        })

        subscription.unsubscribe()
      })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(
    () => {
      themeUpdater = updateTheme
      return () => (themeUpdater = null)
    },
    [updateTheme]
  )

  return (
    <ThemeContext.Provider value={state}>
      <ThemeUpdaterContext.Provider value={updateTheme}>
        {children}
      </ThemeUpdaterContext.Provider>
    </ThemeContext.Provider>
  )
}

function useTheme () {
  return React.useContext(ThemeContext)
}

function useThemeUpdater () {
  return React.useContext(ThemeUpdaterContext)
}

function updateTheme (isNightMode) {
  if (themeUpdater) {
    themeUpdater(isNightMode)
  }
}

export { ThemeProvider, useTheme, useThemeUpdater, updateTheme }
