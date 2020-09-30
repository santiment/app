import React, { useState } from 'react'
import cx from 'classnames'
import Widget from '../Widget'
import ChartWidget, { Chart } from '../ChartWidget'
// import styles from './index.module.scss'
import { Metric } from '../../../dataHub/metrics'
const styles = {}

const PriceDAADivergenceWidget = ({ widget, ...props }) => {
  return (
    <Widget className={cx(styles.holders)}>
      <Chart {...props} widget={widget} />
    </Widget>
  )
}

export const priceDAADivergenceBuilder = widget => props =>
  ChartWidget.new(
    {
      metrics: [Metric.price_usd, Metric.adjusted_price_daa_divergence],
      ...props
    },
    widget
  )

PriceDAADivergenceWidget.new = priceDAADivergenceBuilder(
  PriceDAADivergenceWidget
)

export default PriceDAADivergenceWidget
