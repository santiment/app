import React, { Component } from 'react'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import { mapQSToState } from './../../utils/utils'
import Charts from './Charts'

class ChartPage extends Component {
  state = {
    timeRange: '6m',
    slug: 'bitcoin',
    metrics: ['price', 'socialVolume'],
    ...mapQSToState(this.props)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      ...mapQSToState(nextProps)
    }
  }

  render () {
    const { timeRange, slug, metrics } = this.state
    const requestedMetrics = metrics.reduce((acc, metric) => {
      acc = {
        ...acc,
        [metric]: {
          slug,
          timeRange
        }
      }
      return acc
    }, {})
    return (
      <GetTimeSeries
        {...requestedMetrics}
        meta={{
          mergedByDatetime: true
        }}
        render={({ timeseries, settings = {} }) => {
          return (
            <Charts
              onZoom={data => console.log(data)}
              chartData={timeseries}
              settings={settings}
            />
          )
        }}
      />
    )
  }
}

export default ChartPage
