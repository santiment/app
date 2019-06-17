import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from 'recharts'
import Button from '@santiment-network/ui/Button'
import { compose, withProps } from 'recompose'
import { formatNumber } from './../../utils/formatting'
import { getDateFormats } from '../../utils/dates'
import mixWithPaywallArea from './../../components/PaywallArea/PaywallArea'
import { CHART_METRICS, generateMetricsMarkup } from './utils'
import styles from './ChartPage.module.scss'

const tickFormatter = date => {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

const labelFormatter = date => {
  const { dddd, DD, MMM, YYYY } = getDateFormats(new Date(date))
  return `${dddd}, ${MMM} ${DD} ${YYYY}`
}

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
    const { metrics, chartData = [], onZoomOut, title } = this.props
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
              tickFormatter={tickFormatter}
            />
            <YAxis hide />
            {generateMetricsMarkup(metrics)}
            {refAreaLeft && refAreaRight && (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            )}
            <Tooltip
              labelFormatter={labelFormatter}
              formatter={(value, name) => {
                if (name === CHART_METRICS.price.label) {
                  return formatNumber(value, { currency: 'USD' })
                }
                if (
                  name === CHART_METRICS.dailyActiveAddresses.label ||
                  name === CHART_METRICS.socialVolume.label ||
                  name === CHART_METRICS.networkGrowth.label ||
                  name === CHART_METRICS.dailyActiveDeposits.label ||
                  name === CHART_METRICS.devActivity.label
                ) {
                  return value
                }

                return value.toFixed(2)
              }}
            />
            {mixWithPaywallArea({
              dataKey: 'priceUsd',
              domain: [0],
              stroke: 'red',
              strokeOpacity: 0.9,
              data: chartData
            })}
            <CartesianGrid stroke='rgba(200, 200, 200, .2)' />
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
