import React, { useState, useEffect } from 'react'
import { getChartColors } from '../../Chart/colors'

const DEFAULT_STATE = {}

const ColorContext = React.createContext()
const ColorUpdaterContext = React.createContext()

function ColorProvider ({ widget, children }) {
  const { metrics, comparables, MetricColor } = widget
  const [state, setState] = useState(MetricColor || DEFAULT_STATE)

  function updateMetricColor (metricKey, color) {
    const NewMetricColor = Object.assign({}, state, { [metricKey]: color })
    setState(NewMetricColor)
    widget.MetricColor = NewMetricColor
    widget.rerender()
  }

  useEffect(
    () => {
      const NewMetricColor = getChartColors(metrics.concat(comparables), state)
      setState(NewMetricColor)
      widget.MetricColor = NewMetricColor
    },
    [metrics, comparables]
  )

  return (
    <ColorContext.Provider value={state}>
      <ColorUpdaterContext.Provider value={updateMetricColor}>
        {children}
      </ColorUpdaterContext.Provider>
    </ColorContext.Provider>
  )
}

export function useMetricColor () {
  return React.useContext(ColorContext)
}

export function useColorByMetric ({ key }) {
  return React.useContext(ColorContext)[key]
}

export function useMetricColorUpdater () {
  return React.useContext(ColorUpdaterContext)
}

export default ColorProvider
