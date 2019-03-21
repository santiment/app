import React, { Component } from 'react'
import * as qs from 'query-string'
import Loadable from 'react-loadable'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import { ERRORS } from '../GetTimeSeries/reducers'
import { mapQSToState } from './../../utils/utils'
import Charts from './Charts'

const LoadableChartSettings = Loadable({
  loader: () => import('./ChartSettings'),
  loading: () => <div />
})

const LoadableChartMetrics = Loadable({
  loader: () => import('./ChartMetrics'),
  loading: () => <div />
})

class ChartPage extends Component {
  state = {
    timeRange: '6m',
    slug: 'bitcoin',
    metrics: ['price', 'socialVolume', 'tokenAgeConsumed', 'exchangeFundsFlow'],
    title: 'Bitcoin (BTC)',
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

  onZoom = (leftZoomIndex, rightZoomIndex, leftZoomDate, rightZoomDate) => {
    this.setState(
      {
        zoom: [leftZoomIndex, rightZoomIndex + 1, leftZoomDate, rightZoomDate]
      },
      this.updateSearchQuery
    )
  }

  onZoomOut = () => {
    this.setState({ zoom: undefined }, this.updateSearchQuery)
  }

  onTimerangeChange = timeRange => {
    this.setState({ timeRange }, this.updateSearchQuery)
  }

  onSlugSelect = ({ slug, name, ticker }) => {
    this.setState(
      { slug, title: `${name} (${ticker})` },
      this.updateSearchQuery
    )
  }

  onMetricsChange = metrics => {
    this.setState({ metrics }, this.updateSearchQuery)
  }

  onNightModeSelect = () => {
    const { nightMode } = this.state

    this.setState(
      { nightMode: nightMode ? undefined : true },
      this.updateSearchQuery
    )
  }

  mapStateToQS = props => '?' + qs.stringify(props, { arrayFormat: 'bracket' })

  updateSearchQuery () {
    this.props.history.push({
      search: this.mapStateToQS(this.state)
    })
  }

  generateShareLink = () => {
    const { origin, pathname } = window.location
    const {
      slug,
      title,
      timeRange,
      metrics,
      interval,
      nightMode,
      zoom
    } = this.state

    const settings = {
      slug,
      metrics,
      interval,
      nightMode,
      title,
      viewOnly: true
    }

    if (zoom) {
      const [, , from, to] = zoom
      settings.from = from
      settings.to = to
    } else {
      settings.timeRange = timeRange
    }

    return `${origin}${pathname}?${qs.stringify(settings, {
      arrayFormat: 'bracket'
    })}`
  }

  render () {
    const {
      timeRange,
      slug,
      metrics,
      from,
      to,
      interval,
      viewOnly,
      title,
      zoom,
      nightMode
    } = this.state
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

    document.body.classList.toggle('night-mode', !!nightMode)

    const Chart = (
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
              onZoomOut={this.onZoomOut}
              chartData={
                timeseries && zoom
                  ? timeseries.slice(zoom[0], zoom[1])
                  : timeseries
              }
              settings={settings}
              title={title}
              metrics={metrics}
            />
          )
        }}
      />
    )
    if (viewOnly) {
      return Chart
    }

    return (
      <>
        <LoadableChartSettings
          defaultTimerange={timeRange}
          onTimerangeChange={this.onTimerangeChange}
          onSlugSelect={this.onSlugSelect}
          generateShareLink={this.generateShareLink}
          onNightModeSelect={this.onNightModeSelect}
          hasNightMode={nightMode}
        />
        {Chart}
        <LoadableChartMetrics
          onMetricsChange={this.onMetricsChange}
          defaultActiveMetrics={metrics}
        />
      </>
    )
  }
}

export default ChartPage
