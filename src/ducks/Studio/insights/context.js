import React, { useContext, useState, useEffect } from 'react'
import {
  getAllInsights,
  getPulseInsights,
  getTagInsights,
  getSANFAMInsights,
  getMyInsights,
  getProInsights,
  getFollowingsInsights
} from './queries'

const DEFAULT_STATE = []
const DEFAULT_ERROR_MSG = {}

const LoadInsights = {
  all: getAllInsights,
  pro: getProInsights,
  pulse: getPulseInsights,
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
  const [[toggle, from, to], setToggle] = useState(DEFAULT_STATE)
  const [ErrorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG)

  useEffect(
    () => {
      const { my, followings, sanfam } = ErrorMsg
      setErrorMsg({ my, followings, sanfam })
    },
    [from, to]
  )

  useEffect(
    () => {
      if (!toggle) {
        return setState(DEFAULT_STATE)
      }

      let race = false
      const { key } = toggle
      const loadInsights = LoadInsights[key] || getTagInsights

      loadInsights(from, to, key)
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
    [toggle, from, to]
  )

  function toggleInsight (newToggle, newFrom, newTo) {
    if (newFrom !== from || newTo !== to) {
      setToggle([newToggle, newFrom, newTo])
    } else {
      setToggle([newToggle === toggle ? undefined : newToggle, newFrom, newTo])
    }
  }

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

export const useInsights = () => useContext(InsightsContext)
export const useToggleInsight = () => useContext(InsightsToggleContext)
export const useInsightsErrorMsg = () => useContext(InsightsErrorContext)
export const useActiveToggleInsight = () =>
  useContext(InsightsActiveToggleContext)

export const withInsightsProvider = Component => props => (
  <InsightsProvider>
    <Component {...props} />
  </InsightsProvider>
)
