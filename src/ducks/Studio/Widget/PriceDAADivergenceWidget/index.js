import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Widget from '../Widget'
import ChartWidget, { Chart } from '../ChartWidget'
import { Metric } from '../../../dataHub/metrics'
import styles from './index.module.scss'

const Title = ({ onDeleteChartClick }) => (
  <div className={styles.title}>
    Price DAA Divergence
    {onDeleteChartClick && (
      <Icon
        type='close-small'
        onClick={onDeleteChartClick}
        className={styles.delete}
      />
    )}
  </div>
)

const PriceDAADivergenceWidget = ({ widget, ...props }) => (
  <Widget className={cx(styles.holders)}>
    <Chart {...props} widget={widget} TopLeftComponent={Title} />
  </Widget>
)

export const priceDAADivergenceBuilder = (widget, metrics) => props =>
  ChartWidget.new(
    {
      ...props,
      metrics
    },
    widget
  )

PriceDAADivergenceWidget.new = priceDAADivergenceBuilder(
  PriceDAADivergenceWidget,
  [Metric.price_usd, Metric.price_daa_divergence]
)

export default PriceDAADivergenceWidget
