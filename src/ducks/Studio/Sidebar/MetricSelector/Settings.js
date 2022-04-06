import React, { useState, useEffect } from 'react'
import Input from '@santiment-network/ui/Input'
import styles from './Settings.module.scss'

const getDefaultValue = (metric, settings, metricSettingsMap) => {
  const { defaultValue, key } = settings

  if (metricSettingsMap) {
    const savedSettings = metricSettingsMap.get(metric)

    if (savedSettings) {
      const { [key]: value } = savedSettings
      if (value) {
        return value
      }
    }
  }

  return defaultValue
}

// TODO: If query throws an error, metric will be disabled and settings will be collapsed [@vanguard | May 6, 2020]
const Setting = ({ settings, metric, setMetricSettingMap, metricSettingsMap }) => {
  const { key, label, constraints, component: Component, preTransformer } = settings

  const stateUpdater = () => getDefaultValue(metric, settings, metricSettingsMap)

  const [value, setValue] = useState(stateUpdater)
  const [lastValidValue, setLastValidValue] = useState(stateUpdater)
  const [error, setError] = useState()

  useEffect(() => {
    if (!error) {
      if (Component) {
        if (value) {
          updateMetricSettings(value)
        }
      } else {
        if (+value) {
          updateMetricSettings(+value)
        }
      }
    }
  }, [value])

  function onChange(data) {
    if (!Component) {
      const { currentTarget } = data
      const { min, max } = constraints
      const newValue = currentTarget.value

      const isInvalid = newValue < min || newValue > max

      currentTarget.setCustomValidity(
        isInvalid ? `${label} value should be between ${min} and ${max}` : '',
      )
      currentTarget.reportValidity()

      setError(isInvalid)
      setValue(newValue)
    } else {
      setValue(preTransformer(data))
    }
  }

  function onBlur({ currentTarget }) {
    if (!+currentTarget.value) {
      currentTarget.setCustomValidity('')
      setValue(lastValidValue)
    }
  }

  function updateMetricSettings(value) {
    setLastValidValue(value)
    setMetricSettingMap((state) => {
      const prevSettings = state.get(metric) || {}
      const newState = new Map(state)
      newState.set(
        metric,
        Object.assign(prevSettings, {
          [key]: value,
        }),
      )

      return newState
    })
  }

  if (Component) {
    return (
      <label className={styles.setting}>
        <Component className={styles.input} onChange={onChange} value={value} />
        {label}
      </label>
    )
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

function onAdjustmentClick(e) {
  e.stopPropagation()
}

const Settings = ({ settings, ...props }) => {
  return (
    <div className={styles.settings} onClick={onAdjustmentClick}>
      {settings.map((settings) => (
        <Setting key={settings.key} settings={settings} {...props} />
      ))}
    </div>
  )
}

export default Settings
