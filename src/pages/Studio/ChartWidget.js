import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { get } from 'svelte/store'
import PaywallInfo from '../../ducks/Studio/Chart/PaywallInfo'

function useStore (store, immute = _ => _) {
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

export function useWidgets () {
  const [widgets, setWidgets] = useState([])

  function onWidget (target, widget) {
    const Widget = { widget, target }
    setWidgets(widgets => [...widgets, Widget])
    const filter = widget => widget !== Widget
    return () => setWidgets(widgets => widgets.filter(filter))
  }

  return {
    widgets,
    onWidget
  }
}

const metricsImmute = metrics => metrics.slice()
function useWidgetMetrics (widget) {
  return useStore(widget.Metrics, metricsImmute)
}

const ChartWidget = ({ widget, target }) => {
  const metrics = useWidgetMetrics(widget)
  console.log(metrics)
  return ReactDOM.createPortal(
    <PaywallInfo metrics={metrics} className='mrg-s mrg--r' />,
    target.querySelector('.studio-why-gaps')
  )
}

export default ChartWidget
