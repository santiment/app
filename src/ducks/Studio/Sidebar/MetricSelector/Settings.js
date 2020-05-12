import React, { useState } from 'react'
import Input from '@santiment-network/ui/Input'
import { useDebounceEffect } from '../../../../hooks'
import styles from './Settings.module.scss'

// TODO: If query throws an error, metric will be disabled and settings will be collapsed [@vanguard | May 6, 2020]
const Setting = ({ settings, metric, setMetricSettingMap }) => {
  const { key, label, defaultValue, constraints } = settings
  const [value, setValue] = useState(defaultValue)
  const [lastValidValue, setLastValidValue] = useState(defaultValue)
  const [error, setError] = useState()

  useDebounceEffect(
    () => !error && +value && updateMetricSettings(+value),
    400,
    [value]
  )

  function onChange ({ currentTarget }) {
    const { min, max } = constraints
    const newValue = currentTarget.value

    const isInvalid = newValue < min || newValue > max

    currentTarget.setCustomValidity(
      isInvalid ? `${label} value should be between ${min} and ${max}` : ''
    )
    currentTarget.reportValidity()

    setError(isInvalid)
    setValue(newValue)
  }

  function onBlur ({ currentTarget }) {
    if (!+currentTarget.value) {
      currentTarget.setCustomValidity('')
      setValue(lastValidValue)
    }
  }

  function updateMetricSettings (value) {
    setLastValidValue(value)

    setMetricSettingMap(state => {
      const prevSettings = state.get(metric) || {}
      const newState = new Map(state)

      newState.set(
        metric,
        Object.assign(prevSettings, {
          [key]: value
        })
      )

      return newState
    })
  }

  return (
    <label className={styles.setting}>
      <Input
        className={styles.input}
        type='number'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {label}
    </label>
  )
}

const Settings = ({ settings, ...props }) => {
  function onAdjustmentClick (e) {
    e.stopPropagation()
  }

  return (
    <div className={styles.settings} onClick={onAdjustmentClick}>
      {settings.map(settings => (
        <Setting key={settings.key} settings={settings} {...props} />
      ))}
    </div>
  )
}

export default Settings
