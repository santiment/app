import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Input from '@santiment-network/ui/Input'
import OperatorMenu from './operators/OperatorMenu'
import { Operator } from './operators/index'
import styles from './FilterMetric.module.scss'

const FilterMetric = ({ metric, filter = [], isNoFilters, updMetricInFilter }) => {
  const metricFilters = filter.filter(item => item.metric === metric.key)
  const initialOperators = metricFilters.map(({ operator }) => operator)
  const thresholds = metricFilters.map(({ threshold }) => threshold)
  const isShowTimeRange = false
  const isActive = !!metricFilters.length

  const [isOpened, setIsOpened] = useState(isActive)
  const [operator, setOperator] = useState(
    initialOperators.length > 0
      ? initialOperators[0]
      : Operator.greater_than.key
  )
  const [firstInputValue, setFirstInputValue] = useState(thresholds[0])

  const { key, label } = metric

  function onCheckboxClicked () {
    setIsOpened(!isOpened)
  }

  function onOperatorChange (operator) {
    setOperator(operator)
  }

  function onFirstInputChange ({ currentTarget: { value } }) {
    setFirstInputValue(parseFloat(value))
    updMetricInFilter({
      aggregation: 'last',
      dynamicFrom: '1d',
      dynamicTo: 'now',
      metric: metric.key,
      operator: 'greater_than',
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
