import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Dropdown from '@santiment-network/ui/Dropdown'
import { Metrics } from '../../../SANCharts/data'
import Explanations from './Explanations'
import MetricIcon from '../../../SANCharts/MetricIcon'
import { getSyncedColors } from '../../../SANCharts/Chart/Synchronizer'
import styles from './index.module.scss'

const OPTIONS = []
const SELECTED = ''

const dropdownClasses = {
  wrapper: styles.dropdown
}

export function filterExplainableMetrics (metrics) {
  return metrics.filter(({ description }) => description)
}

function buildOptions (metrics, colors) {
  return filterExplainableMetrics(metrics).map(metric => ({
    index: metric.key,
    content: <Label metric={metric} colors={colors} />
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

const MetricsExplanation = ({ metrics, onClose, ...rest }) => {
  const [options, setOptions] = useState(OPTIONS)
  const [selected, setSelected] = useState(SELECTED)

  const metric = Metrics[selected.index]

  useEffect(
    () => {
      const newOptions = buildOptions(metrics, getSyncedColors(metrics))
      const newSelected = newOptions[0]

      setOptions(newOptions)
      setSelected(newSelected)
    },
    [metrics]
  )

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
