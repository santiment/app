import React from 'react'
import { Line } from 'recharts'

const withXYCoords = WrappedComponent => {
  class withCoordWrapper extends React.Component {
    state = {
      xToYCoordinates: undefined
    }

    getXToYCoordinates = metricRef => {
      const { current } = metricRef
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
          {...this.props}
        />
      )
    }
  }

  return withCoordWrapper
}

export default withXYCoords
