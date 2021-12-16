import React, { useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import Input from '@santiment-network/ui/Input'
import Select from '@santiment-network/ui/Select/Select'
import { AVAILABLE_TIME_TYPES } from './constants'
import styles from './TimeWindowSelector.module.scss'

const TimeWindowSelector = () => {
  const [, { value }, { setValue }] = useField('settings.time_window')

  const timePeriod = value.slice(-1)
  const timeCount = value.slice(0, value.length - 1)

  const timeWindowPeriod = useMemo(
    () => AVAILABLE_TIME_TYPES.find(({ value }) => value === timePeriod),
    [timePeriod]
  )
  const [count, setCount] = useState((value && timeCount) || 1)
  const [period, setPeriod] = useState(
    (value && timeWindowPeriod) || AVAILABLE_TIME_TYPES[2]
  )

  useEffect(() => {
    if (period.value && count) {
      setValue(count + period.value)
    }
  }, [period, count])

  return (
    <div className={styles.wrapper}>
      <Input
        type='number'
        min={1}
        value={count}
        onChange={e => setCount(e.target.value)}
        className={styles.counter}
      />
      <Select
        isClearable={false}
        isSearchable={false}
        options={AVAILABLE_TIME_TYPES}
        value={period}
        onChange={val => setPeriod(val)}
        className={styles.period}
      />
    </div>
  )
}

export default TimeWindowSelector
