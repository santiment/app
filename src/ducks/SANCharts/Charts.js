import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Line,
  ResponsiveContainer,
  ComposedChart,
  Label,
  XAxis,
  YAxis,
  Brush,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine
} from 'recharts'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import { millify } from './../../utils/formatting'
import {
  getDateFormats,
  getTimeFormats,
  ONE_DAY_IN_MS
} from '../../utils/dates'
import {
  getEventsTooltipInfo,
  generateMetricsMarkup,
  findYAxisMetric,
  chartBars,
  mapToPriceSignalLines,
  getSignalPrice,
  getCrossYValue
} from './utils'
import { Metrics } from './data'
import { checkHasPremium } from '../../pages/UserSelectors'
import displayPaywall, { MOVE_CLB, CHECK_CLB } from './Paywall'
import { binarySearch } from '../../pages/Trends/utils'
import ChartWatermark from './ChartWatermark'
import {
  createTrigger,
  fetchSignals,
  removeTrigger
} from '../Signals/common/actions'
import { buildPriceAboveSignal } from '../Signals/utils/utils'
import SignalLine, {
  SignalPointSvg
} from './components/newSignalLine/SignalLine'
import SidecarExplanationTooltip from './SidecarExplanationTooltip'
import sharedStyles from './ChartPage.module.scss'
import styles from './Chart.module.scss'

const DAY_INTERVAL = ONE_DAY_IN_MS * 2

const EMPTY_FORMATTER = () => {}
const CHART_MARGINS = {
  left: -20,
  right: 0
}

