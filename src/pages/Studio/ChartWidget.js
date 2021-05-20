import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useStore } from './stores'
import Insights from './Insights'
import PaywallInfo from '../../ducks/Studio/Chart/PaywallInfo'

export function useWidgetsController () {
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

const ChartWidget = ({ widget, target, InsightsStore }) => {
  const metrics = useWidgetMetrics(widget)
  const whyTheGapsNode = target.querySelector('.studio-why-gaps')

  return (
    <>
      {whyTheGapsNode &&
        ReactDOM.createPortal(
          <PaywallInfo metrics={metrics} className='mrg-s mrg--r' />,
          whyTheGapsNode
        )}

      <Insights widget={widget} InsightsStore={InsightsStore} />
    </>
  )
}

export default ChartWidget
