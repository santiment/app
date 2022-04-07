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
import Frequences from '../../../../dataHub/metrics/frequences'
import MetricFrequence from '../../../../SANCharts/MetricFrequence/MetricFrequence'
import MetricDescription from '../../../../SANCharts/MetricDescription/MetricDescription'
import { getMetricLabel } from '../../../../dataHub/metrics/labels'
import styles from './index.module.scss'

const OPTIONS = []
const SELECTED = ''

const dropdownClasses = {
  wrapper: styles.dropdown,
}

export function filterExplainableMetrics(metrics) {
  return metrics.filter(
    ({ key }) => Description[key] || Insights[key] || Explanation[key] || Frequences[key],
  )
}

function dedupMetrics(metrics) {
  const dups = new Set()

  return metrics.filter(({ key }) => {
    const description = Description[key]

    return dups.has(description) ? false : dups.add(description)
  })
}

function buildOptions(metrics, colors) {
  return dedupMetrics(filterExplainableMetrics(metrics)).map((metric) => ({
    index: metric.key,
    content: <Label metric={metric} colors={colors} />,
    metric,
  }))
}

const Label = ({ metric, colors }) => {
  const { key, dataKey = key, node } = metric
  return (
    <div className={styles.label}>
      <MetricIcon node={node} color={colors[dataKey]} className={styles.icon} />
      {getMetricLabel(metric)}
    </div>
  )
}

const MetricsExplanation = ({ metrics, MetricColor, onClose, project, ...rest }) => {
  const [options, setOptions] = useState(OPTIONS)
  const [selected, setSelected] = useState(SELECTED)

  useEffect(() => {
    const newOptions = buildOptions(metrics, MetricColor)
    const newSelected = newOptions[0]

    setOptions(newOptions)
    setSelected(newSelected)
  }, [metrics])

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
      <DataInfo {...rest} metric={metric} slug={project.slug} />
      {description && (
        <>
          <div className={styles.subtitle}>Description</div>
          <div className={styles.text}>
            <MetricDescription metric={metric} project={project} />
          </div>
        </>
      )}
      <MetricFrequence metric={metric} />
      <Explanations {...rest} metric={metric} />
      <MetricInsights insights={Insights[key]} />
    </>
  )
}

export const MetricsExplanationContainer = (props) => (
  <div className={styles.container}>
    <div className='txt-m mrg-l mrg--b'>Metric Explanations</div>
    <MetricsExplanation {...props} />
  </div>
)

MetricsExplanation.Title = () => 'Metric Explanations'

MetricsExplanation.Button = ({ onClick, ...props }) => (
  <Button border {...props} onClick={() => onClick(METRICS_EXPLANATION_PANE)}>
    <Icon type='academy' className={styles.info} />
    Explain metrics
  </Button>
)

MetricsExplanation.defaultProps = {
  MetricColor: {},
}

export default MetricsExplanation
