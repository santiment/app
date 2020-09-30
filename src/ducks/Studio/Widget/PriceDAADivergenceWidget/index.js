import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Widget from '../Widget'
import ChartWidget, { Chart } from '../ChartWidget'
import { Metric } from '../../../dataHub/metrics'
import styles from './index.module.scss'

export const buildTitle = title => ({ onDeleteChartClick }) => (
  <div className={styles.title}>
    {title}
    {onDeleteChartClick && (
      <Icon
        type='close-small'
        onClick={onDeleteChartClick}
        className={styles.delete}
      />
    )}
  </div>
)

const Title = buildTitle('Price DAA Divergence')

const PriceDAADivergenceWidget = props => (
  <Widget>
    <Chart TopLeftComponent={Title} {...props} />
  </Widget>
)

export const priceDAADivergenceBuilder = (widget, metrics) => props =>
  ChartWidget.new(
    {
      isBlocked: true,
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
