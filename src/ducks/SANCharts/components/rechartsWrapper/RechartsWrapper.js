import React from 'react'
import { Line } from 'recharts'
import { chartBars } from '../../utils'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'

const withXYCoords = WrappedComponent => {
  class WithCoordWrapper extends React.Component {
    metricRef = React.createRef()
    state = {}

    clearAndCalculateXY = newProps => {
      const { chartRef } = newProps
      chartBars.delete(chartRef.current)
      this.getXToYCoordinates()
    }

    componentWillUpdate (newProps) {
      const { chartData } = newProps
      if (this.props.chartData !== chartData) {
        this.clearAndCalculateXY(newProps)
      }
    }

    getXToYCoordinatesDebounced = debounce(() => {
      // console.log("getXToYCoordinatesDebounced")
      this.clearAndCalculateXY(this.props)
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
