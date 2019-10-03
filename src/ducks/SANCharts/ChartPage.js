import React, { Component } from 'react'
import GA from 'react-ga'
import * as qs from 'query-string'
import { connect } from 'react-redux'
import cx from 'classnames'
import Loadable from 'react-loadable'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import { ERRORS } from '../GetTimeSeries/reducers'
import Charts from './Charts'
import Header from './Header'
import {
  Metrics,
  Events,
  getMarketSegment,
  mapToRequestedMetrics
} from './utils'
import { getNewInterval, INTERVAL_ALIAS } from './IntervalSelector'
import UpgradePaywall from './../../components/UpgradePaywall/UpgradePaywall'
import { getIntervalByTimeRange } from '../../utils/dates'
import { mapParsedTrueFalseFields } from '../../utils/utils'
import styles from './ChartPage.module.scss'

const DEFAULT_TIME_RANGE = '6m'

const { from: FROM, to: TO } = getIntervalByTimeRange(DEFAULT_TIME_RANGE)

const MAX_METRICS_PER_CHART = 5

const DEFAULT_STATE = {
  scale: 'time',
  timeRange: DEFAULT_TIME_RANGE,
  from: FROM.toISOString(),
  to: TO.toISOString(),
  slug: 'santiment',
  metrics: [Metrics.historyPrice],
  title: 'Santiment (SAN)',
  projectId: '16912',
  interval: getNewInterval(FROM, TO),
  isAdvancedView: false,
  enabledViewOnlySharing: true,
  isShowAnomalies: !localStorage.getItem('hideAnomalies'),
  events: [],
  marketSegments: []
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

const metricObjToQSMapper = ({ key }) => key

const mapPassedState = state => {
  const { metrics, events, marketSegments } = state
  if (metrics) state.metrics = metrics.map(metric => Metrics[metric])
  if (events) state.events = events.map(event => Events[event])
  if (marketSegments) {
    state.marketSegments = marketSegments.map(getMarketSegment)
  }
}

const getChartInitialState = props => {
  let passedState
  if (props.location && props.location.search) {
    const data = mapParsedTrueFalseFields(
      qs.parse(props.location.search, { arrayFormat: 'comma' })
    )
    if (typeof data.metrics === 'string') {
      data.metrics = [data.metrics]
    }
    if (typeof data.events === 'string') {
      data.events = [data.events]
    }
    if (typeof data.marketSegments === 'string') {
      data.marketSegments = [data.marketSegments]
    }
    mapPassedState(data)
    passedState = data
  } else {
    let {
      slug,
      from,
      to,
      title,
      timeRange,
      metrics,
      interval,
      events,
      marketSegments
    } = props

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
      events,
      from,
      to,
      timeRange,
      interval,
      marketSegments
    }
  }

  return {
    ...DEFAULT_STATE,
    ...passedState
  }
}

class ChartPage extends Component {
  static defaultProps = { ...DEFAULT_STATE, adjustNightMode: true }

  // HACK(vanguard):  fixing navbar-search project selection
  static getDerivedStateFromProps ({ slug, title, isControlled }, state) {
    if (isControlled && slug !== state.slug) {
      return {
        slug,
        title
      }
    }

    return null
  }

  chartRef = React.createRef()

  state = getChartInitialState(this.props)

  onZoom = (leftZoomIndex, rightZoomIndex, leftZoomDate, rightZoomDate) => {
    const { from, to, interval } = this.state

    const newFrom = new Date(leftZoomDate)
    const newTo = new Date(rightZoomDate)
    const newInterval = getNewInterval(leftZoomDate, rightZoomDate)

    this.setState(
      {
        zoom: [from, to, interval],
        from: newFrom.toISOString(),
        to: newTo.toISOString(),
        interval: newInterval,
        timeRange: undefined
      },
      this.updateSearchQuery
    )
  }

  onZoomOut = () => {
    const [from, to, interval] = this.state.zoom
    this.setState(
      { zoom: undefined, from, to, interval },
      this.updateSearchQuery
    )
  }

  onTimerangeChange = timeRange => {
    const { from, to } = getIntervalByTimeRange(timeRange)
    const interval = getNewInterval(from, to)
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
    const interval = getNewInterval(from, to)

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
    this.setState({ interval }, this.updateSearchQuery)
  }

