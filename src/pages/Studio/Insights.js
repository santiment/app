import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { newInsightsContextStore } from 'studio/Sidebar/Metrics/Insights/context'
import { useStore } from './stores'
import { loadInsights } from '../../ducks/Studio/insights/context'
import { getFollowingsCount, getMyInsights } from '../../ducks/Studio/insights/queries'
import ChartInsights from '../../ducks/Studio/Chart/Insights'

export const useInsightsStoreCreator = () => useMemo(newInsightsContextStore, [])

const immute = (v) => Object.assign({}, v)
const useInsightsContext = (store) => useStore(store, immute)

const Insights = ({ InsightsStore, widget }) => {
  const store = useInsightsContext(InsightsStore)
  const [insights, setInsights] = useState([])
  const [, setErrorMsg] = useState({})
  const [wasUserInfoFetcher, setWasUserInfoFetcher] = useState(false)

  useEffect(() => {
    if (wasUserInfoFetcher) return
    setWasUserInfoFetcher(true)

    getMyInsights().then((insights) => InsightsStore.apply({ hasMyInsights: !!insights.length }))
    getFollowingsCount().then((count) => InsightsStore.apply({ hasFollowings: !!count }))
  }, [!!store.insight])

  useEffect(() => {
    const { insight, from, to } = store
    if (!insight) return setInsights([])

    let race = false
    loadInsights(insight.key, from, to)
      .then((insights) => {
        if (race) return
        setInsights(insights)
      })
      .catch(({ message }) => {
        if (race) return
        setErrorMsg((state) => ({ ...state, [insight.key]: message }))
        setInsights([])
      })

    return () => (race = true)
  }, [store])

  const { chart } = widget
  const target = chart && chart.canvas.parentNode
  return target
    ? ReactDOM.createPortal(<ChartInsights chart={widget.chart} insights={insights} />, target)
    : null
}

export default Insights
