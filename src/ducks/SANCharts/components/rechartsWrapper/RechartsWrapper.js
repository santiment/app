import React from 'react'
import { Line } from 'recharts'

const withXYCoords = WrappedComponent => {
  class WithCoordWrapper extends React.Component {
    state = {
      xToYCoordinates: undefined
    }

    metricRef = React.createRef()

    componentDidUpdate (prevProps) {
      if (!this.state.xToYCoordinates && this.metricRef && this.props.current) {
        // HACK(vanguard): Thanks recharts
        this.getXToYCoordinates()
        this.forceUpdate()
      }
    }

    getXToYCoordinates = () => {
      const { current } = this.metricRef
      if (!current) {
        return
      }

      const key = current instanceof Line ? 'points' : 'data'

      // HACK(vanguard): Because 'recharts' lib does not expose the "good" way to get coordinates
      this.setState({
        xToYCoordinates: current.props[key] || []
      })

      return true
    }

    render () {
      return (
        <WrappedComponent
          getXToYCoordinates={this.getXToYCoordinates}
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
