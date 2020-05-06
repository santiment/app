import React from 'react'
import Input from '@santiment-network/ui/Input'
import { useDebounce } from '../../../../hooks'
import styles from './Adjustments.module.scss'

const Adjustment = ({ adjustment, metric, setMetricSettingMap }) => {
  const { label, defaultValue } = adjustment
  const onChangeDebounce = useDebounce(onChange, 500)

  function onChange(currentTarget, adjustment) {
    const { value, defaultValue } = currentTarget

    setMetricSettingMap((state) => {
      const newState = new Map(state)

      newState.set(metric, {
        [adjustment.key]: +value || +defaultValue,
      })

      return newState
    })
  }

  return (
    <label className={styles.adjustment}>
      <Input
        className={styles.input}
        type='number'
        defaultValue={defaultValue}
        onChange={({ currentTarget }) =>
          onChangeDebounce(currentTarget, adjustment)
        }
      />
      {label}
    </label>
  )
}

const Adjustments = ({ adjustments, ...props }) => {
  function onAdjustmentClick(e) {
    e.stopPropagation()
  }

  return (
    <div className={styles.adjustments} onClick={onAdjustmentClick}>
      {adjustments.map((adjustment) => (
        <Adjustment key={adjustment.key} adjustment={adjustment} {...props} />
      ))}
    </div>
  )
}

export default Adjustments
