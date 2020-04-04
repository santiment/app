import React from 'react'
import ChartSettingsContextMenu from '../../SANCharts/ChartSettingsContextMenu'
import { saveToggle } from '../../../utils/localStorage'

export default ({ setOptions, ...props }) => {
  function toggleMultichart () {
    setOptions(state => ({
      ...state,
      isMultiChartsActive: saveToggle(
        'isMultiChartsActive',
        !state.isMultiChartsActive
      )
    }))
  }

  function toggleScale () {
    setOptions(state => ({
      ...state,
      isLogScale: !state.isLogScale
    }))
  }

  function toggleCartesianGrid () {
    setOptions(state => ({
      ...state,
      isCartesianGridActive: saveToggle(
        'isCartesianGridActive',
        !state.isCartesianGridActive
      )
    }))
  }

  return (
    <ChartSettingsContextMenu
      onCartesianGridChange={toggleCartesianGrid}
      onScaleChange={toggleScale}
      onMultiChartsChange={toggleMultichart}
      {...props}
    />
  )
}
