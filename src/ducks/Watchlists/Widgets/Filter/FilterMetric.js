import React, { useState, useEffect } from 'react'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Input from '@santiment-network/ui/Input'
import OperatorMenu from './operators/OperatorMenu'
import { Operator } from './operators/index'
import styles from './FilterMetric.module.scss'

const FilterMetric = ({
  metric,
  filter = [],
  isNoFilters,
  updMetricInFilter
}) => {
  const metricFilters = filter.filter(item => item.metric === metric.key)
  const initialOperators = metricFilters.map(({ operator }) => operator)
  const thresholds = metricFilters.map(({ threshold }) => threshold)
  // const isShowTimeRange = false
  const isActive = !!metricFilters.length

  const [isOpened, setIsOpened] = useState(isActive)
  const [operator, setOperator] = useState(
    initialOperators.length > 0
      ? initialOperators[0]
      : Operator.greater_than.key
  )
  const [firstInputValue, setFirstInputValue] = useState(thresholds[0])

  useEffect(
    () => {
      if (isNoFilters) {
        setIsOpened(false)
        setFirstInputValue(null)
        setOperator(Operator.greater_than.key)
      }
    },
    [isNoFilters]
  )

  const { key, label } = metric

  function onCheckboxClicked () {
    setIsOpened(!isOpened)
  }

  function onOperatorChange (operator) {
    setOperator(operator)
    if (firstInputValue) {
      updMetricInFilter({
        aggregation: 'last',
        dynamicFrom: '1d',
        dynamicTo: 'now',
        metric: key,
        operator: operator,
        threshold: firstInputValue
      })
    }
  }

  function onFirstInputChange ({ currentTarget: { value } }) {
    setFirstInputValue(parseFloat(value))
    updMetricInFilter({
      aggregation: 'last',
      dynamicFrom: '1d',
      dynamicTo: 'now',
      metric: key,
      operator: operator,
      threshold: parseFloat(value)
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Checkbox
          isActive={isOpened}
          onClick={onCheckboxClicked}
          className={styles.checkbox}
        />
        <span className={styles.label}>{label}</span>
      </div>
      {isOpened && (
        <div className={styles.settings}>
          <OperatorMenu operator={operator} onChange={onOperatorChange} />
          <Input onBlur={onFirstInputChange} defaultValue={firstInputValue} />
          {/* {thresholds.length === 2 && ( */}
          {/*   <> */}
          {/*     <span className={styles.preposition}>to</span> */}
          {/*     <Input */}
          {/*       onBlur={onSecondInputChange} */}
          {/*       defaultValue={thresholds[1]} */}
          {/*     /> */}
          {/*   </> */}
          {/* )} */}
          {/* {isShowTimeRange && <TimeRangeContextMenu timeRange={metricFilters[0].from} />} */}
        </div>
      )}
    </div>
  )
}

export default FilterMetric
