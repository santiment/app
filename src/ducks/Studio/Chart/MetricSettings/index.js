import React, { useState, useRef } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'
import {
  useColorByMetric,
  useMetricColorUpdater,
} from '../../Widget/ChartWidgetColorProvider'

const Setting = ({ children, isDropdown = true, ...props }) => {
  return (
    <div className={styles.setting} {...props}>
      {children}
      {isDropdown && <Icon type='arrow-down' className={styles.arrow} />}
    </div>
  )
}

const MovingAverageSetting = ({ metric }) => {
  const inputRef = useRef()
  const [movingAverage, setMovingAverage] = useState(0)

  function onClick() {
    inputRef.current.click()
  }

  function onChange({ target: { value } }) {
    setMovingAverage(value)
  }

  return (
    <Setting onClick={onClick} isDropdown={false}>
      Moving Average
      <input
        type='number'
        className={styles.input}
        onChange={onChange}
        value={movingAverage}
        ref={inputRef}
      />
    </Setting>
  )
}

const ColorSetting = ({ metric }) => {
  const inputRef = useRef()
  const color = useColorByMetric(metric)
  const updateMetricColor = useMetricColorUpdater()

  function onClick() {
    inputRef.current.click()
  }

  function onChange({ target: { value } }) {
    updateMetricColor(metric.key, value)
  }

  return (
    <Setting onClick={onClick}>
      <div className={styles.color} style={{ '--color': color }} />
      <input
        className={styles.colorInput}
        type='color'
        onChange={onChange}
        value={color}
        ref={inputRef}
      />
    </Setting>
  )
}

const MetricSettings = ({ className, metric, ...props }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {metric.label}:
      <ColorSetting metric={metric} />
      <MovingAverageSetting metric={metric} />
    </div>
  )
}

export default MetricSettings
