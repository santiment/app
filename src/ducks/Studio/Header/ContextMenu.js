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

  function toggleClosestData () {
    setOptions(state => ({
      ...state,
      isClosestDataActive: saveToggle(
        'isClosestDataActive',
        !state.isClosestDataActive
      )
    }))
  }

  return (
    <ChartSettingsContextMenu
      onCartesianGridChange={toggleCartesianGrid}
      onScaleChange={toggleScale}
      onMultiChartsChange={toggleMultichart}
      onClosestDataChange={toggleClosestData}
      {...props}
    />
  )
}