export const tickFormatter = date => {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

export const tooltipLabelFormatter = value => {
  const date = new Date(value)
  const { MMMM, DD, YYYY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)

  return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
}

const valueFormatter = (value, name, formatter) => {
  try {
    if (formatter) {
      return formatter(value)
    }

    const numValue = +value
    // NOTE(vanguard): Some values may not be present in a hovered data point, i.e. value === undefined/null;
    if (!Number.isFinite(numValue)) throw new Error()

    if (numValue > 90000) {
      return millify(numValue, 2)
    }

    return numValue.toFixed(2)
  } catch (e) {
    return 'No data'
  }
}

const getTooltipMetricAndKey = (metrics, chartData) => {
  const tooltipMetric = findYAxisMetric(metrics)
  if (!tooltipMetric || chartData.length === 0) return

  const { dataKey: tooltipMetricKey = tooltipMetric } = tooltipMetric

  return { tooltipMetric, tooltipMetricKey }
}

const buildNewSignalData = (coordinate, value) => {
  return {
    chartY: coordinate,
    priceUsd: value,
    isNew: true
  }
}

class Charts extends React.Component {
  state = {
    leftZoomIndex: undefined,
    rightZoomIndex: undefined,
    refAreaLeft: undefined,
    refAreaRight: undefined,
    activeSignalData: undefined,
    dayMetrics: [],
    onSignalHover: (evt, value) => {
      this.setState({
        activeSignalData: {
          priceUsd: value,
          chartY: evt.cy
        }
      })
    },
    onSignalLeave: () => {
      this.setState({
        activeSignalData: undefined
      })
    },
    onSignalClick: (target, evt, id) => {
      evt.stopPropagation()
      evt.preventDefault()

      const { removeSignal } = this.props
      removeSignal && removeSignal(id)
    }
  }

  eventsMap = new Map()
  metricRef = React.createRef()

  componentDidMount () {
    const { fetchSignals, isBeta, isLoggedIn } = this.props
    isBeta && isLoggedIn && fetchSignals && fetchSignals()
  }

  componentWillUpdate ({
    chartData,
    chartRef,
    metrics,
    events,
    isTrendsShowing,
    isAdvancedView,
    slug
  }) {
    if (this.props.chartData !== chartData) {
      this.getXToYCoordinates()
      chartBars.delete(chartRef.current)
    }

    if (
      metrics !== this.props.metrics ||
      events !== this.props.events ||
      isAdvancedView !== this.props.isAdvancedView
    ) {
      this.eventsMap.clear()
      const { tooltipMetricKey } =
        getTooltipMetricAndKey(metrics, chartData) || {}
      events.forEach(({ datetime, __typename, ...rest }) => {
        const { index, value } = binarySearch({
          moveClb: MOVE_CLB,
          checkClb: CHECK_CLB,
          target: new Date(datetime),
          array: chartData
        })

        if (index === -1 || index >= chartData.length) {
          return null
        }

        const { metricAnomalyKey: anomaly } = rest
        const result = value || chartData[index]
        const eventsData = getEventsTooltipInfo(rest)
        eventsData.map(event => {
          // NOTE(haritonasty): target metric for anomalies and tooltipMetricKey for other
          const key = event.isAnomaly
            ? Metrics[anomaly].dataKey || anomaly
            : tooltipMetricKey
          return Object.assign(event, { key, y: result[key] })
        })

        this.eventsMap.set(result.datetime, eventsData)
      })
    }
  }

  componentDidUpdate (prevProps) {
    const { metrics, chartData } = this.props

    if (!this.xToYCoordinates && this.metricRef.current) {
      // HACK(vanguard): Thanks recharts
      this.getXToYCoordinates()
      this.forceUpdate()
    }

    if (
      this.props.chartData !== prevProps.chartData ||
      this.props.isAdvancedView !== prevProps.isAdvancedView
    ) {
      this.getXToYCoordinatesDebounced()
    }

    if (this.props.chartData !== prevProps.chartData) {
      if (this.props.isIntervalSmallerThanDay) {
        const { metrics, chartData } = this.props
        const dayMetrics = []
        metrics.forEach(({ key, minInterval }, index) => {
          if (minInterval === '1d') {
            dayMetrics.push([key, index])
          }
        })

        const { length } = dayMetrics
        const dayData = {}
        this.setState({
          dayMetrics,
          data: chartData.map(data => {
            const newData = { ...data }
            for (let i = 0; i < length; i++) {
              const metric = dayMetrics[i][0]
              const res = newData[metric]
              if (res !== undefined) {
                dayData[metric] = res
              } else {
                newData[metric] = dayData[metric]
              }
            }

            return newData
          })
        })
      } else {
        console.log('infinite')
        this.setState({
          dayMetrics: [],
          data: chartData
        })
      }
    }

    if (metrics !== prevProps.metrics) {
      const { tooltipMetric } = getTooltipMetricAndKey(metrics, chartData) || {}
      if (tooltipMetric) {
        this.setState({ tooltipMetric })
      }
    }
  }

  onZoom = () => {
    let {
      leftZoomIndex,
      rightZoomIndex,
      refAreaLeft,
      refAreaRight
    } = this.state
    if (leftZoomIndex === rightZoomIndex || !Number.isInteger(rightZoomIndex)) {
      this.resetState()
      return
    }
    if (leftZoomIndex > rightZoomIndex) {
      ;[leftZoomIndex, rightZoomIndex] = [rightZoomIndex, leftZoomIndex]
      ;[refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]
    }
    this.props.onZoom(leftZoomIndex, rightZoomIndex, refAreaLeft, refAreaRight)
    this.resetState()
  }

  resetState () {
    this.setState({
      refAreaLeft: undefined,
      refAreaRight: undefined,
      leftZoomIndex: undefined,
      rightZoomIndex: undefined
    })
  }

  getXToYCoordinates = () => {
    const { current } = this.metricRef
    if (!current) {
      return
    }

    const key = current instanceof Line ? 'points' : 'data'

    // HACK(vanguard): Because 'recharts' lib does not expose the "good" way to get coordinates
    this.xToYCoordinates = current.props[key] || []

    return true
  }

  getXToYCoordinatesDebounced = debounce(() => {
    chartBars.delete(this.props.chartRef.current)
    this.getXToYCoordinates()
    // HACK(vanguard): Thanks recharts
    this.forceUpdate(this.forceUpdate)
  }, 100)

  onMouseLeave = () => {
    this.setState({
      hovered: false,
      newSignalData: null,
      activeSignalData: null
    })
  }

  canShowSignalLines = () => {
    const { metrics = [], isLoggedIn, isBeta } = this.props
    return isLoggedIn && isBeta && metrics.includes(Metrics.historyPrice)
  }

  onMouseMove = throttle(event => {
    if (!event) return

    if (!this.xToYCoordinates && !this.getXToYCoordinates()) {
      return
    }

    const {
      activeTooltipIndex,
      activeLabel,
      activePayload,
      chartY,
      chartX
    } = event

    if (!activePayload) {
      return
    }

    const { tooltipMetric = 'historyPrice' } = this.state
    const coordinates = this.xToYCoordinates[activeTooltipIndex]

    if (!coordinates) {
      return
    }

    const { x, y } = coordinates

    const { activeSignalData, data, dayMetrics } = this.state
    const allIndexData = data[activeTooltipIndex]
    dayMetrics.forEach(([metric, index]) => {
      activePayload[index].value = allIndexData[metric]
    })

    const canCreateSignal =
      !activeSignalData && chartX < 50 && this.canShowSignalLines()
    const priceUsd = canCreateSignal
      ? getSignalPrice(this.xToYCoordinates, chartY)
      : undefined

    this.setState({
      activePayload: activePayload.concat(
        this.eventsMap.get(activeLabel) || []
      ),
      x,
      y,
      refAreaRight: activeLabel,
      rightZoomIndex: activeTooltipIndex,
      xValue: activeLabel,
      yValue: this.props.chartData[activeTooltipIndex][
        tooltipMetric.dataKey || tooltipMetric.key
      ],
      hovered: true,
      newSignalData: priceUsd ? buildNewSignalData(chartY, priceUsd) : undefined
    })
  }, 16)

  onChartClick = () => {
    const {
      newSignalData: { priceUsd }
    } = this.state
    if (priceUsd) {
      const { slug, createSignal } = this.props
      const signal = buildPriceAboveSignal(slug, priceUsd)

      createSignal(signal)

      this.setState({
        hovered: false,
        activeSignalData: null
      })
    }
  }

  onYAxesHover = evt => {
    const { coordinate } = evt

    const { activeSignalData } = this.state

    const canCreateSignal = !activeSignalData && this.canShowSignalLines()

    if (canCreateSignal) {
      const priceUsd = getSignalPrice(this.xToYCoordinates, coordinate)
      this.setState({
        newSignalData: buildNewSignalData(coordinate, priceUsd)
      })
    }
  }

  render () {
    const {
      chartRef,
      metrics,
      chartData = [],
      onZoomOut,
      isZoomed,
      hasPremium,
      leftBoundaryDate,
      rightBoundaryDate,
      children,
      isLoading,
      priceRefLineData,
      scale = 'time',
      signals = [],
      slug
    } = this.props
    const {
      refAreaLeft,
      refAreaRight,
      x,
      y,
      xValue,
      yValue,
      activePayload,
      hovered,
      tooltipMetric,
      newSignalData,
      activeSignalData,
      onSignalHover,
      onSignalLeave,
      onSignalClick,
      dayMetrics
    } = this.state

    const [bars, ...lines] = generateMetricsMarkup(metrics, {
      chartRef,
      dayMetrics,
      coordinates: this.xToYCoordinates,
      onYAxesHover: this.onYAxesHover,
      scale: scale,
      ref: { [tooltipMetric && tooltipMetric.key]: this.metricRef }
    })

    let events = []
    this.eventsMap.forEach((values, datetime) => {
      values.forEach(value => events.push({ ...value, datetime }))
    })
    // NOTE(haritonasty): need to filter anomalies immediately after removing any active metric
    // (because axis for anomaly can be lost)
    events = events.filter(
      ({ value, isAnomaly }) =>
        metrics.some(({ key }) => key === value) || !isAnomaly
    )

    const lastDayPrice =
      priceRefLineData &&
      `Last day price ${Metrics.historyPrice.formatter(
        priceRefLineData.priceUsd
      )}`

    const isSignalsEnabled = this.canShowSignalLines()
    const signalLines = isSignalsEnabled
      ? mapToPriceSignalLines({
        data: this.xToYCoordinates,
        slug,
        signals,
        onSignalHover,
        onSignalLeave,
        onSignalClick
      })
      : null

    const showTooltip =
      hovered && activePayload && !newSignalData && !activeSignalData

    return (
      <div className={styles.wrapper + ' ' + sharedStyles.chart} ref={chartRef}>
        {isLoading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        <div className={sharedStyles.header}>
          {isZoomed && (
            <Button
              border
              onClick={onZoomOut}
              className={cx(sharedStyles.zoom, styles.zoom)}
            >
              Zoom out
            </Button>
          )}
          {showTooltip && (
            <>
              <div className={styles.details}>
                <div className={styles.details__title}>
                  {tooltipLabelFormatter(xValue)}
                </div>
                <div className={styles.details__content}>
                  {activePayload.map(
                    ({ isEvent, name, value, color, formatter }) => {
                      return (
                        <div
                          key={name}
                          style={{ '--color': color }}
                          className={cx(
                            styles.details__metric,
                            isEvent && styles.details__metric_dot
                          )}
                        >
                          {valueFormatter(value, name, formatter)}
                          <span className={styles.details__name}>{name}</span>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
              <div
                className={cx(styles.line, !y && styles.line_noY)}
                style={{
                  '--x': `${x}px`,
                  '--y': `${y}px`
                }}
              >
                <div
                  className={styles.values}
                  style={{
                    '--xValue': `"${tickFormatter(xValue)}"`,
                    '--yValue': `"${getCrossYValue(yValue)}"`
                  }}
                />
              </div>
            </>
          )}
          {isSignalsEnabled && (
            <SidecarExplanationTooltip
              closeTimeout={500}
              localStorageSuffix='_SIGNALS_ON_CHART_EXPLANATION'
              position='top'
              title='Create your own signals for price changes!'
              description='One click on Y-axis to create a signal, the second click on signal for removing'
            >
              <SignalLine data={newSignalData} active={activeSignalData} />
            </SidecarExplanationTooltip>
          )}
        </div>

        <ChartWatermark className={styles.watermark} />

        <ResponsiveContainer height={300}>
          <ComposedChart
            margin={CHART_MARGINS}
            onMouseLeave={this.onMouseLeave}
            onMouseEnter={this.getXToYCoordinates}
            onMouseDown={event => {
              newSignalData && this.onChartClick(event)

              if (!event) return
              const { activeTooltipIndex, activeLabel } = event
              this.setState({
                refAreaLeft: activeLabel,
                leftZoomIndex: activeTooltipIndex
              })
            }}
            onMouseMove={this.onMouseMove}
            onMouseUp={refAreaLeft && refAreaRight && this.onZoom}
            data={chartData}
          >
            <defs>{isSignalsEnabled && <SignalPointSvg />}</defs>
            <XAxis
              dataKey='datetime'
              tickLine={false}
              minTickGap={100}
              tickFormatter={tickFormatter}
              domain={['dataMin', 'dataMax']}
              type='number'
            />
            <YAxis hide />
            {bars}
            {lines}

            {signalLines}

            {refAreaLeft && refAreaRight && (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            )}

            {lastDayPrice && (
              <ReferenceLine
                y={priceRefLineData.priceUsd}
                yAxisId='axis-priceUsd'
                stroke='var(--jungle-green-hover)'
                strokeDasharray='7'
              >
                <Label position='insideBottomRight'>{lastDayPrice}</Label>
              </ReferenceLine>
            )}

            {metrics.includes(tooltipMetric) &&
              events.map(({ key, y, datetime }) => (
                <ReferenceDot
                  yAxisId={`axis-${key}`}
                  r={3}
                  isFront
                  fill='var(--white)'
                  strokeWidth='2px'
                  stroke='var(--persimmon)'
                  key={datetime + key}
                  x={+new Date(datetime)}
                  y={y}
                />
              ))}
            {!hasPremium &&
              displayPaywall({
                leftBoundaryDate,
                rightBoundaryDate,
                data: chartData
              })}
            {chartData.length > 0 && metrics.length > 0 && chartRef.current && (
              <Brush
                tickFormatter={EMPTY_FORMATTER}
                travellerWidth={4}
                onChange={this.getXToYCoordinatesDebounced}
                width={chartRef.current.clientWidth}
                x={0}
              >
                <ComposedChart>
                  {lines
                    .filter(({ type }) => type !== YAxis)
                    .map(el =>
                      React.cloneElement(el, { ref: null, shape: undefined })
                    )}
                </ComposedChart>
              </Brush>
            )}
            {children}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

Charts.defaultProps = {
  data: {},
  isLoading: true
}

const mapStateToProps = (state, props) => {
  const { signals: { all = [] } = {} } = state
  return {
    hasPremium: checkHasPremium(state),
    signals: all
  }
}

export const HISTORY_PRICE_QUERY = gql`
  query historyPrice($slug: String, $from: DateTime, $to: DateTime) {
    historyPrice(slug: $slug, from: $from, to: $to, interval: "1d") {
      priceUsd
      datetime
    }
  }
`

const mapDispatchToProps = dispatch => ({
  createSignal: payload => {
    dispatch(createTrigger(payload))
  },
  fetchSignals: payload => {
    dispatch(fetchSignals())
  },
  removeSignal: id => {
    dispatch(removeTrigger(id))
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  graphql(HISTORY_PRICE_QUERY, {
    skip: ({ metrics, from, to }) => {
      return (
        !metrics.includes(Metrics.historyPrice) ||
        new Date(to) - new Date(from) > DAY_INTERVAL
      )
    },
    props: ({ data: { historyPrice = [] } }) => {
      return { priceRefLineData: historyPrice[0] }
    },
    options: ({ slug, from }) => {
      const newFrom = new Date(from)
      newFrom.setHours(0, 0, 0, 0)

      const to = new Date(newFrom)
      to.setHours(1)

      return {
        variables: {
          from: newFrom.toISOString(),
          to: to.toISOString(),
          slug,
          interval: '1d'
        }
      }
    }
  })
)
export default enhance(Charts)
