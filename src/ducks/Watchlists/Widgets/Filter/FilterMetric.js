import React, { useState, useEffect } from 'react'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import OperatorMenu from './operators/OperatorMenu'
import {
  Operator,
  defaultMetricFormatter,
  defaultValueFormatter
} from './operators/index'
import { useDebounce } from '../../../../hooks'
import styles from './FilterMetric.module.scss'

function getInitialOperator ({ metricFilters, isPercentMetric }) {
  const initialOperators = metricFilters.map(({ operator }) => operator)

  if (initialOperators.length > 0) {
    return isPercentMetric
      ? `percent_${initialOperators[0]}`
      : initialOperators[0]
  }

  return Operator.greater_than.key
}

function getInitialThreshold ({ metricFilters, isPercentMetric }) {
  const thresholds = metricFilters.map(({ threshold }) => threshold)

  if (isNaN(thresholds[0])) {
    return ''
  }

  return isPercentMetric ? thresholds[0] * 100 : thresholds[0]
}

function getInitialTimeRange ({ metricFilters }) {
  if (metricFilters.length > 0) {
    return metricFilters[0].dynamicFrom
  }
  return '1d'
}

function checkIsPercentMetric ({ metricFilters }) {
  if (metricFilters.length > 0) {
    return metricFilters[0].metric.includes('_change_')
  }
  return false
}

const FilterMetric = ({
  metric,
  filter = [],
  isNoFilters,
  updMetricInFilter,
  isAuthor
}) => {
  const metricFilters = filter.filter(item => item.metric.includes(metric.key))
  const isPercentMetric = checkIsPercentMetric({ metricFilters })
  const isActive = !!metricFilters.length
  const [isOpened, setIsOpened] = useState(isActive)
  const [timeRange, setTimeRange] = useState(
    getInitialTimeRange({ metricFilters })
  )
  const [operator, setOperator] = useState(
    getInitialOperator({ metricFilters, isPercentMetric })
  )
  const [firstInputValue, setFirstInputValue] = useState(
    getInitialThreshold({ metricFilters, isPercentMetric })
  )

  const onMetricUpdateDebounced = useDebounce(
    value => onMetricUpdate(value),
    800
  )

  useEffect(
    () => {
      if (isNoFilters) {
        setIsOpened(false)
        setFirstInputValue('')
        setOperator(Operator.greater_than.key)
      }
    },
    [isNoFilters]
  )

  const { key, label } = metric

  function onCheckboxClicked () {
    if (!isAuthor) {
      return null
    }

    setIsOpened(!isOpened)
  }

  function onOperatorChange (operator) {
    if (!isAuthor) {
      return null
    }

    setOperator(operator)
    if (firstInputValue) {
      onMetricUpdate({
        operator,
        metric: key,
        threshold: firstInputValue
      })
    }
  }

  function onMetricUpdate ({ metric, operator, threshold }) {
    const {
      key,
      dataKey = key,
      metricFormatter = defaultMetricFormatter,
      serverValueFormatter = defaultValueFormatter
    } = Operator[operator]
    updMetricInFilter({
      aggregation: 'last',
      dynamicFrom: '1d',
      dynamicTo: 'now',
      metric: metricFormatter({ metric }),
      operator: dataKey,
      threshold: serverValueFormatter(threshold)
    })
  }

  function onFirstInputChange ({ currentTarget: { value } }) {
    const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value)
    setFirstInputValue(newValue)
    onMetricUpdateDebounced({
      metric: key,
      operator: operator,
      threshold: newValue
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
          <Input
            onChange={onFirstInputChange}
            disabled={!isAuthor}
            defaultValue={firstInputValue}
          />
          {/* {thresholds.length === 2 && ( */}
          {/*   <> */}
          {/*     <span className={styles.preposition}>to</span> */}
          {/*     <Input */}
          {/*       onBlur={onSecondInputChange} */}
          {/*       defaultValue={thresholds[1]} */}
          {/*     /> */}
          {/*   </> */}
          {/* )} */}
          {isPercentMetric && (
            <Button className={styles.timerange} border variant='flat'>
              {timeRange}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterMetric
