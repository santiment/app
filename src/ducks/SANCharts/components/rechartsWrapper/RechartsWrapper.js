import React from 'react'
import { Line } from 'recharts'
import { chartBars } from '../../utils'
import throttle from 'lodash.throttle'

const withXYCoords = WrappedComponent => {
  class WithCoordWrapper extends React.Component {
    metricRef = React.createRef()
    state = {}

    clearBarsAndCalculateXY = newProps => {
      const { chartRef } = newProps || this.props
      if (chartRef) {
        this.getXToYCoordinates()
        chartBars.delete(chartRef.current)
      }
    }

    componentWillUpdate (newProps) {
      const { chartData } = newProps
      if (this.props.chartData !== chartData) {
        this.clearBarsAndCalculateXY(newProps)
      }
    }

    getXToYCoordinatesDebounced = throttle(callback => {
      this.clearBarsAndCalculateXY()
      callback && callback()
    }, 100)

    getXToYCoordinates = () => {
      const { current } = this.metricRef
      if (!current) {
        return
      }

      const key = current instanceof Line ? 'points' : 'data'

      // HACK(vanguard): Because 'recharts' lib does not expose the "good" way to get coordinates
      this.setState({ xToYCoordinates: current.props[key] || [] })

      return true
    }

    render () {
      return (
        <WrappedComponent
          getXToYCoordinates={this.getXToYCoordinates}
          getXToYCoordinatesDebounced={this.getXToYCoordinatesDebounced}
          clearBarsAndCalculateXY={this.clearBarsAndCalculateXY}
          xToYCoordinates={this.state.xToYCoordinates}
          metricRef={this.metricRef}
          {...this.props}
        />
      )
    }
  }

  return WithCoordWrapper
}

export default withXYCoords
