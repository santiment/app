import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from 'recharts'
import throttle from 'lodash.throttle'
import Button from '@santiment-network/ui/Button'
import { formatNumber, millify, labelFormatter } from './../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import mixWithPaywallArea from './../../components/PaywallArea/PaywallArea'
import { Metrics, generateMetricsMarkup } from './utils'
import sharedStyles from './ChartPage.module.scss'
import styles from './Chart.module.scss'

const tickFormatter = date => {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

const CHART_MARGINS = {
  left: -10,
  right: 18
}

function tooltipLabelFormatter (value) {
  const date = new Date(value)
  const { MMMM, DD, YYYY } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)

  return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
}

function valueFormatter (value, name) {
  if (name === Metrics.historyPrice.label) {
    return formatNumber(value, { currency: 'USD' })
  }

  if (value > 900000) {
    return millify(value, 2)
  }

  return value && value.toFixed ? value.toFixed(2) : value
}

const PRICE_METRIC = 'historyPrice'

class Charts extends React.Component {
  state = {
    leftZoomIndex: undefined,
    rightZoomIndex: undefined,
    refAreaLeft: undefined,
    refAreaRight: undefined
  }

  componentDidUpdate (prevProps) {
    const { metrics } = this.props
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
    if (!this.metricRef.current || !this.metricRef.current.mainCurve) {
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

    const { tooltipMetric } = this.state
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
      rightZoomIndex,
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
          {isZoomed && (
            <Button border onClick={onZoomOut} className={sharedStyles.zoom}>
              Zoom out
            </Button>
          )}
          <div className={sharedStyles.title}>{title}</div>
          {hovered && activePayload && (
            <>
              <div className={styles.details}>
                <div>{tooltipLabelFormatter(xValue)}</div>
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
            onMouseUp={this.onZoom}
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
