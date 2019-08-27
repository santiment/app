import React, { Component } from 'react'
import * as qs from 'query-string'
import cx from 'classnames'
import Loadable from 'react-loadable'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import { ERRORS } from '../GetTimeSeries/reducers'
import Charts from './Charts'
import Header from './Header'
import { Metrics } from './utils'
import { getNewInterval, INTERVAL_ALIAS } from './IntervalSelector'
import { getIntervalByTimeRange } from '../../utils/dates'
import { mapParsedTrueFalseFields } from '../../utils/utils'
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
  projectId: '16912',
  interval: getNewInterval(FROM, TO, '1d'),
  isAdvancedView: false,
  enabledViewOnlySharing: true
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
  if (props.location && props.location.search) {
    const data = mapParsedTrueFalseFields(
      qs.parse(props.location.search, { arrayFormat: 'comma' })
    )
    if (typeof data.metrics === 'string') {
      data.metrics = [data.metrics]
    }
    passedState = data
  } else {
    let { slug, from, to, title, timeRange, metrics, interval } = props

    if (!from) {
      const { from: f, to: t } = getIntervalByTimeRange(timeRange)
      from = f.toISOString()
      to = t.toISOString()
      interval = getNewInterval(from, to)
    }
    passedState = {
      slug,
      title,
      metrics,
      from,
      to,
      timeRange,
      interval
    }
  }

  return {
    ...DEFAULT_STATE,
    ...passedState
  }
}

class ChartPage extends Component {
  static defaultProps = { ...DEFAULT_STATE, adjustNightMode: true }

  chartRef = React.createRef()

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

  onSlugSelect = project => {
    if (!project) return

    const { slug, name, ticker, id: projectId } = project
    this.setState(
      { projectId, slug, title: `${name} (${ticker})` },
      this.updateSearchQuery
    )

    const { onSlugSelect } = this.props
    if (onSlugSelect) {
      onSlugSelect(project)
    }
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

  mapStateToQS = ({ isAdvancedView, ...props }) =>
    '?' + qs.stringify(props, { arrayFormat: 'comma' })

  updateSearchQuery () {
    if (!this.props.location) {
      return
    }

    this.props.history &&
      this.props.history.replace({
        search: this.mapStateToQS(this.state)
      })
  }

  generateShareLink = disabledMetrics => {
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

    const { enabledViewOnlySharing } = this.props

    const settings = {
      slug,
      metrics: metrics.filter(metric => !disabledMetrics.includes(metric)),
      interval,
      nightMode,
      title
    }

    if (enabledViewOnlySharing) {
      settings.viewOnly = true
    }

    if (zoom) {
      const [, , zoomFrom, zoomTo] = zoom
      settings.from = zoomFrom
      settings.to = zoomTo
    } else if (from && to) {
      settings.from = from
      settings.to = to
    }

    const { sharePath } = this.props
    const { origin, pathname } = window.location

    return `${origin}${sharePath || pathname}?${qs.stringify(settings, {
      arrayFormat: 'comma'
    })}`
  }

  onSidebarToggleClick = () => {
    this.setState(prev => ({ isAdvancedView: !prev.isAdvancedView }))
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
      nightMode,
      isAdvancedView
    } = this.state

    const {
      hideSettings = {},
      classes = {},
      adjustNightMode,
      children,
      leftBoundaryDate,
      rightBoundaryDate,
      isLoggedIn
    } = this.props

    const requestedMetrics = metrics.map(metric => {
      const name = Metrics[metric].alias || metric
      return {
        name,
        slug,
        from,
        to,
        interval: INTERVAL_ALIAS[interval] || interval,
        ...Metrics[metric].reqMeta
      }
    })

    if (adjustNightMode) {
      document.body.classList.toggle('night-mode', !!nightMode)
    }

    return (
      <GetTimeSeries
        metrics={requestedMetrics}
        render={({
          timeseries = [],
          errorMetrics = {},
          isError,
          isLoading,
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
            <>
              {!viewOnly && !hideSettings.header && (
                <Header
                  slug={slug}
                  isLoggedIn={isLoggedIn}
                  onSlugSelect={this.onSlugSelect}
                />
              )}
              <div className={styles.wrapper}>
                <div
                  className={cx(
                    styles.tool,
                    isAdvancedView && styles.tool_short
                  )}
                >
                  <div className={styles.container}>
                    {!viewOnly && (
                      <LoadableChartSettings
                        defaultTimerange={timeRange}
                        onTimerangeChange={this.onTimerangeChange}
                        onCalendarChange={this.onCalendarChange}
                        onSlugSelect={this.onSlugSelect}
                        generateShareLink={this.generateShareLink}
                        onNightModeSelect={this.onNightModeSelect}
                        onIntervalChange={this.onIntervalChange}
                        isNightModeActive={nightMode}
                        showNightModeToggle={adjustNightMode}
                        disabledMetrics={errors}
                        from={from}
                        to={to}
                        interval={interval}
                        hideSettings={hideSettings}
                        isAdvancedView={isAdvancedView}
                        classes={classes}
                        activeMetrics={finalMetrics}
                        title={title}
                        chartRef={this.chartRef}
                      />
                    )}
                    {!viewOnly && (
                      <LoadableChartMetricsTool
                        classes={styles}
                        slug={slug}
                        toggleMetric={this.toggleMetric}
                        disabledMetrics={errors}
                        activeMetrics={finalMetrics}
                      />
                    )}
                    <Charts
                      chartRef={this.chartRef}
                      isLoading={isLoading}
                      onZoom={this.onZoom}
                      onZoomOut={this.onZoomOut}
                      isZoomed={zoom}
                      chartData={(timeseries && zoom
                        ? timeseries.slice(zoom[0], zoom[1])
                        : timeseries
                      ).map(({ datetime, ...rest }) => ({
                        ...rest,
                        datetime: +new Date(datetime)
                      }))}
                      title={title}
                      metrics={finalMetrics}
                      leftBoundaryDate={leftBoundaryDate}
                      rightBoundaryDate={rightBoundaryDate}
                      children={children}
                    />
                  </div>
                </div>
                {!viewOnly && !hideSettings.sidecar && (
                  <LoadableChartSidecar
                    onSlugSelect={this.onSlugSelect}
                    onSidebarToggleClick={this.onSidebarToggleClick}
                    isAdvancedView={isAdvancedView}
                    classes={classes}
                  />
                )}
              </div>
            </>
          )
        }}
      />
    )
  }
}

export default ChartPage
