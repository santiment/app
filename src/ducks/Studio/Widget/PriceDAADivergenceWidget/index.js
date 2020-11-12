import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Widget from '../Widget'
import ChartWidget, { Chart } from '../ChartWidget'
import { useWidgetProjectSettings } from '../utils'
import { Metric } from '../../../dataHub/metrics'
import styles from './index.module.scss'

export const buildTitle = title => ({ onDeleteChartClick, settings }) => (
  <div className={styles.title}>
    {title} ({settings.ticker})
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

const PriceDAADivergenceWidget = props => {
  const { widget, settings } = props
  /* const widgetSettings = useWidgetProjectSettings(widget, settings) */

  return (
    <Widget>
      <Chart TopLeftComponent={Title} {...props} settings={settings} />
    </Widget>
  )
}

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
