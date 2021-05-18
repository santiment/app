import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useStore } from './stores'
import PaywallInfo from '../../ducks/Studio/Chart/PaywallInfo'

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
  return ReactDOM.createPortal(
    <PaywallInfo metrics={metrics} className='mrg-s mrg--r' />,
    target.querySelector('.studio-why-gaps')
  )
}

export default ChartWidget
