import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Dropdown from '@santiment-network/ui/Dropdown'
import Explanations from './Explanations'
import DataInfo from './DataInfo'
import MetricIcon from '../../../SANCharts/MetricIcon'
import styles from './index.module.scss'

const OPTIONS = []
const SELECTED = ''

const dropdownClasses = {
  wrapper: styles.dropdown
}

export function filterExplainableMetrics (metrics) {
  return metrics.filter(({ description }) => description)
}

function dedupMetrics (metrics) {
  const dups = new Set()

  return metrics.filter(metric => {
    const { description } = metric
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

const CloseButton = props => {
  return (
    <div className={styles.close} {...props}>
      <div className={styles.icons}>
        <Icon type='hamburger' className={styles.hamburger} />
        <Icon type='arrow-right' className={styles.arrow} />
      </div>
    </div>
  )
}

const MetricsExplanation = ({ metrics, MetricColor, onClose, ...rest }) => {
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

  return (
    <>
      <CloseButton onClick={onClose} />
      <div className={styles.wrapper}>
        <div className={styles.title}>Metric Explanations</div>
        <Dropdown
          selected={selected}
          options={options}
          classes={dropdownClasses}
          onSelect={setSelected}
        />
        <DataInfo {...rest} metric={metric} />
        <div className={styles.subtitle}>Description</div>
        <div className={styles.text}>{metric.description}</div>
        <Explanations {...rest} metric={metric} />
      </div>
    </>
  )
}

MetricsExplanation.Button = props => (
  <Button border {...props}>
    <Icon type='info-round' className={styles.info} />
    Explain metrics
  </Button>
)

export default MetricsExplanation
