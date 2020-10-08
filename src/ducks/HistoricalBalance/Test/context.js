import React, { useContext, useState, useEffect } from 'react'
import { updateChartState } from '@santiment-network/chart'
import { linearScale } from '@santiment-network/chart/scales'
import { usePlotter } from './plotter'
import { clearCtx } from '../../Chart/utils'
import { domainModifier } from '../../Chart/domain'
import { paintConfigs } from '../../Chart/paintConfigs'
import { useTheme } from '../../../stores/ui/theme'

const ChartContext = React.createContext()
const ChartSetterContext = React.createContext()
const ChartPlotterContext = React.createContext()

export const ChartProvider = ({
  data,
  scale,
  colors,
  categories,
  domainGroups,
  children
}) => {
  const [chart, setChart] = useState()
  const plotter = usePlotter()
  const { isNightMode } = useTheme()

  useEffect(
    () => {
      if (chart) {
        Object.assign(chart, paintConfigs[+isNightMode])
      }
    },
    [chart, isNightMode]
  )

  useEffect(
    () => {
      if (data.length === 0) return

      clearCtx(chart)

      updateChartState(
        chart,
        data,
        categories.joinedCategories,
        domainModifier,
        domainGroups
      )

      plotter.items.forEach(clb => {
        clb(chart, scale, data, colors, categories)
      })
    },
    [data, colors, domainGroups, isNightMode]
  )

  return (
    <ChartPlotterContext.Provider value={plotter}>
      <ChartSetterContext.Provider value={setChart}>
        <ChartContext.Provider value={chart}>{children}</ChartContext.Provider>
      </ChartSetterContext.Provider>
    </ChartPlotterContext.Provider>
  )
}

ChartProvider.defaultProps = {
  scale: linearScale
}

export const useChart = () => useContext(ChartContext)
export const useChartSetter = () => useContext(ChartSetterContext)
export const useChartPlotter = () => useContext(ChartPlotterContext)
export const buildPlotter = plotter => props => {
  plotter(useChartPlotter(), props)
  return null
}

export const withChartContext = Component => ({
  data,
  scale,
  colors,
  categories,
  domainGroups,
  ...props
}) => (
  <ChartProvider
    data={data}
    scale={scale}
    colors={colors}
    categories={categories}
    domainGroups={domainGroups}
  >
    <Component {...props} />
  </ChartProvider>
)
