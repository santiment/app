import React from 'react'
import moment from 'moment'
import {
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Area,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from 'recharts'
import { Button } from '@santiment-network/ui'
import { compose, withProps } from 'recompose'
import { formatNumber } from './../../utils/formatting'
import mixWithPaywallArea from './../../components/PaywallArea/PaywallArea'
import { Metrics, getMetricCssVarColor, generateMetricsMarkup } from './utils'
import styles from './ChartPage.module.scss'

class Charts extends React.Component {
  state = {
    leftZoomIndex: undefined,
    rightZoomIndex: undefined,
    refAreaLeft: undefined,
    refAreaRight: undefined
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

  render () {
    const {
      metrics,
      chartData = [],
      settings: { socialVolume = {}, devActivity = {} },
      onZoomOut,
      title
    } = this.props
    const { refAreaLeft, refAreaRight } = this.state
    return (
      <div className={'TrendsExploreChart ' + styles.chart}>
        <div className={styles.header}>
          <Button border onClick={onZoomOut} className={styles.zoom}>
            Zoom out
          </Button>
          <div className={styles.title}>{title}</div>
        </div>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart
            onMouseDown={e => {
              if (!e) return
              const { activeTooltipIndex, activeLabel } = e
              this.setState({
                refAreaLeft: activeLabel,
                leftZoomIndex: activeTooltipIndex
              })
            }}
            onMouseMove={e => {
              if (!e) return
              const { activeTooltipIndex, activeLabel } = e

              this.state.refAreaLeft &&
                this.setState({
                  refAreaRight: activeLabel,
                  rightZoomIndex: activeTooltipIndex
                })
            }}
            onMouseUp={this.onZoom}
            data={chartData}
          >
            <XAxis
              dataKey='datetime'
              tickLine={false}
              minTickGap={100}
              tickFormatter={timeStr => moment(timeStr).format('DD MMM YY')}
            />
            <YAxis
              yAxisId='axis-price'
              type='number'
              domain={['auto', 'dataMax']}
            />
            <Line
              type='linear'
              yAxisId='axis-price'
              name={'Price'}
              dot={false}
              strokeWidth={1.5}
              stroke={getMetricCssVarColor('price')}
              dataKey='priceUsd'
              isAnimationActive={false}
            />
            {generateMetricsMarkup(metrics)}
            {refAreaLeft && refAreaRight && (
              <ReferenceArea
                yAxisId='axis-price'
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            )}
            <Tooltip
              labelFormatter={date => moment(date).format('dddd, MMM DD YYYY')}
              formatter={(value, name) => {
                if (name === Metrics.price.label) {
                  return formatNumber(value, { currency: 'USD' })
                }
                if (
                  name === Metrics.dailyActiveAddresses.label ||
                  name === Metrics.socialVolume.label
                ) {
                  return value
                }

                return value.toFixed(2)
              }}
            />
            {mixWithPaywallArea({
              yAxisId: 'axis-price',
              dataKey: 'priceUsd',
              domain: [0],
              stroke: 'red',
              strokeOpacity: 0.9,
              data: chartData
            })}
            <CartesianGrid stroke='rgba(200, 200, 200, .2)' />
            <Legend />
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

export default compose(
  withProps(({ ...rest }) => {
    // console.log(rest)
    return rest
  })
)(Charts)
