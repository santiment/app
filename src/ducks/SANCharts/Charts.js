import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  ReferenceArea
} from 'recharts'
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
    const { metrics, chartData = [], onZoomOut, title, isZoomed } = this.props
    const { refAreaLeft, refAreaRight } = this.state

    return (
      <div className={styles.wrapper + ' ' + sharedStyles.chart}>
        <div className={sharedStyles.header}>
          {isZoomed && (
            <Button border onClick={onZoomOut} className={sharedStyles.zoom}>
              Zoom out
            </Button>
          )}
          <div className={sharedStyles.title}>{title}</div>
        </div>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart
            margin={CHART_MARGINS}
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
                if (name === Metrics.historyPrice.label) {
                  return formatNumber(value, { currency: 'USD' })
                }

                if (value > 900000) {
                  return millify(value, 2)
                }

                return value.toFixed ? value.toFixed(2) : value
              }}
            />
            {mixWithPaywallArea({
              dataKey: 'priceUsd',
              domain: [0],
              stroke: 'red',
              strokeOpacity: 0.9,
              data: chartData
            })}

            {chartData.length > 0 && (
              <Brush
                x={20}
                width={window.innerWidth - 40}
                dataKey='priceUsd'
                tickFormatter={() => {}}
              >
                <LineChart>
                  <Line
                    dataKey='priceUsd'
                    dot={false}
                    stroke='var(--jungle-green)'
                  />
                </LineChart>
              </Brush>
            )}
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
