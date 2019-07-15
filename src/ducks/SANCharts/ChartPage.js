import React, { Component, Fragment } from 'react'
import * as qs from 'query-string'
import Loadable from 'react-loadable'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import { ERRORS } from '../GetTimeSeries/reducers'
import Charts from './Charts'
import { Metrics } from './utils'
import { getNewInterval, INTERVAL_ALIAS } from './IntervalSelector'
import { getIntervalByTimeRange } from '../../utils/dates'
import styles from './ChartPage.module.scss'

const DEFAULT_TIME_RANGE = '6m'

const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

const MAX_METRICS_PER_CHART = 5

const DEFAULT_STATE = {
  timeRange: DEFAULT_TIME_RANGE,
  from: FROM.toISOString(),
  to: TO.toISOString(),
  slug: 'santiment',
  metrics: ['historyPrice'],
  title: 'Santiment (SAN)',
  interval: '12h'
}

const LoadableChartSidecar = Loadable({
  loader: () => import('./ChartSidecar'),
  loading: () => <div />
})

const LoadableChartSettings = Loadable({
  loader: () => import('./ChartSettings'),
  loading: () => <div />
})

const LoadableChartMetricsTool = Loadable({
  loader: () => import('./ChartMetricsTool'),
  loading: () => <div />
})

const getChartInitialState = props => {
  let passedState
  if (props.location) {
    const data = qs.parse(props.location.search, { arrayFormat: 'comma' })
    if (typeof data.metrics === 'string') {
      data.metrics = [data.metrics]
    }
    passedState = data
  } else {
    const { slug, from, to, title, timeRange } = props

    passedState = {
      slug,
      title,
      from,
      to,
      timeRange,
      interval: getNewInterval(from, to)
    }
  }

  return {
    ...DEFAULT_STATE,
    ...passedState
  }
}

class ChartPage extends Component {
  state = getChartInitialState(this.props)

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
    const { from, to } = getIntervalByTimeRange(timeRange)
    const interval = getNewInterval(from, to, this.state.interval)
    this.setState(
      {
        timeRange,
        from: from.toISOString(),
        to: to.toISOString(),
        interval,
        zoom: undefined
      },
      this.updateSearchQuery
    )
  }

  onCalendarChange = ([from, to]) => {
    const interval = getNewInterval(from, to, this.state.interval)

    this.setState(
      {
        from: from.toISOString(),
        to: to.toISOString(),
        zoom: undefined,
        timeRange: undefined,
        interval
      },
      this.updateSearchQuery
    )
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

  onIntervalChange = interval => {
    this.setState({ interval, zoom: undefined }, this.updateSearchQuery)
  }

  toggleMetric = metric => {
    this.setState(state => {
      const newMetrics = new Set(state.metrics)
      if (newMetrics.has(metric)) {
        newMetrics.delete(metric)
      } else {
        if (newMetrics.size >= MAX_METRICS_PER_CHART) {
          return state
        }
        newMetrics.add(metric)
      }
      return {
        ...state,
        metrics: [...newMetrics]
      }
    }, this.updateSearchQuery)
  }

  onNightModeSelect = () => {
    const { nightMode } = this.state

    this.setState(
      { nightMode: nightMode ? undefined : true },
      this.updateSearchQuery
    )
  }

  mapStateToQS = props => '?' + qs.stringify(props, { arrayFormat: 'comma' })

  updateSearchQuery () {
    if (!this.props.location) {
      return
    }

    this.props.history.replace({
      search: this.mapStateToQS(this.state)
    })
  }

  generateShareLink = disabledMetrics => {
    const { origin, pathname } = window.location
    const {
      slug,
      title,
      metrics,
      interval,
      nightMode,
      zoom,
      from,
      to
    } = this.state

    const settings = {
      slug,
      metrics: metrics.filter(metric => !disabledMetrics.includes(metric)),
      interval,
      nightMode,
      title,
      viewOnly: true
    }

    if (zoom) {
      const [, , zoomFrom, zoomTo] = zoom
      settings.from = zoomFrom
      settings.to = zoomTo
    } else if (from && to) {
      settings.from = from
      settings.to = to
    }

    return `${origin}${pathname}?${qs.stringify(settings, {
      arrayFormat: 'comma'
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
          from,
          to,
          interval: INTERVAL_ALIAS[interval] || interval,
          ...Metrics[metric].reqMeta
        }
      }
      return acc
    }, {})

    document.body.classList.toggle('night-mode', !!nightMode)

    return (
      <GetTimeSeries
        {...requestedMetrics}
        meta={{
          mergedByDatetime: true
        }}
        render={({
          timeseries,
          errorMetrics = {},
          settings = {},
          isError,
          errorType
        }) => {
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

          const errors = Object.keys(errorMetrics)
          const finalMetrics = metrics.filter(
            metric => !errors.includes(metric)
          )

          return (
            <Fragment>
              {!viewOnly && (
                <LoadableChartSettings
                  defaultTimerange={timeRange}
                  onTimerangeChange={this.onTimerangeChange}
                  onCalendarChange={this.onCalendarChange}
                  onSlugSelect={this.onSlugSelect}
                  generateShareLink={this.generateShareLink}
                  onNightModeSelect={this.onNightModeSelect}
                  onIntervalChange={this.onIntervalChange}
                  hasNightMode={nightMode}
                  disabledMetrics={errors}
                  from={from}
                  to={to}
                  interval={interval}
                />
              )}
              <Charts
                onZoom={this.onZoom}
                onZoomOut={this.onZoomOut}
                isZoomed={zoom}
                chartData={
                  timeseries && zoom
                    ? timeseries.slice(zoom[0], zoom[1])
                    : timeseries
                }
                settings={settings}
                title={title}
                metrics={finalMetrics}
              />
              {!viewOnly && (
                <>
                  <LoadableChartSidecar onSlugSelect={this.onSlugSelect} />
                  <LoadableChartMetricsTool
                    classes={styles}
                    slug={slug}
                    toggleMetric={this.toggleMetric}
                    disabledMetrics={errors}
                    activeMetrics={finalMetrics}
                  />
                </>
              )}
            </Fragment>
          )
        }}
      />
    )
  }
}

export default ChartPage
