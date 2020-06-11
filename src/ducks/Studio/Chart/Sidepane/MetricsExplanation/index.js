import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Dropdown from '@santiment-network/ui/Dropdown'
import Explanations, { Explanation } from './Explanations'
import DataInfo from './DataInfo'
import { METRICS_EXPLANATION_PANE } from '../panes'
import MetricInsights from '../../../../../components/MetricInsight/MetricInsights'
import MetricIcon from '../../../../SANCharts/MetricIcon'
import { Description } from '../../../../dataHub/metrics/descriptions'
import { Insights } from '../../../../dataHub/metrics/insights'
import MetricDescription from '../../../../SANCharts/MetricDescription/MetricDescription'
import styles from './index.module.scss'

const OPTIONS = []
const SELECTED = ''

const dropdownClasses = {
  wrapper: styles.dropdown
}

export function filterExplainableMetrics (metrics) {
  return metrics.filter(
    ({ key }) => Description[key] || Insights[key] || Explanation[key]
  )
}

function dedupMetrics (metrics) {
  const dups = new Set()

  return metrics.filter(({ key }) => {
    const description = Description[key]
    return dups.has(description) ? false : dups.add(description)
  })
}

function buildOptions (metrics, colors) {
  return dedupMetrics(filterExplainableMetrics(metrics)).map(metric => ({
    index: metric.key,
    content: <Label metric={metric} colors={colors} />,
    metric
  }))
}

const Label = ({ metric: { key, dataKey = key, node, label }, colors }) => (
  <div className={styles.label}>
    <MetricIcon node={node} color={colors[dataKey]} className={styles.icon} />
    {label}
  </div>
)

const MetricsExplanation = ({
  metrics,
  MetricColor,
  onClose,
  project,
  ...rest
}) => {
  const [options, setOptions] = useState(OPTIONS)
  const [selected, setSelected] = useState(SELECTED)

  useEffect(
    () => {
      const newOptions = buildOptions(metrics, MetricColor)
      const newSelected = newOptions[0]

      setOptions(newOptions)
      setSelected(newSelected)
    },
    [metrics]
  )

  const { metric } = selected || {}
  if (!metric) return null

  const { key } = metric

  const description = Description[key]

  return (
    <>
      <Dropdown
        selected={selected}
        options={options}
        classes={dropdownClasses}
        onSelect={setSelected}
      />
      <DataInfo {...rest} metric={metric} />
      {description && (
        <>
          <div className={styles.subtitle}>Description</div>
          <div className={styles.text}>
            <MetricDescription metric={metric} project={project} />
          </div>
        </>
      )}
      <Explanations {...rest} metric={metric} />
      <MetricInsights insights={Insights[key]} />
    </>
  )
}

MetricsExplanation.Title = () => 'Metric Explanations'

MetricsExplanation.Button = ({ onClick, ...props }) => (
  <Button border {...props} onClick={() => onClick(METRICS_EXPLANATION_PANE)}>
    <Icon type='info-round' className={styles.info} />
    Explain metrics
  </Button>
)

export default MetricsExplanation
