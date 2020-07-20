import React, { useRef } from 'react'
import Setting from './Setting'
import styles from './index.module.scss'
import {
  useColorByMetric,
  useMetricColorUpdater
} from '../../Widget/ChartWidgetColorProvider'

const ColorSetting = ({ metric }) => {
  const inputRef = useRef()
  const color = useColorByMetric(metric)
  const updateMetricColor = useMetricColorUpdater()

  function onClick () {
    inputRef.current.click()
  }

  function onChange ({ target: { value } }) {
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

export default ColorSetting