  toggleMetric = metric => {
    const { type = 'metrics', label } = metric

    this.setState(state => {
      const newMetrics = new Set(state[type])
      if (newMetrics.has(metric)) {
        newMetrics.delete(metric)

        GA.event({
          category: 'Chart',
          action: `Removing "${label}"`
        })
      } else {
        const metricsAmount = state.metrics.length + state.marketSegments.length
        if (metricsAmount >= MAX_METRICS_PER_CHART) {
          return state
        }
        newMetrics.add(metric)

        GA.event({
          category: 'Chart',
          action: `Showing "${label}"`
        })
      }
      return {
        ...state,
        [type]: [...newMetrics]
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

  onScaleChange = () => {
    this.setState(
      ({ scale }) => ({ scale: scale === 'time' ? 'log' : 'time' }),
      this.updateSearchQuery
    )
  }

  onToggleAnomalies = () => {
    const { isShowAnomalies } = this.state
    const toggledState = !isShowAnomalies
    this.setState({ isShowAnomalies: toggledState }, () => {
      if (toggledState) {
        localStorage.removeItem('hideAnomalies')
      } else {
        localStorage.setItem('hideAnomalies', '+')
      }
      this.updateSearchQuery()
    })
  }

  mapStateToQS = ({ isAdvancedView, ...props }) =>
    '?' + qs.stringify(props, { arrayFormat: 'comma' })

  updateSearchQuery () {
    const { location, history } = this.props
    if (!location && !history) {
      return
    }

    const { metrics, events, marketSegments } = this.state
    history.replace({
      search: this.mapStateToQS({
        ...this.state,
        metrics: metrics.map(metricObjToQSMapper),
        events: events.map(metricObjToQSMapper),
        marketSegments: marketSegments.map(metricObjToQSMapper)
      }),
      state: location.state
    })
  }

  generateShareLink = disabledMetrics => {
    const {
      slug,
      title,
      metrics,
      marketSegments,
      events,
      interval,
      nightMode,
      isShowAnomalies,
      zoom,
      from,
      to,
      scale
    } = this.state

    const { enabledViewOnlySharing } = this.props

    const settings = {
      slug,
      metrics: metrics
        .filter(({ key }) => !disabledMetrics.includes(key))
        .map(metricObjToQSMapper),
      events: events.map(metricObjToQSMapper),
      marketSegments: marketSegments.map(metricObjToQSMapper),
      interval,
      nightMode,
      isShowAnomalies,
      title,
      scale
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
      events,
      marketSegments,
      from,
      to,
      interval,
      viewOnly,
      title,
      zoom,
      scale,
      nightMode,
      isShowAnomalies,
      isAdvancedView
    } = this.state

    const {
      hideSettings = {},
      classes = {},
      adjustNightMode,
      showToggleAnomalies,
      children,
      leftBoundaryDate,
      rightBoundaryDate,
      isLoggedIn,
      isPRO,
      isBeta
    } = this.props

    const selectedInterval = INTERVAL_ALIAS[interval] || interval

    const requestedMetrics = mapToRequestedMetrics(metrics, {
      interval: selectedInterval,
      slug,
      from,
      to
    })

    const requestedEvents =
      events.map(({ key: name }) => ({
        name,
        from,
        to,
        slug,
        interval: selectedInterval
      })) || []

    const requestedMarketSegments =
      marketSegments.map(({ key: name, reqMeta }) => ({
        name,
        from,
        to,
        slug,
        interval: selectedInterval,
        ...reqMeta
      })) || []

    if (adjustNightMode) {
      document.body.classList.toggle('night-mode', !!nightMode)
    }

    if (isShowAnomalies && isBeta) {
      metrics.forEach(metric => {
        if (metric.anomalyKey) {
          requestedEvents.push({
            name: 'anomalies',
            from,
            to,
            slug,
            interval,
            metric: metric.anomalyKey,
            metricKey: metric.key
          })
        }
      })
    }

    return (
      <GetTimeSeries
        events={requestedEvents}
        metrics={requestedMetrics}
        marketSegments={requestedMarketSegments}
        render={({
          timeseries = [],
          eventsData = [],
          errorMetrics = {},
          isError,
          isLoading,
          errorType,
          trendPositionHistory
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
          const finalMetrics = metrics
            .concat(marketSegments)
            .filter(({ key }) => !errors.includes(key))

          // NOTE(haritonasty): we don't show anomalies when trendPositionHistory is in activeMetrics
          const isTrendsShowing = trendPositionHistory !== undefined
          const eventsFiltered = isTrendsShowing
            ? eventsData.filter(({ metricAnomalyKey }) => !metricAnomalyKey)
            : eventsData

          return (
            <>
              {viewOnly || hideSettings.header || (
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
                      <>
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
                          scale={scale}
                          onScaleChange={this.onScaleChange}
                          interval={interval}
                          hideSettings={hideSettings}
                          isAdvancedView={isAdvancedView}
                          classes={classes}
                          activeMetrics={finalMetrics}
                          title={title}
                          chartRef={this.chartRef}
                        />
                        <LoadableChartMetricsTool
                          classes={styles}
                          slug={slug}
                          toggleMetric={this.toggleMetric}
                          disabledMetrics={errors}
                          activeMetrics={finalMetrics}
                          activeEvents={events}
                          showToggleAnomalies={showToggleAnomalies}
                          onToggleAnomalies={this.onToggleAnomalies}
                          isShowAnomalies={isShowAnomalies}
                          hideSettings={hideSettings}
                        />
                      </>
                    )}
                    <Charts
                      scale={scale}
                      chartRef={this.chartRef}
                      isLoading={isLoading}
                      onZoom={this.onZoom}
                      from={from}
                      to={to}
                      slug={slug}
                      onZoomOut={this.onZoomOut}
                      isZoomed={zoom}
                      events={eventsFiltered}
                      isTrendsShowing={isTrendsShowing}
                      chartData={timeseries.map(({ datetime, ...rest }) => ({
                        ...rest,
                        datetime: +new Date(datetime)
                      }))}
                      title={title}
                      metrics={finalMetrics}
                      leftBoundaryDate={leftBoundaryDate}
                      rightBoundaryDate={rightBoundaryDate}
                      children={children}
                      isAdvancedView={isAdvancedView}
                    />
                    {!isPRO && (
                      <UpgradePaywall isAdvancedView={isAdvancedView} />
                    )}
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

const mapStateToProps = ({ rootUi: { isBetaModeEnabled } }) => ({
  isBeta: isBetaModeEnabled
})

export default connect(mapStateToProps)(ChartPage)
