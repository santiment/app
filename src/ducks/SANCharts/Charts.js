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
import { getDateFormats } from '../../utils/dates'
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

function valueFormatter (value, name) {
  if (name === Metrics.historyPrice.label) {
    return formatNumber(value, { currency: 'USD' })
  }

  if (value > 900000) {
    return millify(value, 2)
  }

  return value.toFixed ? value.toFixed(2) : value
}

class Charts extends React.Component {
  state = {
    leftZoomIndex: undefined,
    rightZoomIndex: undefined,
    refAreaLeft: undefined,
    refAreaRight: undefined,
    activeCoordinate: {}
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

  onMouseEnter = () => {
    // HACK(vanguard): Because 'recharts' lib does not expose correct point "Y" coordinate
    this.xToYCoordinates = this.priceRef.current.mainCurve
      .getAttribute('d')
      .slice(1)
      .split('L')
      .reduce((acc, value) => {
        const [x, y] = value.split(',')
        acc[x] = y
        return acc
      }, {})
  }

  onMouseMove = throttle(e => {
    if (!e) return
    const { activeTooltipIndex, activeLabel, activeCoordinate } = e

    this.setState({
      refAreaRight: activeLabel,
      rightZoomIndex: activeTooltipIndex,
      x: activeCoordinate.x,
      y: this.xToYCoordinates[activeCoordinate.x]
    })
  }, 16)

  priceRef = React.createRef()

  render () {
    const { metrics, chartData = [], onZoomOut, title, isZoomed } = this.props
    const { refAreaLeft, refAreaRight, activeCoordinate, x, y } = this.state

    return (
      <div className={styles.wrapper + ' ' + sharedStyles.chart}>
        <div className={sharedStyles.header}>
          {isZoomed && (
            <Button border onClick={onZoomOut} className={sharedStyles.zoom}>
              Zoom out
            </Button>
          )}
          <div className={sharedStyles.title}>{title}</div>
          <div
            className={styles.line}
            style={{
              '--x': `${x}px`,
              '--y': `${y}px`
            }}
          />
        </div>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart
            margin={CHART_MARGINS}
            onMouseEnter={this.onMouseEnter}
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
            {generateMetricsMarkup(metrics, { historyPrice: this.priceRef })}
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
