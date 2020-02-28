import React, { useState, useEffect } from 'react'
import Dropdown from '@santiment-network/ui/Dropdown'
import { Metrics } from '../../../SANCharts/data'
import MetricIcon from '../../../SANCharts/MetricIcon'
import { getSyncedColors } from '../../../SANCharts/Chart/Synchronizer'
import styles from './index.module.scss'

const OPTIONS = []
const SELECTED = ''

const dropdownClasses = {
  wrapper: styles.dropdown
}

const Label = ({ metric: { key, dataKey = key, node, label }, colors }) => (
  <div>
    <MetricIcon node={node} color={colors[dataKey]} className={styles.icon} />
    {label}
  </div>
)

function buildOptions (metrics, colors) {
  return metrics
    .filter(({ description }) => description)
    .map(metric => ({
      index: metric.key,
      content: <Label metric={metric} colors={colors} />
    }))
}

export default ({ metrics }) => {
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

  return metric ? (
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
    </div>
  ) : null
}
