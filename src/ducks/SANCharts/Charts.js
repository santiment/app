import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Brush,
  ReferenceArea
} from 'recharts'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import Button from '@santiment-network/ui/Button'
import { formatNumber, millify } from './../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import mixWithPaywallArea from './../../components/PaywallArea/PaywallArea'
import { Metrics, generateMetricsMarkup } from './utils'
import { checkHasPremium } from '../../pages/UserSelectors'
import sharedStyles from './ChartPage.module.scss'
import styles from './Chart.module.scss'

const BRUSH_SIDE_MARGINS_IN_PX = 40
const BRUSH_SIDE_MARGIN_IN_PX = BRUSH_SIDE_MARGINS_IN_PX / 2
const EMPTY_FORMATTER = () => {}
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

  containerRef = React.createRef()
  metricRef = React.createRef()

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
        acc.push(value.split(','))
        return acc
      }, [])

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

    const { tooltipMetric = 'historyPrice' } = this.state
    const [x, y] = this.xToYCoordinates[activeTooltipIndex]

    this.setState({
      activePayload,
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
      metrics,
      chartData = [],
      onZoomOut,
      title,
      isZoomed,
      hasPremium,
      children
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
      tooltipMetric
    } = this.state

    const lines = generateMetricsMarkup(metrics, {
      ref: { [tooltipMetric]: this.metricRef }
    })

    const { current: container } = this.containerRef
    const brushWidth =
      container && container.state.containerWidth - BRUSH_SIDE_MARGINS_IN_PX

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
        <ResponsiveContainer width='100%' height={300} ref={this.containerRef}>
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
            data={chartData.map(({ datetime, ...rest }) => ({
              ...rest,
              datetime: +new Date(datetime)
            }))}
          >
            <XAxis
              dataKey='datetime'
              scale='time'
              tickLine={false}
              minTickGap={100}
              tickFormatter={tickFormatter}
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
            {!hasPremium &&
              metrics.includes('historyPrice') &&
              mixWithPaywallArea({
                dataKey: 'priceUsd',
                data: chartData,
                yAxisId: 'axis-priceUsd',
                domain: false
              })}
            {chartData.length > 0 && (
              <Brush
                x={BRUSH_SIDE_MARGIN_IN_PX}
                width={brushWidth}
                tickFormatter={EMPTY_FORMATTER}
                travellerWidth={4}
                onChange={this.getXToYCoordinatesDebounced}
              >
                <ComposedChart>
                  {lines
                    .filter(({ type }) => type !== YAxis)
                    .map(el => React.cloneElement(el, { ref: null }))}
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
