import React, { useState, useEffect } from 'react'
import {
  getInsights,
  getSANFAMInsights,
  getMyInsights,
  getFollowingsInsights
} from './queries'

const InsightsContext = React.createContext()
const InsightsToggleContext = React.createContext()

const LoadInsights = {
  my: getMyInsights,
  followings: getFollowingsInsights,
  sanfam: getSANFAMInsights
}

const DEFAULT_STATE = []

const InsightsProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE)
  const [toggle, setToggle] = useState({ key: 'followings' })

  function toggleInsight (newToggle) {
    setToggle(toggle === newToggle ? undefined : newToggle)
  }

  useEffect(
    () => {
      if (!toggle) {
        return setState(DEFAULT_STATE)
      }

      const { key } = toggle
      const abortController = new AbortController()
      const loadInsights = LoadInsights[key] || getInsights

      loadInsights(abortController.signal, key).then(insights => {
        setState(insights)
        console.log(insights)
      })

      return () => abortController.abort()
    },
    [toggle]
  )

  return (
    <InsightsContext.Provider value={state}>
      <InsightsToggleContext.Provider value={toggleInsight}>
        {children}
      </InsightsToggleContext.Provider>
    </InsightsContext.Provider>
  )
}

function useInsights () {
  return React.useContext(InsightsContext)
}

function useToggleInsight () {
  return React.useContext(InsightsToggleContext)
}

export { InsightsProvider, useInsights, useToggleInsight }
