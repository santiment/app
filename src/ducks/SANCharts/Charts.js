import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import {
  Line,
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Brush,
  ReferenceArea,
  ReferenceDot
} from 'recharts'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import Button from '@santiment-network/ui/Button'
import Loader from '@santiment-network/ui/Loader/Loader'
import { millify } from './../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import {
  getEventsTooltipInfo,
  Metrics,
  generateMetricsMarkup,
  findYAxisMetric,
  chartBars
} from './utils'
import { checkHasPremium } from '../../pages/UserSelectors'
import displayPaywall, { MOVE_CLB, CHECK_CLB } from './Paywall'
import { binarySearch } from '../../pages/Trends/utils'
import sharedStyles from './ChartPage.module.scss'
import styles from './Chart.module.scss'

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
    console.warn(e)
    return 'No data'
  }
}

class Charts extends React.Component {
  state = {
    leftZoomIndex: undefined,
    rightZoomIndex: undefined,
    refAreaLeft: undefined,
    refAreaRight: undefined,
    events: []
  }

  eventsMap = new Map()
  metricRef = React.createRef()

  componentWillUpdate ({ chartData, chartRef }) {
    if (this.props.chartData !== chartData) {
      this.getXToYCoordinates()
      chartBars.delete(chartRef.current)
    }
  }

  componentDidUpdate (prevProps) {
    const { metrics, events, chartData } = this.props

    if (!this.xToYCoordinates && this.metricRef.current) {
      this.getXToYCoordinates()
      this.forceUpdate()
    }

    if (this.props.chartData !== prevProps.chartData) {
      this.getXToYCoordinates()
    }

    if (metrics !== prevProps.metrics) {
      const tooltipMetric = findYAxisMetric(metrics)
      if (!tooltipMetric || chartData.length === 0) return

      const { dataKey: tooltipMetricKey = tooltipMetric } = Metrics[
        tooltipMetric
      ]
      this.eventsMap.clear()

      this.setState({
        tooltipMetric,
        events: events.map(({ datetime, __typename, ...rest }) => {
          const { index, value } = binarySearch({
            moveClb: MOVE_CLB,
            checkClb: CHECK_CLB,
            target: new Date(datetime),
            array: chartData
          })

          if (index === -1 || index >= chartData.length) {
            return null
          }

          const result = value || chartData[index]
          const y = result[tooltipMetricKey]
          this.eventsMap.set(result.datetime, getEventsTooltipInfo(rest))

          return (
            <ReferenceDot
              yAxisId={`axis-${tooltipMetricKey}`}
              r={3}
              isFront
              fill='var(--white)'
              strokeWidth='2px'
              stroke='var(--persimmon)'
              key={datetime}
              x={+new Date(datetime)}
              y={y}
            />
          )
        })
      })
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
  getXToYCoordinatesDebounced = debounce(this.getXToYCoordinates, 100)

  onMouseLeave = () => {
    this.setState({ hovered: false })
  }

  onMouseMove = throttle(event => {
    if (!event) return

    if (!this.xToYCoordinates && !this.getXToYCoordinates()) {
      return
    }

    const { activeTooltipIndex, activeLabel, activePayload } = event

    if (!activePayload) {
      return
    }

    const { tooltipMetric = 'historyPrice' } = this.state
    const coordinates = this.xToYCoordinates[activeTooltipIndex]

    if (!coordinates) {
      return
    }
    const { x, y } = coordinates

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
        Metrics[tooltipMetric].dataKey || tooltipMetric
      ],
      hovered: true
    })
  }, 16)

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
      isLoading
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
      events
    } = this.state

    const lines = generateMetricsMarkup(
      metrics,
      chartRef,
      this.xToYCoordinates,
      {
        ref: { [tooltipMetric]: this.metricRef }
      }
    )

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
          {hovered && activePayload && (
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
                    '--yValue': `"${yValue ? millify(yValue, 1) : '-'}"`
                  }}
                />
              </div>
            </>
          )}
        </div>
        <ResponsiveContainer height={300}>
          <ComposedChart
            margin={CHART_MARGINS}
            onMouseLeave={this.onMouseLeave}
            onMouseEnter={this.getXToYCoordinates}
            onMouseDown={event => {
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
            <XAxis
              dataKey='datetime'
              scale='time'
              tickLine={false}
              minTickGap={100}
              tickFormatter={tickFormatter}
              domain={['dataMin', 'dataMax']}
              type='number'
            />
            <YAxis hide />
            {lines}
            {refAreaLeft && refAreaRight && (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            )}

            {metrics.includes(tooltipMetric) && events}
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
                    .slice(1) // TODO(vangaurd): to fix
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

const mapStateToProps = state => ({
  hasPremium: checkHasPremium(state)
})

export default connect(mapStateToProps)(Charts)
