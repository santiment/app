import React, { Component } from 'react'
import * as qs from 'query-string'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import { ERRORS } from '../GetTimeSeries/reducers'
import { mapQSToState } from './../../utils/utils'
import Charts from './Charts'

class ChartPage extends Component {
  state = {
    timeRange: '6m',
    slug: 'bitcoin',
    metrics: ['price', 'socialVolume'],
    interval: '1d',
    ...mapQSToState(this.props)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      timeRage: undefined,
      from: undefined,
      to: undefined,
      ...mapQSToState(nextProps)
    }
  }

  onZoom = ({ refAreaLeft, refAreaRight }) => {
    this.setState(
      prevState => ({
        ...prevState,
        timeRange: undefined,
        from: refAreaLeft,
        to: refAreaRight
      }),
      () => {
        this.updateSearchQuery(this.state)
      }
    )
  }

  mapStateToQS = props => '?' + qs.stringify(props, { arrayFormat: 'bracket' })

  updateSearchQuery = newState => {
    this.props.history.push({
      search: this.mapStateToQS(newState)
    })
  }

  render () {
    const { timeRange, slug, metrics, from, to, interval } = this.state
    const requestedMetrics = metrics.reduce((acc, metric) => {
      acc = {
        ...acc,
        [metric]: {
          slug,
          timeRange: from ? undefined : timeRange,
          from,
          to,
          interval
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
        render={({ timeseries, settings = {}, isError, errorType }) => {
          if (isError) {
            if (errorType === ERRORS.COMPLEXITY) {
              return (
                <div>
                  Too complexed request
                  <br />
                  Decrease number of points
                </div>
              )
            }
            return <div>Something is going wrong</div>
          }
          return (
            <Charts
              onZoom={this.onZoom}
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
