import React from 'react'
import cx from 'classnames'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  ReferenceArea
} from 'recharts'
import throttle from 'lodash.throttle'
import Button from '@santiment-network/ui/Button'
import { formatNumber, millify } from './../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import mixWithPaywallArea from './../../components/PaywallArea/PaywallArea'
import { Metrics, generateMetricsMarkup } from './utils'
import sharedStyles from './ChartPage.module.scss'
import styles from './Chart.module.scss'

const PRICE_METRIC = 'historyPrice'

const CHART_MARGINS = {
  left: -10,
  right: 18
}

const tickFormatter = date => {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

const tooltipLabelFormatter = value => {
  const date = new Date(value)
  const { MMMM, DD, YYYY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)

  return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
}

const valueFormatter = (value, name) => {
  const numValue = +value
  // NOTE(vanguard): Some values may not be present in a hovered data point, i.e. value === undefined/null;
  if (!Number.isFinite(numValue)) return

  if (name === Metrics.historyPrice.label) {
    return formatNumber(numValue, { currency: 'USD' })
  }

  if (numValue > 900000) {
    return millify(numValue, 2)
  }

  return numValue.toFixed(2)
}

class Charts extends React.Component {
  state = {
    leftZoomIndex: undefined,
    rightZoomIndex: undefined,
    refAreaLeft: undefined,
    refAreaRight: undefined
  }

  componentDidUpdate (prevProps) {
    const { metrics } = this.props
    if (this.props.chartData !== prevProps.chartData) {
      this.getXToYCoordinates()
    }

    if (metrics !== prevProps.metrics) {
      this.setState({
        tooltipMetric: metrics.includes(PRICE_METRIC)
          ? PRICE_METRIC
          : metrics[0]
      })
    }
  }

  metricRef = React.createRef()

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
    // HACK(vanguard): Because 'recharts' lib does not expose correct point "Y" coordinate
    if (!(this.metricRef.current && this.metricRef.current.mainCurve)) {
      return
    }

    this.xToYCoordinates = this.metricRef.current.mainCurve
      .getAttribute('d')
      .slice(1)
      .split('L')
      .reduce((acc, value) => {
        const [x, y] = value.split(',')
        acc[x] = y
        return acc
      }, {})

    return true
  }

  onMouseLeave = () => {
    this.setState({ hovered: false })
  }

  onMouseMove = throttle(e => {
    if (!e) return

    if (!this.xToYCoordinates && !this.getXToYCoordinates()) {
      return
    }

    const {
      activeTooltipIndex,
      activeLabel,
      activeCoordinate,
      activePayload
    } = e

    const { tooltipMetric = 'historyPrice' } = this.state

    this.setState({
      activePayload,
      refAreaRight: activeLabel,
      rightZoomIndex: activeTooltipIndex,
      x: activeCoordinate.x,
      y: this.xToYCoordinates[activeCoordinate.x],
      xValue: activeLabel,
      yValue: this.props.chartData[activeTooltipIndex][
        Metrics[tooltipMetric].dataKey || tooltipMetric
      ],
      hovered: true
    })
  }, 16)

  render () {
    const { metrics, chartData = [], onZoomOut, title, isZoomed } = this.props
    const {
      refAreaLeft,
      refAreaRight,
      x,
      y,
      xValue,
      yValue,
      activePayload,
      hovered,
      tooltipMetric
    } = this.state

    return (
      <div className={styles.wrapper + ' ' + sharedStyles.chart}>
        <div className={sharedStyles.header}>
          <div className={sharedStyles.title}>{title}</div>
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
                {activePayload.map(({ name, value, color }) => {
                  return (
                    <div key={name} style={{ color }}>
                      {name}: {valueFormatter(value, name)}
                    </div>
                  )
                })}
              </div>
              <div
                className={styles.line}
                style={{
                  '--x': `${x}px`,
                  '--y': `${y}px`
                }}
              >
                <div
                  className={styles.values}
                  style={{
                    '--xValue': `"${tickFormatter(xValue)}"`,
                    '--yValue': `"${millify(yValue, 1)}"`
                  }}
                />
              </div>
            </>
          )}
        </div>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart
            margin={CHART_MARGINS}
            onMouseLeave={this.onMouseLeave}
            onMouseEnter={this.getXToYCoordinates}
            onMouseDown={e => {
              if (!e) return
              const { activeTooltipIndex, activeLabel } = e
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
              tickLine={false}
              minTickGap={100}
              tickFormatter={tickFormatter}
            />
            <YAxis hide />
            {generateMetricsMarkup(metrics, {
              ref: { [tooltipMetric]: this.metricRef }
            })}
            {refAreaLeft && refAreaRight && (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            )}
            {mixWithPaywallArea({
              dataKey: 'priceUsd',
              domain: [0],
              stroke: 'red',
              strokeOpacity: 0.9,
              data: chartData
            })}
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

export default Charts
