import React, { useState, useEffect } from 'react'
import {
  getInsights,
  getSANFAMInsights,
  getMyInsights,
  getFollowingsInsights,
  getFollowingsCount
} from './queries'

const DEFAULT_STATE = []
const DEFAULT_ERROR_MSG = {}

const LoadInsights = {
  my: getMyInsights,
  followings: getFollowingsInsights,
  sanfam: getSANFAMInsights
}

const InsightsContext = React.createContext()
const InsightsToggleContext = React.createContext()
const InsightsActiveToggleContext = React.createContext()
const InsightsErrorContext = React.createContext()

export const InsightsProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE)
  const [toggle, setToggle] = useState()
  const [ErrorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG)

  function toggleInsight (newToggle) {
    setToggle(toggle === newToggle ? undefined : newToggle)
  }

  useEffect(() => {
    getFollowingsCount().then(
      count =>
        count === 0 &&
        setErrorMsg(state => Object.assign({ followings: 'No data' }, state))
    )
  }, [])

  useEffect(
    () => {
      if (!toggle) {
        return setState(DEFAULT_STATE)
      }

      let race = false
      const { key } = toggle
      const loadInsights = LoadInsights[key] || getInsights

      loadInsights(key)
        .then(insights => {
          if (!insights.length) {
            throw new Error('No data')
          }

          if (race) return

          setState(insights)
        })
        .catch(
          ({ message }) =>
            setErrorMsg(state => ({ ...state, [key]: message })) &&
            setState(DEFAULT_STATE)
        )

      return () => (race = true)
    },
    [toggle]
  )

  return (
    <InsightsContext.Provider value={state}>
      <InsightsActiveToggleContext.Provider value={toggle}>
        <InsightsErrorContext.Provider value={ErrorMsg}>
          <InsightsToggleContext.Provider value={toggleInsight}>
            {children}
          </InsightsToggleContext.Provider>
        </InsightsErrorContext.Provider>
      </InsightsActiveToggleContext.Provider>
    </InsightsContext.Provider>
  )
}

export function useInsights () {
  return React.useContext(InsightsContext)
}

export function useToggleInsight () {
  return React.useContext(InsightsToggleContext)
}

export function useActiveToggleInsight () {
  return React.useContext(InsightsActiveToggleContext)
}

export function useInsightsErrorMsg () {
  return React.useContext(InsightsErrorContext)
}
