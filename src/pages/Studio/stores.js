import { useState, useEffect } from 'react'
import { get } from 'svelte/store'
import { globals } from 'studio/stores/globals'
import { studio } from 'studio/stores/studio'
import { useTheme } from '../../stores/ui/theme'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'

export const getSvelteContext = (cmp, ctx) => cmp && cmp.$$.context.get(ctx)
export function useStore (store, immute = _ => _) {
  const [state, setState] = useState(() => store && get(store))
  useEffect(
    () =>
      store &&
      store.subscribe(value => {
        setState(immute(value))
      }),
    [store]
  )
  return state
}

export function useGlobalsUpdater () {
  const theme = useTheme()
  const userInfo = useUserSubscriptionStatus()

  useEffect(
    () => {
      globals.toggle('isNightMode', theme.isNightMode)
      globals.toggle('isLoggedIn', userInfo.isLoggedIn)
      globals.toggle('isPro', userInfo.isPro)
      globals.toggle('isProPlus', userInfo.isProPlus)
    },
    [userInfo, theme]
  )
}

const settingsImmute = store => Object.assign({}, store)
export const useSettings = () => useStore(studio, settingsImmute)

const widgetsImmute = store => store.slice()
export const useWidgets = studio =>
  useStore(getSvelteContext(studio, 'widgets'), widgetsImmute) || []

const noop = () => {}
export function useStudioMetrics (studio) {
  const widgets = useWidgets(studio)
  const [metrics, setMetrics] = useState([])

  useEffect(
    () => {
      const unsubs = new Array(widgets.length)
      const WidgetMetric = {}

      widgets.forEach((widget, i) => {
        if (!widget.Metrics) return (unsubs[i] = noop)

        unsubs[i] = widget.Metrics.subscribe(metrics => {
          WidgetMetric[widget.id] = metrics
          updateMetrics()
        })
      })

      function updateMetrics () {
        setMetrics(Array.from(new Set(Object.values(WidgetMetric).flat())))
      }

      const unsubscribe = unsub => unsub()
      return () => unsubs.forEach(unsubscribe)
    },
    [widgets]
  )

  return metrics
}
