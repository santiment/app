import React, { useRef } from 'react'
import Setting from './Setting'
import {
  useColorByMetric,
  useMetricColorUpdater
} from '../../Widget/ChartWidgetColorProvider'
import { useDebounce } from '../../../../hooks/index'
import styles from './index.module.scss'

const ColorSetting = ({ metric }) => {
  const inputRef = useRef()
  const color = useColorByMetric(metric)
  const updateMetricColor = useMetricColorUpdater()
  const debouncedColorUpdate = useDebounce(updateMetricColor, 500)

  function onClick () {
    inputRef.current.click()
  }

  function onChange ({ target: { value } }) {
    debouncedColorUpdate(metric.key, value)
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
