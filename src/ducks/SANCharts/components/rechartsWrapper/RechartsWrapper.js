import React from 'react'
import { Line } from 'recharts'
import { chartBars } from '../../utils'
import debounce from 'lodash.debounce'

const withXYCoords = WrappedComponent => {
  class WithCoordWrapper extends React.Component {
    metricRef = React.createRef()

    componentDidUpdate (prevProps) {
      if (!this.xToYCoordinates && this.metricRef && this.props.current) {
        // HACK(vanguard): Thanks recharts
        this.getXToYCoordinates()
        this.forceUpdate()
      }

      const { chartData, isAdvancedView } = this.props

      if (
        chartData !== prevProps.chartData ||
        isAdvancedView !== prevProps.isAdvancedView
      ) {
        this.getXToYCoordinatesDebounced()
      }
    }

    componentWillUpdate (newProps) {
      const { chartData, chartRef } = newProps
      if (this.props.chartData !== chartData) {
        this.getXToYCoordinates()
        console.log(chartBars)
        chartBars.delete(chartRef.current)
      }
    }

    getXToYCoordinatesDebounced = debounce(() => {
      chartBars.delete(this.props.chartRef.current)
      this.getXToYCoordinates()
      // HACK(vanguard): Thanks recharts
      this.forceUpdate(this.forceUpdate)
    }, 100)

    getXToYCoordinates = () => {
      const { current } = this.metricRef
      if (!current) {
        return
      }

      const key = current instanceof Line ? 'points' : 'data'

      // HACK(vanguard): Because 'recharts' lib does not expose the "good" way to get coordinates
      this.xToYCoordinates = current.props[key] || []

      return true
    }

    render () {
      return (
        <WrappedComponent
          getXToYCoordinates={this.getXToYCoordinates}
          getXToYCoordinatesDebounced={this.getXToYCoordinatesDebounced}
          xToYCoordinates={this.xToYCoordinates}
          metricRef={this.metricRef}
          {...this.props}
        />
      )
    }
  }

  return WithCoordWrapper
}

export default withXYCoords
