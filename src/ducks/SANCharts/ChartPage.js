import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as qs from 'query-string'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import Loadable from 'react-loadable'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import { ERRORS } from '../GetTimeSeries/reducers'
import Charts from './Charts'
import { Metrics } from './utils'
import { getNewInterval, INTERVAL_ALIAS } from './IntervalSelector'
import { getIntervalByTimeRange } from '../../utils/dates'
import { mapParsedTrueFalseFields } from '../../utils/utils'
import HelpPopup from '../../components/HelpPopup/HelpPopup'
import UpgradeBtn from '../../components/UpgradeBtn/UpgradeBtn'
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
  enabledViewOnlySharing: true,
  hideSettings: {
    linkToDashboard: true
  }
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
  let { slug, from, to, title, timeRange, metrics, interval } = props

  if (!from) {
    const { from: f, to: t } = getIntervalByTimeRange(timeRange)
    from = f.toISOString()
    to = t.toISOString()
    interval = getNewInterval(from, to)
  }
  let passedState = {
    slug,
    title,
    metrics,
    from,
    to,
    timeRange,
    interval
  }

  if (props.location) {
    const parsedQuery = mapParsedTrueFalseFields(
      qs.parse(props.location.search, {
        arrayFormat: 'comma'
      })
    )
    if (typeof parsedQuery.metrics === 'string') {
      parsedQuery.metrics = [parsedQuery.metrics]
    }

    passedState = { ...passedState, ...parsedQuery }
  }

  return {
    ...DEFAULT_STATE,
    ...passedState
  }
}

class ChartPage extends Component {
  static defaultProps = { ...DEFAULT_STATE, adjustNightMode: true }

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

  onSlugSelect = ({ slug, name, ticker, id: projectId }) => {
    this.setState(
      { projectId, slug, title: `${name} (${ticker})` },
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

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!isEqual(prevProps, this.props)) {
      this.setState(getChartInitialState(this.props))
    }
  }

  render () {
    const {
      timeRange,
      projectId,
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
      rightBoundaryDate
    } = this.props

    const requestedMetrics = metrics.reduce((acc, metric) => {
      acc[metric] = {
        slug,
        from,
        to,
        interval: INTERVAL_ALIAS[interval] || interval,
        ...Metrics[metric].reqMeta
      }

      return acc
    }, {})

    if (adjustNightMode) {
      document.body.classList.toggle('night-mode', !!nightMode)
    }

    return (
      <GetTimeSeries
        {...requestedMetrics}
        meta={{
          mergedByDatetime: true
        }}
        render={({
          timeseries = [],
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
            <div className={styles.wrapper}>
              <div
                className={cx(styles.tool, isAdvancedView && styles.tool_short)}
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
                      project={{ projectId, slug }}
                      title={title}
                      isAdvancedView={isAdvancedView}
                      classes={classes}
                    />
                  )}
                  <Charts
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
                    settings={settings}
                    title={title}
                    metrics={finalMetrics}
                    leftBoundaryDate={leftBoundaryDate}
                    rightBoundaryDate={rightBoundaryDate}
                    children={children}
                  />
                </div>
                {!viewOnly && (
                  <div
                    className={cx(styles.container, styles.container_bottom)}
                  >
                    <LoadableChartMetricsTool
                      classes={styles}
                      slug={slug}
                      toggleMetric={this.toggleMetric}
                      disabledMetrics={errors}
                      activeMetrics={finalMetrics}
                    />
                  </div>
                )}

                {!hideSettings.linkToDashboard && (
                  <div className={styles.moreData}>
                    <UpgradeBtn className={styles.upgradeBtn}>
                      Get more data
                    </UpgradeBtn>

                    <div className={styles.limited}>
                      <span className={styles.limitedLabel}>Limited data</span>
                      <HelpPopup position='bottom left'>
                        See much more data in our{' '}
                        <Link to='/dashboards'>SANbase Dashboards</Link>
                      </HelpPopup>
                    </div>
                  </div>
                )}
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
          )
        }}
      />
    )
  }
}

export default ChartPage
