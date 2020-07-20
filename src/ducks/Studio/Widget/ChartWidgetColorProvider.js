import React, { useState, useEffect } from 'react'
import { getChartColors } from '../../Chart/colors'

const DEFAULT_STATE = {}

const ColorContext = React.createContext()
const ColorUpdaterContext = React.createContext()

function ColorProvider ({ widget, rerenderWidgets, children }) {
  const { metrics, MetricColor } = widget
  const [state, setState] = useState(MetricColor || DEFAULT_STATE)

  function updateMetricColor (metricKey, color) {
    const NewMetricColor = Object.assign({}, state, { [metricKey]: color })
    setState(NewMetricColor)
    widget.MetricColor = NewMetricColor
    rerenderWidgets()
  }

  useEffect(
    () => {
      const NewMetricColor = getChartColors(metrics, state)
      setState(NewMetricColor)
      widget.MetricColor = NewMetricColor
    },
    [metrics]
  )

  return (
    <ColorContext.Provider value={state}>
      <ColorUpdaterContext.Provider value={updateMetricColor}>
        {children}
      </ColorUpdaterContext.Provider>
    </ColorContext.Provider>
  )
}

function useMetricColor () {
  return React.useContext(ColorContext)
}

function useColorByMetric ({ key }) {
  return React.useContext(ColorContext)[key]
}

function useMetricColorUpdater () {
  return React.useContext(ColorUpdaterContext)
}

export { useMetricColor, useColorByMetric, useMetricColorUpdater }
export default ColorProvider
